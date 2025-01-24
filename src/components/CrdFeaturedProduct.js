import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CrdFeaturedProduct() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={[styles.containerPrincipal]} onPress={() => {}}>
            <View style={styles.containerImagen}>
                <Image style={styles.imagenProducto}
                    source={{ uri: '#' }} />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            <View style={styles.containerTexto}>
                <Text style={styles.estiloTitle}></Text>
                <Text style={styles.estiloPrice}></Text>
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
