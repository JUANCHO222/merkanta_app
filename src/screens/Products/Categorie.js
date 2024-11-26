import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { CardProduct, Footer } from '../../components';
import {useNavigation} from '@react-navigation/native';
import { GlobalStyles } from '../../styles/GlobalStyles';

// ToDo: Modularizar cada componente

export default function Categorie() {
    const navigation = useNavigation();
    const data = [1];
    return (
        <View style={GlobalStyles.container}>
             <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => (
                    <View style={[GlobalStyles.content]}>
                        <View style={[styles.imageContainer]}>
                            <Image
                                style={styles.imageStyle}
                                source={{uri:'https://cdn.pixabay.com/photo/2023/10/24/02/49/bike-8337261_1280.jpg'}}/>
                        </View>
                        <View style={[styles.labelContainer]}>
                            <Text style={[styles.labelStyle]}>
                                {'>'} Hogar, Muebles y Jardin
                            </Text>
                        </View>
                        <View style={[styles.productsContainer]}>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            <CardProduct onPress={() => {
                            navigation.navigate('Producto')}}/>
                            
                        </View>
                    </View>
                )}
                ListFooterComponent={<Footer />}
                contentContainerStyle={GlobalStyles.scroll}
            />
        </View>
       

        
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        alignItems:'center',
        marginBottom:20,
    },
    imageStyle:{
        width:'100%',
        height:120,
        borderRadius:12,
    },
    labelContainer:{
        marginBottom:20    
    },
    labelStyle:{
        color:'blue',
        fontSize:12
    },
    productsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        marginBottom:20,
    },

});
