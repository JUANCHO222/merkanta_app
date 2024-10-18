import React from 'react'
import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5';


export default function CardNotification() {
    return (
    
    <View style={styles.containerCard}>
        <View style={[styles.containerTextSuperior]}>
            <Text>Rebajas de 10% en estas categorias </Text>
        </View>        
        <View style={[styles.containerTextInferior]}>
            <Text style={{padding: 1}}>Officia exercitation fugiat ullamco dolor veniam incididunt sit velit. 😂😂😂😂😂</Text>
        </View>        
    </View>
)}

const styles = StyleSheet.create({
    containerCard: {
        width: '100%',
        flexDirection: 'column',
        flexGrow: 1,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        // padding: 5, // Añade un poco de padding para separar el contenido de los bordes
    },
    containerTextSuperior:{
        height:32,
        backgroundColor: '#D9D9D980',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    containerTextInferior:{
        height: 116,
        justifyContent:'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        padding: 5
    }

});
