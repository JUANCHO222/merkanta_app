import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Producto } from '../components';

export default function Categorie() {
  const navigation = useNavigation();
  const route = useRoute();
  const { idCategoria } = route.params;
  console.log('idcategoria',idCategoria);

  const [imageUrl, setImageUrl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_MAX_HEIGHT = 200;
  const HEADER_MIN_HEIGHT = 0; // Ajustado para desaparecer completamente
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Petición para la imagen de la categoría
        const imageResponse = await fetch(`https://sought-dassie-partly.ngrok-free.app/api/Categoria/imagen/${idCategoria}`);
        const imageData = await imageResponse.json();
        if (imageResponse.ok) {
          setImageUrl(imageData.imagenUrl);
          console.log('Imagen obtenida:', imageData.imagenUrl);
        }

        // Petición para los productos de la categoría
        const productsResponse = await fetch(`https://sought-dassie-partly.ngrok-free.app/api/Producto/listar-por-categoria/${idCategoria}`);
        const productsData = await productsResponse.json();
        if (productsResponse.ok) {
          setProducts(productsData);
          console.log('Productos obtenidos:', productsData);
        }

      } catch (err) {
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCategoria]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header animado */}
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_DISTANCE],
              outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.headerImage} resizeMode="cover" />
        ) : (
          <Text style={styles.headerTitle}>Sin imagen</Text>
        )}
      </Animated.View>

      {/* Lista de productos */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.idProducto ? item.idProducto.toString() : `default-${index}`}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Producto
              title={item.nombre}  
              description={item.descripcion || 'Sin descripción'}  
              imageUrl={item.imagenUrl}  
              precio={item.precio}  
              onPress={() => navigation.navigate('InicioTab', {
                  screen: 'Producto',
                  params: { idProducto: item.idProducto },
                })}  
            />
          </View>
        )}
        numColumns={2}  // Mostrar productos en 2 columnas
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }  // No olvides esto
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#edfaff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerTitle: {
    color: '#535353',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    padding: 10,
    maxWidth: '50%',
  },
  row: {
    justifyContent: 'space-between',
  },
});
