// En CustomImageCarousal.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CustomImageCarousal = ({ images }) => {
  if (!images || images.length === 0) {
    return <Text>No hay imágenes disponibles</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.src }} style={styles.image} />
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={350}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
});

export default CustomImageCarousal;  // Exporta como predeterminado
