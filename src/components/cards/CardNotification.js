import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CardNotification() {
    return (
        <View style={styles.containerPrincipal}>
            <View style={styles.containerImage}>
                <Image 
                    source={{ uri: 'https://cdn.pixabay.com/photo/2022/11/25/09/33/car-7615816_1280.jpg' }}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.containerTexto}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.estiloTitulo}>Nueva oferta en la categoría de carros</Text>
                    <Text style={styles.estiloFecha}>24/06</Text>
                </View>
                <View>
                    
                    <Text style={styles.estiloDescripcion}>
                        El vehículo más barato del año, cómpralo ahora o se acabará.
                        El vehículo más barato del año, cómpralo ahora o se acabará.
                        El vehículo más barato del año, cómpralo ahora o se acabará.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    containerImage: {
        width: 100, // Ajusta el ancho de la imagen según sea necesario
        height: 100,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    containerTexto: {
        flex: 1,
        flexDirection: 'column',
    },
    containerTitulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    estiloTitulo: {
        flex:1,
        fontWeight: '500',
        fontSize: 14,
    },
    estiloDescripcion: {
        fontSize: 14,
        color: '#666',
    },
    estiloFecha:{
        fontSize: 10,
    }
});
