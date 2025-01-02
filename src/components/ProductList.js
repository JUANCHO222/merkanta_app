import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CardProducto from './CardProduct'; // Asegúrate de usar el componente correcto
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queryProductos'; // Asegúrate de tener la consulta exportada correctamente

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { first: 5 }, // El número de productos que quieres obtener
  });

  // Manejo de estado de carga y error
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;  // Asegúrate de envolver el mensaje en un componente <Text>

  return (
    <View style={styles.container}>
      <FlatList
        data={data.products.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => {
          const product = item.node;
          return (
            <CardProducto
              title={product.title} // Pasa el título
              description={product.description} // Pasa la descripción
              precio={product.variants.edges[0]?.node.price.amount} // Pasa el precio
              imageUrl={product.images.edges[0]?.node.src} // Pasa la imagen
              onPress={() => console.log(`Producto seleccionado: ${product.id}`)} // Agrega funcionalidad al presionar
            />
          );
        }}
        numColumns={2} // Muestra los productos en un diseño de rejilla
        columnWrapperStyle={styles.row} // Estilo para las filas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  row: {
    justifyContent: 'space-between', // Espaciado uniforme entre las columnas
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductList;
