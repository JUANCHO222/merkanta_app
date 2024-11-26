import React, { useRef, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

export default function Carro() {
  const data = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (flatListRef.current && data.length > 0) {
        // Asegúrate de que el índice no sea mayor que el número de elementos
        index = (index + 1) % data.length; // Ciclo a través de los índices
        flatListRef.current.scrollToIndex({ animated: true, index });
      }
    }, 5000); // Cambia cada 2 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [data.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={100} // Ajusta esto según el tamaño de tu elemento
        decelerationRate="fast" // Mejora la suavidad del scroll
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    width: 300, // Establece un ancho fijo para el elemento
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
});
