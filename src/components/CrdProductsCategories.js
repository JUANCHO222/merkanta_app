import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Componente para cada producto individual
const ProductoItem = ({ producto, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{
            uri: producto.imagenUrl || "https://via.placeholder.com/160",
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {producto.nombre || "Producto sin nombre"}
        </Text>
        <Text style={styles.newPrice}>
          {producto.precio !== undefined && producto.precio !== null
            ? `$${producto.precio.toFixed(2)}`
            : "Precio no disponible"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente para mostrar los productos en una cuadrícula
const ProductosGrid = ({ productos }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={productos}
      renderItem={({ item }) => (
        <ProductoItem
          producto={item}
          onPress={() => navigation.navigate('Producto', { idProducto: item.idProducto })} // Cambiar producto.idProducto por item.idProducto
        />
      )}
      keyExtractor={(item, index) => (item?.idProducto ? item.idProducto.toString() : `key-${index}`)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listaProductos}
    />
  );
};


// Componente principal para consumir la API y renderizar los productos
const CrdProductsCategories = ({ idCategoria, onPress }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        `https://sought-dassie-partly.ngrok-free.app/api/Producto/listar-por-categoria/${idCategoria}`
      );
      const data = await response.json();

      if (response.ok) {
        // Filtrar y usar solo los primeros 4 productos
        setProductos(data.slice(0, 4));
      } else {
        setError(data.mensaje || "Error al obtener productos");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [idCategoria]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00A76F" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardCategory}>
      <Text style={styles.title}>Productos</Text>
      <ProductosGrid productos={productos} />
      <TouchableOpacity style={styles.verMas} onPress={onPress}>
        <Text style={styles.verMasTexto}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  listaProductos: {
    paddingHorizontal: 1,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "flex-start",
    margin: 0.5,
  },
  imgContainer: {
    width: 160,
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  newPrice: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardCategory: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    backgroundColor: "#2fd896",
    width: "100%",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 0.5,
  },
  verMas: {
    backgroundColor: "#2fd896",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: "100%",
    padding: 10,
    marginTop: 0.5,
  },
  verMasTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CrdProductsCategories;
