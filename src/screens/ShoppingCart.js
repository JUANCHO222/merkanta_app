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
        const ids = await AsyncStorage.getItem('idsArray');
        setProductIds(JSON.parse(ids) || []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        Alert.alert('Error', 'No se pudieron cargar los productos del carrito.');
      }
    };
  
    // Escuchar eventos de navegación para sincronizar siempre
    const unsubscribe = navigation.addListener('focus', loadStoredIds);
  
    loadStoredIds(); // Carga inicial
  
    return unsubscribe; // Limpiar el listener
  }, [navigation]);
  
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
