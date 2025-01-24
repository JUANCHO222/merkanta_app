import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

export default function CrdProduct({ title, description, imageUrl, precio, onPress }) {
    // Valores predeterminados para las props
    const defaultTitle = title || 'Sin título';
    const defaultPrecio = precio ? `${precio} MXM` : 'Precio no disponible';


    // Fuente de la imagen
    const imageSource = imageUrl
        ? { uri: imageUrl }
        : require('../../assets/favicon.png'); // Cambiar esta ruta según la estructura del proyecto

    return (
        <TouchableOpacity style={styles.card} onPress={onPress || (() => {})}>
            <View style={styles.imgContainer}>
                <Image
                    style={styles.image}
                    source={imageSource} // Usa la fuente configurada
                />
            </View>
            <View style={[styles.cardContent, styles.transparentBox]}>
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>{defaultTitle}</Text>
                <Text style={styles.description}>${defaultPrecio}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 160,
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
        color:'#7D7D7D',
        textAlign: 'left',
    },
    transparentBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo semitransparente
        
    }
});
