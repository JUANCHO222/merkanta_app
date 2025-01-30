import React, { useState, useEffect } from 'react';
import { Text, Image, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://sought-dassie-partly.ngrok-free.app/api/Producto/listar-todos-imagenes';

const ProductSearch = ({ searchText }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (searchText.trim() === '') {
      setProducts([]); // Limpiar lista si el campo está vacío
      return;
    }

    fetchProducts();
  }, [searchText]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?search=${searchText}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al obtener productos');
      }

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : products.length === 0 ? (
        <Text>No se encontraron productos.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.idProducto.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('InicioTab', {
                  screen: 'Producto',
                  params: { idProducto: item.idProducto },
                })
              }
            >
              <Image
                source={{ uri: item.imagenUrl || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{item.nombre}</Text>
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
    padding: 10,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductSearch;
