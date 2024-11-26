import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import CardProducto from '../cards/CardProducto';
export default function App() {
  const data = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <CardProducto/>
          </View>
        )}
        horizontal={true} // Establecer horizontal
        showsHorizontalScrollIndicator={false} // Ocultar la barra de desplazamiento horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBottom: 20
  },
  item: {
    width:180,
    height: 350,
    margin:1
  },
  
});
