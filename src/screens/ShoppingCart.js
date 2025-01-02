import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/GlobalStyles';
import PrimaryButton from '../components/PrimaryButton';
import CardCarrito from '../components/CardCarrito';

export default function ShoppingCart({ navigation }) {
  const [productIds, setProductIds] = useState([]); // IDs almacenados en AsyncStorage
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar los IDs almacenados al montar el componente
  useEffect(() => {
    const loadStoredIds = async () => {
      try {
        const ids = await AsyncStorage.getItem('idsArray'); // Leer los IDs del local storage
        if (ids) {
          setProductIds(JSON.parse(ids)); // Parsear y almacenar los IDs
        } else {
          setProductIds([]); // Si no hay nada en el almacenamiento, inicializa como vacío
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los productos del carrito.');
      }
      setLoading(false);
    };

    loadStoredIds();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const ids = await AsyncStorage.getItem('idsArray');
      setProductIds(JSON.parse(ids) || []);
    });
  
    return unsubscribe;
  }, [navigation]);
  
  // Guardar los IDs en AsyncStorage
  const saveIds = async (ids) => {
    try {
      await AsyncStorage.setItem('idsArray', JSON.stringify(ids));
    } catch (err) {
      console.error('Error al guardar IDs:', err);
    }
  };

  // Eliminar un ID del carrito
  const removeId = async (id) => {
    try {
      // Filtra los IDs para eliminar el producto seleccionado
      const updatedIds = productIds.filter((storedId) => storedId !== id);
  
      if (updatedIds.length === 0) {
        // Si no quedan productos, vacía el carrito
        await AsyncStorage.removeItem('idsArray'); // Elimina el almacenamiento del carrito
        setProductIds([]); // Resetea el estado
        Alert.alert('El carrito ahora está vacío.');
      } else {
        // Si todavía hay productos, guarda el estado actualizado
        setProductIds(updatedIds);
        await saveIds(updatedIds); // Persistimos los cambios en AsyncStorage
        Alert.alert('Producto eliminado del carrito');
      }
    } catch (err) {
      console.error('Error al actualizar IDs:', err);
      Alert.alert('Ocurrió un error al intentar eliminar el producto.');
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
        data={productIds} // Pasamos los IDs directamente
        keyExtractor={(item) => item} // Usamos el ID como clave
        renderItem={({ item }) => (
          <View style={{paddingHorizontal:20}}>
            <CardCarrito  id={item?.toString() || 'ID no disponible'}  onRemove={removeId} /> {/* Pasamos el ID y el método removeId */}
          </View>
        )}
        contentContainerStyle={GlobalStyles.scroll}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <View style={styles.containerDetails}>
        <View style={styles.textDetailsContainer}>
          <Text style={styles.textDetails}>Productos ({productIds.length}):</Text>
        </View>
        <PrimaryButton
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
});
