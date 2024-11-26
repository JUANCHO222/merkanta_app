import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BtnPrimary, CardCarrito } from '../../components/index';
import { GlobalStyles } from '../../styles/GlobalStyles';


export default function ShoppingCart() {
    const data = [1];
        return (
        <View style={GlobalStyles.container}>
            <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
              <View style={GlobalStyles.content}>
                <CardCarrito />
               
              </View>
          )}
          contentContainerStyle={GlobalStyles.scroll}
        />
           
            <View style={styles.containerDetails}>
                <View style={styles.textDetailsContainer}>
                    <Text style={styles.textDetails}>Productos({1}):</Text>
                    <Text style={styles.textDetails}>$300.00</Text>
                </View>
                <View style={styles.textDetailsContainer}>
                    <Text style={styles.textDetails}>Envio:</Text>
                    <Text style={styles.textDetails}>Gratis</Text>
                </View>
                <View style={styles.textDetailsContainer}>
                    <Text style={styles.textDetails}>Total:</Text>
                    <Text style={styles.textDetails}>$300.00</Text>
                </View>
                <BtnPrimary color='#00A76F'texto='Comprar'ancho={40}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDetails:{
        backgroundColor: '#fff',
        padding:20,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
    },
    textDetailsContainer:{
        flexGrow:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },
});
