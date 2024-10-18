import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CardHistorial() {
    return (
    <View style={styles.containerCard}>
        <View style={styles.containerPrimary}>
            <View style={styles.containerFecha}>
                <Text>17 de septiembre</Text>
            </View>
        </View>
        <View style={styles.conteinerSecondary} >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                />
            </View>
            <View style={styles.conteinerText}>
                    <Text style={{fontSize:14, }}>24pack Toalla Escudo Desinfectante Superficies C/80pz</Text>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    containerPrimary:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#d9d9d9',
        padding: 5,
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    conteinerSecondary: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 1,
    },
    conteinerText: {
        flex: 1,
        justifyContent: 'center',
        margin: 5,
    },
    imageStyle: {
        borderRadius: 90,
        width: 70,
        height: 70,
        backgroundColor: 'white',
    },
    containerFecha: {
        width:'100%',
        flexDirection: 'column',
    }
});
