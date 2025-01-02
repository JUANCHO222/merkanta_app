import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderImage = ({ uri }) => (
  <View style={styles.imageContainer}>
    <Image style={styles.imageStyle} source={{ uri }} />
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default HeaderImage;
