import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const imagen= 'https://http2.mlstatic.com/D_Q_NP_2X_708214-MLU72643149043_112023-AC.webp'
const productos = [
  {
    id: '1',
    nombre: 'Cartera Wallet Billetera Tarjetero Para iPhone',
    precioOriginal: 119,
    precioDescuento: 96.39,
    descuento: '19% OFF',
    envio: 'FULL',
    imagen: imagen, // URL de ejemplo
  },
  {
    id: '2',
    nombre: 'Cartera De Hombre Cuero Tarjetero Multi Ranura',
    precioOriginal: 300,
    precioDescuento: 171,
    descuento: '43% OFF',
    envio: 'FULL',
    imagen: imagen,
  },
  // Agrega más productos según sea necesario
  {
    id: '3',
    nombre: 'Cartera Wallet Billetera Tarjetero Para iPhone',
    precioOriginal: 119,
    precioDescuento: 96.39,
    descuento: '19% OFF',
    envio: 'FULL',
    imagen: imagen, // URL de ejemplo
  },
  {
    id: '4',
    nombre: 'Cartera De Hombre Cuero Tarjetero Multi Ranura',
    precioOriginal: 300,
    precioDescuento: 171,
    descuento: '43% OFF',
    envio: 'FULL',
    imagen: imagen,
  },
];

const ProductoItem = ({ producto, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{ uri: producto.imagen }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={styles.oldPrice}>${producto.precioOriginal}</Text>
        <Text style={styles.newPrice}>${producto.precioDescuento}</Text>
        <Text style={styles.discountPrice}>{producto.descuento}</Text>
        <Text style={styles.availability}>{producto.envio}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ProductosGrid = () => {
  return (
    <FlatList
      data={productos}
      renderItem={({ item }) => <ProductoItem producto={item} onPress={() => console.log("Producto seleccionado:", item.nombre)} />}
      keyExtractor={(item) => item.id}
      numColumns={2} // Número de columnas
      contentContainerStyle={styles.listaProductos}
    />
  );
};


const CardCategory = () => {
    return (
      <View style={styles.cardCategory}>
        <Text style={styles.title}>Productos Destacados</Text>
        <ProductosGrid />
        <TouchableOpacity style={{backgroundColor:'#00A76F', borderBottomLeftRadius:12,borderBottomRightRadius:12,width:'100%', padding:10,marginTop:0.5,
}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'bold', textAlign:'right'}}>Ver más</Text>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  listaProductos: {
    paddingHorizontal: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    margin: 0.5,
    
  },
  imgContainer: {
    width: 160,
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  oldPrice: {
    color: '#7D7D7D',
    textDecorationLine: 'line-through',
    fontSize: 14,
    marginBottom: 5,
  },
  newPrice: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountPrice: {
    color: 'green',
    fontSize: 14,
    marginBottom: 5,
  },
  availability: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardCategory:{
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    marginBottom: 20,
  },
  title:{
    backgroundColor:'#00A76F',
    width:'100%', 
    padding:10,
    color:'white',
    fontWeight: 'bold',
    fontSize:16,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    marginBottom:0.5,
  }
});

export default CardCategory;
