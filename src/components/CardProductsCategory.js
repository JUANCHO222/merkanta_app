import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardProducto from './CardProducto';

export default function CardProductsCategory() {
    return (
        <TouchableOpacity style={[styles.container]}>
            <View style={[styles.textContainer]}>
                <Text style={{color:'white'}}>Card Products Category</Text>
            </View>
            <CardProducto style={{margin:20}}/>
            <CardProducto style={{margin:20}}/>
            <CardProducto style={{margin:20}}/>
            <CardProducto style={{margin:20}}/>
            <View style={[styles.buttonContainer]}>
                <Text style={{color:'white'}}>Ver mas</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor:'#00A76F',
        // Agrega flexBasis para que el contenedor tenga un ancho fijopara que el contenedor tenga un ancho fijo
        // Agrega flexGrow para que el contenedor crezca según el contenido
        flexGrow: 1,
    },
    textContainer: {
        width: '100%',
        height: 40,
        padding:10,
        alignItems: 'flex-start',
        justifyContent:'center',
        color:'white',
        marginBottom:5
    },
    buttonContainer: {
        width: '100%',
        height: 40,
        padding:10,
        justifyContent:'center',
        alignItems:'flex-end',
        color:'white',
        marginTop:5,
    },
});
