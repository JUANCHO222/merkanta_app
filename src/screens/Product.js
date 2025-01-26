import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import ListaDesplegable from '../components/ListaDesplegable';
import { BtnGlobal, Footer, Carrusel } from '../components';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Products({ navigation }) {
  const route = useRoute();
  const { idProducto } = route.params; // Recibe el parámetro idProducto de la navegación

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storedIds, setStoredIds] = useState([]);

  // Cargar los IDs guardados en AsyncStorage al inicio
  useEffect(() => {
    const loadIds = async () => {
      const ids = await AsyncStorage.getItem('idsArray');
      if (ids) {
        setStoredIds(JSON.parse(ids));
      }
    };
    loadIds();
  }, []);

  // Función para guardar los IDs en AsyncStorage
  const saveIds = async (ids) => {
    try {
      await AsyncStorage.setItem('idsArray', JSON.stringify(ids));
    } catch (err) {
      console.error('Error al guardar IDs:', err);
    }
  };

  // Función para agregar un ID al carrito
  const addId = async (id) => {
    if (!id) {
      Alert.alert('ID no válido');
      return;
    }

    try {
      const storedIds = JSON.parse(await AsyncStorage.getItem('idsArray')) || [];
      if (storedIds.includes(id)) {
        Alert.alert('El producto ya está en el carrito');
        return;
      }

      const updatedIds = [...storedIds, id];
      setStoredIds(updatedIds);
      await saveIds(updatedIds);

      Alert.alert('Producto agregado al carrito');
    } catch (err) {
      console.error('Error al agregar producto:', err);
      Alert.alert('Ocurrió un error al agregar el producto al carrito.');
    }
  };

  // Carga los detalles del producto desde el endpoint
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://sought-dassie-partly.ngrok-free.app/api/Producto/detalle/${idProducto}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [idProducto]);

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  // Mostrar mensaje de error si ocurre un problema al cargar los datos
  if (error || !product) {
    return (
      <View style={styles.loader}>
        <Text>Error al cargar el producto</Text>
      </View>
    );
  }

  // Renderizado principal del producto
  return (
    <ScrollView contentContainerStyle={[GlobalStyles.scroll]}>
      <View style={[GlobalStyles.content]}>
        {/* Carrusel de imágenes */}
        <Carrusel images={product.imagenes.map((img) => img.urlImagen)} />

        {/* Título y precio */}
        <View style={styles.containerTitle}>
          <Text style={styles.titleLabel}>{product.nombre}</Text>
          <Text style={styles.titlePrice}>${product.precio.toFixed(2)}</Text>
        </View>

        {/* Descripción del producto */}
        <View style={styles.containerDescription}>
          <Text style={styles.labelTitle}>Descripción</Text>
          <Text style={styles.textDescription}>{product.descripcion || 'Sin descripción disponible.'}</Text>
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonsContainer}>
          <View style={{ marginBottom: 10 }}>
            <ListaDesplegable stock={product.stock || 0} />
          </View>
          <View style={{ marginBottom: 10 }}>
            <BtnGlobal
              color="#2fd896"
              texto="Agregar al carrito"
              ancho={50}
              onPress={() => addId(product.idProducto)}
              bordered={true}
            />
          </View>
          <BtnGlobal
            color="#0abf7e"
            texto="Comprar"
            ancho={50}
            bordered={false}
            onPress={() => navigation.navigate('CarritoCompras')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    marginBottom: 10,
  },
  titleLabel: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titlePrice: {
    fontSize: 20,
    marginTop: 5,
  },
  buttonsContainer: {
    marginBottom: 10,
  },
  containerDescription: {
    marginBottom: 10,
  },
  textDescription: {
    fontSize: 15,
    textAlign: 'left',
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
