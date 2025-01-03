import React, { useRef } from 'react';
import {
  Animated,
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CardProduct from '../components/CardProduct';
import Footer from '../components/Footer';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_BY_CATEGORY } from '../graphql/queryAllCollection';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import { useRoute } from '@react-navigation/native';

export default function Categorie() {
  const navigation = useNavigation();
  const route = useRoute();
  const { collectionHandle } = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 200; // Altura máxima del header
  const HEADER_MIN_HEIGHT = 60; // Altura mínima del header
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  // Animación de la altura del header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // Animación de la opacidad del header completo
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Animación de la opacidad de la imagen
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Animación de la opacidad del texto
  const textOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  // Ejecutar la consulta GraphQL para obtener los productos
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_PRODUCTS_BY_CATEGORY, {
    variables: { collectionHandle: collectionHandle, first: 50 },
    onError: (err) => {
      console.error('Apollo error', err);
    },
  });

  const loadMoreProducts = () => {
    if (data?.collectionByHandle?.products?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.collectionByHandle.products.pageInfo.endCursor,
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Error al cargar los productos: {error.message}</Text>
      </View>
    );
  }

  const products = data?.collectionByHandle?.products?.edges?.map((edge) => edge.node) || [];

  return (
    
    <ApolloProvider client={client}>
      <View style={GlobalStyles.container}>
        <StatusBar barStyle="light-content" />

        {/* Toolbar animada */}
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight, // Altura animada del header
              opacity: headerOpacity, // Opacidad animada del header completo
            },
          ]}
        >
          {/* Imagen de fondo */}
          <Animated.Image
            source={{
              uri: data.collectionByHandle.image.src,
            }}
            style={[styles.headerImage, { opacity: imageOpacity }]}
            resizeMode="cover"
          />

          {/* Contenedor del texto sobre la imagen */}
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.headerTitle,/*  { opacity: textOpacity } */]}>
              {data.collectionByHandle.title}
            </Animated.Text>
          </View>
        </Animated.View>

        {/* Lista scrollable */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <CardProduct
                title={item.title}
                description={item.description || 'Sin descripción'}
                imageUrl={item.images.edges[0]?.node?.src}
                precio={item.variants.edges[0]?.node?.price.amount}
                onPress={() => navigation.navigate('Producto', { productId: item.id })}
              />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={<Footer />}
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }} // Espacio para el header
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </ApolloProvider>
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
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute', // Para superponer el texto en la imagen
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Asegura que ocupe todo el ancho del header
    height: '100%', // Asegura que ocupe toda la altura del header
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
