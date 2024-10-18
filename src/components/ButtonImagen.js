import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';

export default function ButtonImagen() {
  return (
    <View style={[styles.containerPrincipal]}>
        <TouchableOpacity  style={[styles.boton]}>
            <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={{ width: '100%', height: '100%', borderRadius: 12,
                }}
            />
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    containerPrincipal:{
        flex: 1,
        height:125,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    boton:{
        width: '100%',
        height:'100%',
        borderRadius: 12,

    }
})