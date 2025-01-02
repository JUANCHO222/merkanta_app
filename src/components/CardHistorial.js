import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CardHistorial() {
    const handlePress = () => {
        console.log("Button pressed!");
        // Aquí puedes añadir cualquier otra acción
    };

    return (
        <View style={styles.containerCard}>
            <View style={styles.containerPrimary}>
                <View style={styles.containerFecha}>
                    <Text style={styles.fecha}>17 de septiembre del 2024</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.containerSecondary} onPress={handlePress}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imageStyleTwo}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        }}
                    />
                </View>
                <View style={styles.containerText}>
                    <Text style={{ fontSize: 14 }} ellipsizeMode="tail" numberOfLines={2}>
                        2T4pack Toalla Escudo Desinfectante Superficies C/80pz
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    containerPrimary: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#e7e7e7',
        padding: 20,
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerSecondary: {
        flexDirection: 'row',
        alignItems: 'center', // Alinear verticalmente el contenido
    },
    containerText: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10, // Espacio entre imagen y texto
    },
    imageStyle: {
        borderRadius: 90,
        width: 70,
        height: 70,
        backgroundColor: 'white',
    },
    imageStyleTwo: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 7,
    },
    containerFecha: {
        width: '100%',
        flexDirection: 'column',
    },
    fecha: {
        fontWeight: '500',
    },
    separator: {
        height: 1, // Altura del separador
        backgroundColor: '#ccc', // Color del separador
        marginVertical: 1, // Espaciado vertical alrededor del separador
    },
});
