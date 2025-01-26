import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window'); // Ancho de la pantalla

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Índice de la imagen actual

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width) + 1; // Calcular el índice actual
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Más fluidez al rastrear el scroll
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.counter}>
        {currentIndex}/{images.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width:300,
    height: 300,
    marginHorizontal: 10, // Espacio entre las imágenes
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  counter: {
    position: 'absolute',
    bottom: 10,
    fontSize: 14,
    padding: 5,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
});

export default Carousel;
