import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

export default function CardProducto({ onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                style={styles.image}
                source={{ uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
            <View style={styles.cardContent}>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>This is a brief description of the product.This is a brief description of the product.This is a brief description of the product.This is a brief description of the product.This is a brief description of the product.</Text>
                <Text style={styles.oldPrice}>$2,799</Text>
                <Text style={styles.newPrice}>$1,699</Text>
                <Text style={styles.discountPrice}>5% off</Text>
                <Text style={styles.availability}>FULL</Text>
            </View>
        </TouchableOpacity>
    );
}

// TODO: Remove this when we remove the default styles from the component components instead 
const styles = StyleSheet.create({
    card: {
        width: 148,
        height: 273,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Sombra en Android
        overflow: 'hidden', // Para cortar el contenido si se sale del borde
        marginBottom: 9,
        justifyContent: 'flex-start', // Alinea el contenido en la parte superior
    },
    image: {
        width: 148,
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardContent: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    description: {
        width: '100%',
        fontSize: 10,
        marginTop: 5,
        
    },
    oldPrice: {
        width: '100%',
        color: '#7D7D7D',
        textDecorationLine: 'line-through',
        fontSize: 14,
        marginTop: 5,
    },
    newPrice: {
        width: '50%',
        color: 'black',
        fontSize: 16,
        marginTop: 5,
    },
    discountPrice: {
        width: '50%',
        color: 'green',
        fontSize: 13,
        marginTop: 5,
    },
    availability: {
        width: '100%',
        color: 'green',
        fontWeight: 'bold',
        fontSize: 10,
        marginTop:5,
    },
});
