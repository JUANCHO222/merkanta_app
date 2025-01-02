import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Separador from '../components/Separador';
import Spinner from '../components/Spinner';
import * as ImagePicker from 'expo-image-picker';
import EntradaTexto from '../components/EntradaTexto';
import PrimaryButton from '../components/PrimaryButton';
import * as FileSystem from 'expo-file-system';

export default function UpProduct() {

  const [nombre, setNombre] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState(''); // Nuevo estado para el stock
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]); // Almacena las categorías
  const [imagen, setImagen] = useState(null);
  const [productoId, setProductoId] = useState(null);

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Producto/ObtenerCategoria");
        
        if (!response.ok) {
          throw new Error("Error al cargar las categorías.");
        }
  
        const data = await response.json();
        console.log("Categorias:", data); // Asegúrate de ver las categorías cargadas
        setCategorias(data); // Actualiza el estado con las categorías
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudieron cargar las categorías.");
      }
    };
  
    fetchCategorias();
  }, []);

  // Limpiar campos al abandonar la pantalla
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setNombre('');
        setDescripcionProducto('');
        setPrecio('');
        setStock('');
        setCategoria(null);
        setImagen(null);
        setProductoId(null);
      };
    }, [])
  );

  const guardarProducto = async () => {
    const productoData = {
      nombreProducto: nombre,
      descripcionProducto: descripcionProducto,
      precioProducto: parseFloat(precio),
      stockProducto: parseInt(stock), // Agregado stock
      categoriaId: categoria, // Envía el ID de la categoría seleccionada
    };
  
    try {
      const response = await fetch(
        "https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Producto/GuardarProducto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error al guardar el producto: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Respuesta del backend:", result);
  
      // Extraer el ID del producto correctamente
      const id = result?.nuevoProducto?.idProducto;
      if (!id) {
        throw new Error("No se pudo obtener el ID del producto.");
      }
  
      setProductoId(id); // Guarda el ID del producto en el estado
      Alert.alert("Éxito", "Producto guardado con éxito. Ahora puedes subir la imagen.");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      Alert.alert("Error", "Hubo un error al guardar el producto.");
    }
  };
  
  
  const seleccionarImagen = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos permisos para acceder a tu galería.");
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (resultado.canceled) {
        return;
      }

      setImagen(resultado.assets[0].uri);
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
      Alert.alert("Error", "Hubo un problema al abrir la galería.");
    }
  };

  const subirImagen = async () => {
    try {
      if (!imagen) {
        throw new Error("No se seleccionó ninguna imagen.");
      }
  
      if (!productoId) {
        throw new Error("El ID del producto no está disponible. Guarda el producto primero.");
      }
  
      console.log("Subiendo imagen para el producto con ID:", productoId);
  
      const { uri: uriValida } = await FileSystem.getInfoAsync(imagen);
      if (!uriValida) throw new Error("El archivo no existe.");
  
      const formData = new FormData();
      formData.append("file", {
        uri: uriValida,
        name: imagen.split('/').pop(),
        type: "image/jpeg",
      });
  
      const response = await fetch(
        `https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Producto/upload?id=${productoId}`,
        {
          method: "POST",
          headers: {
            "Accept": "*/*",
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al subir la imagen: ${errorMessage}`);
      }
  
      const result = await response.json();
      Alert.alert("Éxito", "Imagen subida con éxito.");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Alert.alert("Error", `Hubo un error al subir la imagen: ${error.message}`);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Nombre Producto</Text>
        <EntradaTexto placeholder="Nombre Producto" maxLength={50} onChangeText={setNombre} value={nombre} />
        
        <Text style={styles.label}>Descripción Producto</Text>
        <EntradaTexto placeholder="Descripción Producto" maxLength={50} onChangeText={setDescripcionProducto} value={descripcionProducto} />
        
        <Text style={styles.label}>Precio</Text>
        <EntradaTexto placeholder="Precio" keyboardType="numeric" maxLength={10} onChangeText={setPrecio} value={precio} />
        
        <Text style={styles.label}>Stock</Text>
        <EntradaTexto placeholder="Stock" keyboardType="numeric" maxLength={10} onChangeText={setStock} value={stock} />
        
        <Text style={styles.label}>Categoría</Text>
        <Spinner categorias={categorias} selectedValue={categoria} setSelectedValue={setCategoria} />

        <PrimaryButton ancho={45} color={'green'} texto={'Guardar Producto'} bordered={false} onPress={guardarProducto} />

        <Separador />

        <PrimaryButton ancho={45} color={'blue'} bordered={false} texto="Seleccionar Imagen" onPress={seleccionarImagen} />
        {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}

        <PrimaryButton ancho={45} color={'blue'} texto={'Subir Imagen'} bordered={false} onPress={subirImagen} />

        <Separador />
        
        <PrimaryButton ancho={45} color={'red'} bordered={false} texto="Limpiar Campos" onPress={() => {
          setNombre('');
          setDescripcionProducto('');
          setPrecio('');
          setStock('');
          setCategoria(null);
          setImagen(null);
          setProductoId(null);
        }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagen: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});
