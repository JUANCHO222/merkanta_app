import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from "@apollo/client";
import { GET_ALL_COLLECTIONS } from "../graphql/queryAleatoryProduct";
import { useNavigation } from '@react-navigation/native';

export default function CardFeaturedProduct() {
    const navigation = useNavigation();

    // Consulta para obtener todas las colecciones
    const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS, {
        variables: { first: 10 }, // Número de colecciones a obtener
    });

    if (loading) return <ActivityIndicator size="large" color="#00A76F" />;
    if (error) {
        console.error("Error fetching collections:", error);
        return <Text>Error al cargar las colecciones</Text>;
    }

    // Lógica para seleccionar una colección y un producto aleatorios
    const colecciones = data.collections.edges;
    const coleccionAleatoria = colecciones[Math.floor(Math.random() * colecciones.length)].node;
    const productos = coleccionAleatoria.products.edges;
    const productoAleatorio = productos[Math.floor(Math.random() * productos.length)].node;

    return (
        <TouchableOpacity style={[styles.containerPrincipal]} onPress={() => navigation.navigate('Producto', { productId: productoAleatorio.id })}>
            <View style={styles.containerImagen}>
                <Image style={styles.imagenProducto}
                    source={{ uri: productoAleatorio.images.edges[0]?.node.src }} />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            <View style={styles.containerTexto}>
                <Text style={styles.estiloTitle}>{productoAleatorio.title}</Text>
                <Text style={styles.estiloPrice}>${productoAleatorio.variants.edges[0].node.price.amount} MXM</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        height: 415,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20
    },
    containerImagen: {
        height: 300,
        alignSelf: 'center',
    },
    imagenProducto: {
        width: 250,
        height: 250,
        borderRadius: 12,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerTexto: {
        width: '100%',
        flexDirection: 'column',
    },
    estiloTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    estiloPrice: {
        fontSize: 14,
        color: '#7D7D7D',
        marginBottom: 5
    },
    // Estilo del separador
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Color gris claro para la línea
        marginVertical: 10, // Espacio alrededor del separador
    }
});
