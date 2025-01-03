import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import CarruselProductos from '../components/CarruselProducts';
import ListaDesplegable from '../components/ListaDesplegable';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../graphql/queryProductoDetalle';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import { GlobalStyles } from '../styles/GlobalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Products({ navigation }) {
  const route = useRoute();
  const { productId } = route.params; // ID del producto pasado como parámetro en la navegación

  const [storedIds, setStoredIds] = useState([]);

  // Cargar los IDs al inicio
  useEffect(() => {
    const loadIds = async () => {
      const ids = await AsyncStorage.getItem('idsArray');
      if (ids) {
        setStoredIds(JSON.parse(ids));
      }
    };
    loadIds();
  }, []);

  // Guardar IDs en AsyncStorage
  const saveIds = async (ids) => {
    try{
      await AsyncStorage.setItem('idsArray', JSON.stringify(ids));
    }
    catch(err){
      console.error('Error al guardar IDs:', err);
    }
  };

  // Función para agregar un ID
  const addId = async (id) => {
    if (!id) {
      Alert.alert('ID no válido');
      return;
    }
  
    try {
      // Cargar los IDs actuales desde AsyncStorage para evitar inconsistencias
      const storedIds = JSON.parse(await AsyncStorage.getItem('idsArray')) || [];
  
      // Verificar si el ID ya está en el carrito
      if (storedIds.includes(id)) {
        Alert.alert('El producto ya está en el carrito');
        return;
      }
  
      // Actualizar el estado local y AsyncStorage
      const updatedIds = [...storedIds, id];
      setStoredIds(updatedIds);
      await AsyncStorage.setItem('idsArray', JSON.stringify(updatedIds));
  
      Alert.alert('Producto agregado al carrito');
    } catch (err) {
      console.error('Error al agregar producto:', err);
      Alert.alert('Ocurrió un error al agregar el producto al carrito.');
    }
  };
  
  
  const handleAddToCart = async () => {
    if (!currentVariant?.id) {
      Alert.alert('Error', 'No se pudo agregar el producto al carrito.');
      return;
    }
  
    await addId(currentVariant.id);
    navigation.navigate('CarritoTab');
  };
  
  
  

  // Función para eliminar un ID
  const removeId = async (id) => {
    const updatedIds = storedIds.filter((storedId) => storedId !== id);
    setStoredIds(updatedIds);
    await saveIds(updatedIds);
    Alert.alert('ID eliminado');
  };


  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: productId },
  });


  const [selectedVariant, setSelectedVariant] = useState(null);

  


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Error al cargar el producto: {error.message}</Text>
      </View>
    );
  }

  const product = data?.product;

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  // Variante actual: usar la seleccionada o la primera por defecto
  const currentVariant = selectedVariant || product.variants.edges[0]?.node;
  const stockAvailable = currentVariant?.quantityAvailable || 0; // Valor predeterminado si no hay stock definido
  console.log('Stock calculado:', stockAvailable);

  return (
    <ApolloProvider client={client}>
        <ScrollView contentContainerStyle={[GlobalStyles.scroll]}>
          <View style={[GlobalStyles.content]}>
            {/* Imagen del producto */}
          <View style={[styles.containerImage]}>
            <Image
              source={{ uri: currentVariant?.image?.src || product.images.edges[0]?.node?.src }}
              style={styles.imageStyle}
            />
          </View>

          {/* Título y precio */}
          <View style={[styles.containerTitle]}>
            <Text style={[styles.titleLabel]}>{product.title}</Text>
            <Text style={[styles.titlePrice]}>
              ${currentVariant?.price?.amount || product.variants.edges[0]?.node.price.amount} MXM
            </Text>
          </View>

          {/* Variantes disponibles */}
          {product.variants.edges.length > 1 && (
            <View style={styles.variantContainer}>
              <Text style={styles.labelTitle}>Variantes disponibles</Text>
              {product.variants.edges.map((variant) => (
                <TouchableOpacity
                  key={variant.node.id}
                  onPress={() => setSelectedVariant(variant.node)}
                  style={styles.radioButtonContainer}
                >
                  <View
                    style={[
                      styles.radioButton,
                      selectedVariant?.id === variant.node.id && styles.radioButtonSelected,
                    ]}
                  />
                  <Text style={styles.variantTitle}>
                    {variant.node.title} - ${variant.node.price.amount} {variant.node.price.currencyCode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <View style={{marginBottom:10}}>
              <ListaDesplegable stock={stockAvailable} />
            </View>
            <View style={{marginBottom:10}}>
              <PrimaryButton color="#2fd896" texto="Agregar al carrito" ancho={50} onPress={()=>handleAddToCart(product.id)}  bordered={true} 
              />
            </View>
              <PrimaryButton color="#0abf7e" texto="Comprar" ancho={50}   bordered={false} 
              />
          </View>
            
            

          {/* Descripción */}
          <View style={[styles.containerDescription]}>
            <Text style={[styles.labelTitle]}>Descripción</Text>
            <Text style={[styles.textDescription]}>{product.description}</Text>
          </View>

          {/* Carrusel de productos similares */}
          <View>
            <Text style={[styles.labelTitle]}>Otros productos similares</Text>
              <CarruselProductos
                id={productId}
                onPress={(product) => console.log('Producto seleccionado:', product)}
              />
          </View>
          </View>
          
        </ScrollView>
    </ApolloProvider>
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
  containerImage: {
    height: 320,
    width: 320,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  variantContainer: {
    marginVertical: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: '#0072A7',
    backgroundColor: '#0072A7',
  },
  variantTitle: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    marginBottom:10
  },
  containerDescription: {
    marginBottom:10
  },
  textDescription: {
    fontSize: 15,
    textAlign: 'left',
  },
  labelTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
