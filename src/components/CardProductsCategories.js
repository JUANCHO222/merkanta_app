import React from "react";
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
            uri: producto.imagen || "https://via.placeholder.com/160",
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={styles.newPrice}>${producto.precio}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente para mostrar los productos en un diseño de rejilla
const ProductosGrid = ({ productos }) => {
    const navigation = useNavigation();
  
  return (
    <FlatList
      data={productos}
      renderItem={({ item }) => (
        <ProductoItem
          producto={item}
          // onPress={() => console.log("Producto seleccionado:", item.nombre)}
          onPress={() => navigation.navigate('Producto',{productId: item.id})}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2} // Número de columnas
      columnWrapperStyle={styles.row} // Estilo para filas
      contentContainerStyle={styles.listaProductos}
    />
  );
};

// Componente principal para manejar los datos y mostrar la lista
const CardProductsCategories = ({ collectionHandle, onPress }) => {
  // Consulta GraphQL para obtener productos por categoría
 

  if (loading) {
    return <ActivityIndicator size="large" color="#00A76F" />;
  }

  if (error) {
    console.error("Error fetching products:", error);
    return <Text style={styles.error}>Error al cargar los productos</Text>;
  }

  // Transformar los datos para adaptarlos al diseño
  const productos = data.collectionByHandle?.products.edges.map(({ node }) => ({
    id: node.id,
    nombre: node.title,
    precio: parseFloat(node.variants.edges[0]?.node.price.amount || "0").toFixed(2),
    imagen: node.images.edges[0]?.node.src || "https://via.placeholder.com/160",
  }));

  return (
    <View style={styles.cardCategory}>
      <Text style={styles.title}>Productos Destacados</Text>
      <ProductosGrid productos={productos} />
      <TouchableOpacity style={styles.verMas} onPress={onPress} >
        <Text style={styles.verMasTexto}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos del componente
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
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CardProductsCategories;
