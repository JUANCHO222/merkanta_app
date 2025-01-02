import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity,View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import ListaDesplegable from './ListaDesplegable';

export default function CardCarrito({id, onRemove }) {
    return (
        <View style={[styles.containerShoppingCartCard]}>
            <View style={styles.containerImg}>
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                />
            </View>
            <View style={styles.containerNombre}>
                    <View style={[styles.continerProductName]}>
                        <Text style={[styles.textProductName]}  ellipsizeMode="tail" numberOfLines={2}>
                        {id?.toString() || 'ID no disponible'}
                        </Text>    
                    </View>
                    <View style={[styles.containerButtons]}>
                        <ListaDesplegable/>
                        <TouchableOpacity style={[styles.buttonTrash]} onPress={() => onRemove(id)}>
                            <Icon name="trash" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.containerDetailPrices]}>
                        <Text style={[styles.textProductPrice]}>
                            $ 500
                        </Text>
                        <Text style={[styles.textProductCant]}>
                            -5%
                        </Text>
                    </View>
                    <View style={[styles.containerFinalPrice]}>
                        <Text style={[styles.textPriceFinal]}>$ 399</Text>
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerShoppingCartCard: {
        flexDirection:'row',
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 20,
    },
    containerImg:{
        width: 100,
        height: 100,
    },
    imageStyle:{
        width:'100%',
        height:'100%',
        borderRadius: 12,
    },
    containerNombre:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
    },
    continerProductName:{
        marginBottom:10,
    },
    textProductName:{
        fontSize:14
    },
    containerButtons:{
        flexDirection: 'row',
        marginBottom:10,
    },
    buttonTrash:{
        backgroundColor: 'red',
        width:  40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90,
        marginLeft:5,
    },
    containerDetailPrices:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom:10,
    },
    textProductPrice:{
        fontSize:16, 
        color: '#7D7D7D',
        textDecorationLine: 'line-through', 
    },
    textProductCant:{
        marginLeft: 5,alignContent:'center',fontSize:16, color: 'green'
    },
    textPriceFinal:{
        flex:1,
        fontSize:24,
        textAlign:'right', 
        alignContent:'center',       
    },
    containerFinalPrice:{
        flexDirection:'row'
    }

    
});
