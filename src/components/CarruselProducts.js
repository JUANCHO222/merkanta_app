import React from 'react';
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CarruselProductos({ id, onPress }) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity style={styles.card}  onPress={()=> {}} >
              <View style={styles.imgContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: '#' }} // Asegúrate de usar la URL de la imagen
                />
              </View>
              <View style={[styles.cardContent,styles.transparentBox]}>
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}></Text>
                <Text style={styles.description}>
                </Text>
              </View>
            </TouchableOpacity>
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
  },
  item: {
    width: 150,
    height: 230,
    marginRight: 10,
  },
  card: {
    width: 150,
    height: 220,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "flex-start",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  imgContainer: {
    width: 150,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
    height: 70,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    textAlign: "left",
    color:'#7D7D7D'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transparentBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo semitransparente
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
