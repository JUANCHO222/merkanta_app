import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Text, Image, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GET_PRODUCTS_QUERY = gql`
  query GetProducts($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

const ProductSearch = ({ searchText }) => {
  const navigation = useNavigation();
  
  const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY, {
    variables: { query: searchText },
    skip: searchText === '', // No realizar consulta si el texto de búsqueda está vacío
  });

  const products =
    data?.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      image: edge.node.images.edges[0]?.node?.src || null,
    })) || [];

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : products.length === 0 ? (
        <Text>No se encontraron productos.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              // onPress={() => console.log("Producto seleccionado:", item.title)}
              onPress={() => navigation.navigate('InicioTab', { screen:'Producto',    params: { productId: item.id } 
              })}

              // onPress={() => navigation.navigate('Producto',{productId: item.id})}
            >
              <Image
                source={{ uri: item.image || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  cardTitle: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductSearch;
