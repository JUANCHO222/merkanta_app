import React from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet } from 'react-native';

export default function CardProductoDestacado() {
    return (
        <TouchableOpacity style={[styles.containerPrincipal]}>
            <View style={styles.containerImagen}>
                <Image style={styles.imagenProducto}
                source={{ uri: 'https://images.unsplash.com/photo-1729731321920-294d9e7b88af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}/>
            </View>
            <View style={styles.containerTexto}>
                <Text style={styles.estiloDescripcion}>Audífonos Inalámbricos Over-ear Hesh Anc Skullcandy Negro</Text>
                <Text style={styles.estiloPrecioAntiguo}>$1,299</Text>
                <Text style={styles.estiloPrecioActual}>$6,999</Text>
                <Text style={styles.estiloDescuento}>5% off</Text>
                <Text style={styles.estiloFull}>Full</Text>
            </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        height:489,
        backgroundColor:'white',
        borderRadius: 12,
        marginBottom: 20
    },
    containerImagen:{
        width: '100%',
        height:300,
        flexDirection:'row'
    },
    imagenProducto:{
        width: '100%',
        height:300,
        borderRadius: 12,
    },
    containerTexto:{
        width: '100%',
        flexDirection:'row',
        flexGrow:1,
        flexWrap:'wrap',
        alignItems: 'flex-end',
        marginTop: 20,
        paddingLeft:15,
        paddingLeft:15,
    },
    estiloDescripcion:{
        fontSize: 14,
        color:'black'
    },
    estiloPrecioAntiguo:{
        width:'100%',
        color:'#d9d9d9',
        fontSize:15,
        textDecorationLine: 'line-through',
        marginTop: 10
    },
    estiloPrecioActual:{
        fontSize: 32,
        color:'black',
    },
    estiloDescuento:{
        color: 'green',
        fontSize: 14,
        marginLeft: 10,
    },
    estiloFull:{
        fontSize: 15,
        width:'100%',
        color:'green',
        fontWeight: 'bold',
        marginTop:10
    }
});