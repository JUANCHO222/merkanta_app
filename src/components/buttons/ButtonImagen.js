import React from 'react';
import { View, TouchableOpacity,StyleSheet, Image } from 'react-native';

export default function ButtonImagen() {
    return (
        <TouchableOpacity  style={[styles.buttonStyle]}>
            <View style={[styles.imageContainer]}>
            <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={[styles.imagenStyle]}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle:{
        flex:1,
        height: 125,
        borderRadius: 12,
        marginBottom: 20
    },
    imageContainer:{
        width:'100%',
        height: 125,
    },
    imagenStyle:{
        width: '100%',
        height: '100%', 
        borderRadius: 12,
    }
})