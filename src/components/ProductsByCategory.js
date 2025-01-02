import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../graphql/queryProductoCategoria";

const ProductsByCategory = ({ collectionHandle }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      first: 5, // Número de productos a mostrar
      collectionHandle, // Handle de la categoría
    },
  });

  if (loading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error al cargar los datos: {error.message}</Text>;

  const products = data.collectionByHandle?.products.edges || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.collectionByHandle?.title || "Categoría"}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.node.images.edges[0]?.node.src }}
              style={styles.image}
            />
            <Text style={styles.productTitle}>{item.node.title}</Text>
            <Text style={styles.productPrice}>
              ${item.node.variants.edges[0]?.node.price.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "green",
  },
});

export default ProductsByCategory;
