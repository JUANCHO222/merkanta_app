import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity,View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import ListaDesplegable from './ListaDesplegable';

export default function CardCarrito() {
    return (
        <View style={styles.containerCard}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                />
            </View>
            <View style={styles.conteinerSecondary}>
                <View style={styles.conteinerText}>
                    <Text style={{fontSize:14, }}>24pack Toalla Escudo Desinfectante Superficies C/80pz</Text>
                </View>
                <View style={[styles.conteinerButtons, { flexDirection: 'row' }]}>
                    <ListaDesplegable/>
                    <TouchableOpacity style={[styles.buttonComponent]}>
                        <Icon name="trash" size={15} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-end',alignContent:'center',margin:5,padding: 5       
}}>
                    <Text style={{fontSize:12, color: '#7D7D7D',textDecorationLine: 'line-through', fontSize:16}}>$ 500</Text>
                    <Text style={{fontSize:12,  marginLeft: 5,alignContent:'center',fontSize:16, color: 'green'}}>-5%</Text>
                </View>
                    <Text style={{flex:1,fontSize:24,margin:5,textAlign:'right', alignContent:'center',       
}}>$ 399</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        width: '100%',
        flexDirection: 'row',
        flexGrow: 1,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        padding: 5, // Añade un poco de padding para separar el contenido de los bordes
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    conteinerSecondary: {
        flex: 1,
        justifyContent: 'center',
    },
    conteinerText: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        margin: 5
    },
    conteinerButtons:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 1,
    },
    imageStyle: {
        borderRadius: 90,
        width: 70,
        height: 70,
        backgroundColor: 'white',
    },
    buttonComponent:{
        backgroundColor: 'red',
        width:  40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90,
        margin: 5

    }
});
