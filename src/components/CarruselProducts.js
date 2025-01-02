import React from 'react';
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from "@apollo/client";
import { useNavigation } from '@react-navigation/native';
import { GET_RECOMMENDATIONS } from '../graphql/queryRecomendations';

export default function CarruselProductos({ id, onPress }) {

  const navigation = useNavigation();
  const { data, loading, error } = useQuery(GET_RECOMMENDATIONS, {
    variables: { id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Verifica que los datos estén presentes antes de renderizar el carrusel
  const recommendations = data?.productRecommendations || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* onPress={() => onPress(item)} */}
            {/**/}
            <TouchableOpacity style={styles.card}  onPress={()=> navigation.navigate('Producto',{productId:item.id})} >
              <View style={styles.imgContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.images.edges[0]?.node.src }} // Asegúrate de usar la URL de la imagen
                />
              </View>
              <View style={[styles.cardContent,styles.transparentBox]}>
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>{item.title}</Text>
                <Text style={styles.description}>
                  ${item.variants.edges[0]?.node.priceV2.amount} {item.variants.edges[0]?.node.priceV2.currencyCode}
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
