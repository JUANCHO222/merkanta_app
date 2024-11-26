import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, useWindowDimensions } from "react-native";

export default function CardProducto({ onPress }) {

    return (
        <TouchableOpacity style={[styles.card,]} onPress={onPress}>
            <View style={[styles.imgContainer]}>
            <Image
                style={[styles.image]} // Ajusta la altura de la imagen en relación al ancho
                source={{ uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
            </View>
            
            <View style={styles.cardContent}>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
                    This is a brief description of the product. This is a brief description of the product. This is a brief description of the product.
                </Text>
                <Text style={styles.oldPrice}>$2,799</Text>
                <Text style={styles.newPrice}>$1,699</Text>
                <Text style={styles.discountPrice}>5% off</Text>
                <Text style={styles.availability}>FULL</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width:180,
        height: 350,
        backgroundColor: '#fff',
        overflow: 'hidden',
        justifyContent: 'flex-start',
        margin:1,
    },
    imgContainer:{
        with:180,
        height:180,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1.3, // Ajusta la altura de la imagen en relación al ancho
        resizeMode: 'cover', // Redimensiona la imagen según el ancho y la altura del componente
        flex:1, 
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
});
