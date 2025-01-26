import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/GlobalStyles';
import { BtnGlobal } from '../components';

export default function ShoppingCart({ navigation }) {
  const [productIds, setProductIds] = useState([]); // IDs almacenados en AsyncStorage
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar los IDs almacenados al montar el componente
  useEffect(() => {
    const loadStoredIds = async () => {
      try {
        const ids = await AsyncStorage.getItem('idsArray');
        setProductIds(JSON.parse(ids) || []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        Alert.alert('Error', 'No se pudieron cargar los productos del carrito.');
      } finally {
        setLoading(false); // Actualiza loading a false
      }
    };

    // Escuchar eventos de navegación para sincronizar siempre
    const unsubscribe = navigation.addListener('focus', loadStoredIds);

    loadStoredIds(); // Carga inicial

    return unsubscribe; // Limpiar el listener
  }, [navigation]);

  // Función para eliminar un ID del carrito
  const removeId = async (id) => {
    if (!id) {
      Alert.alert('ID no válido');
      return;
    }

    try {
      const updatedIds = productIds.filter((storedId) => storedId !== id);
      setProductIds(updatedIds); // Actualizar el estado local
      await AsyncStorage.setItem('idsArray', JSON.stringify(updatedIds)); // Guardar en AsyncStorage

      Alert.alert('Producto eliminado del carrito');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      Alert.alert('Ocurrió un error al eliminar el producto del carrito.');
    }
  };

  if (loading) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Cargando productos del carrito...</Text>
      </View>
    );
  }

  if (productIds.length === 0) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Tu carrito está vacío.</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={productIds} // Usamos directamente los IDs almacenados
        keyExtractor={(item) => item.toString()} // Asegúrate de convertir el ID a string
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.productIdText}>Producto ID: {item}</Text>
            <BtnGlobal
              color="#ff3b30"
              texto="Eliminar"
              ancho={40}
              bordered={true}
              onPress={() => removeId(item)}
            />
          </View>
        )}
        contentContainerStyle={GlobalStyles.scroll}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <View style={styles.containerDetails}>
        <View style={styles.textDetailsContainer}>
          <Text style={styles.textDetails}>Productos ({productIds.length}):</Text>
        </View>
        <BtnGlobal
          color="#0abf7e"
          texto="Comprar"
          ancho={40}
          bordered={false}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  textDetailsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textDetails: {
    fontSize: 16,
  },
  productIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
