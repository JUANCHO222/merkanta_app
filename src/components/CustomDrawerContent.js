import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import PrimaryButton from './PrimaryButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import mueblesIcon from '../../assets/icons/icons8-muebles-50.png';
import aliBebIcon from '../../assets/icons/icons8-comida-vegetariana-50.png';
import clothesIcon from '../../assets/icons/icons8-zapatillas-64.png';
import saludIcon from '../../assets/icons/icons8-máscara-de-protección-50.png';
import cuidadoIcon from '../../assets/icons/icons8-limpieza-50.png';

const CustomDrawerContent = (props) => {
    const handleLogout = () => {
        Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Cerrar sesión",
                onPress: () => {
                    // Lógica para cerrar sesión
                    console.log("Sesión cerrada");
                    // Redirigir a la pantalla de inicio o realizar otra acción
                }
            }
        ]);
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
            <PrimaryButton style={styles.button} onPress={() => console.log('hola')} color='black' texto='iniciar' largo='100%'
            ancho={50}/>
            </View>
            <DrawerItemList {...props} />
            {/* Agregar el separador aquí */}
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Categorías</Text>
                <View style={styles.line} />
            </View>
            {/* Botones del menu */}
            <DrawerItem style={{color: 'black'}}
            label="Hogar, muebles y jardin"
            icon={({ size }) => (
                <Image source={mueblesIcon} name="icons8-muebles-50.png" style={{ width: size, height: size }}/>
            )}
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            />
            <DrawerItem style={{color: 'black'}}
            label="Alimentos y bebidas"
            icon={({ size }) => (
                <Image source={aliBebIcon} name="icons8-muebles-50.png" style={{ width: size, height: size }}/>
            )}
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            />
            <DrawerItem style={{color: 'black'}}
            label="Ropa y calzado"
            icon={({ size }) => (
                <Image source={clothesIcon} name="icons8-muebles-50.png" style={{ width: size, height: size }}/>
            )}
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            />
            <DrawerItem style={{color: 'black'}}
            label="Salud"
            icon={({ size }) => (
                <Image source={saludIcon} name="icons8-muebles-50.png" style={{ width: size, height: size }}/>
            )}
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            />
            <DrawerItem style={{color: 'black'}}
            label="Cuidado personal" 
            icon={({ size }) => (
                <Image source={cuidadoIcon} name="icons8-muebles-50.png" style={{ width: size, height: size }}/>
            )}
            labelStyle={{color:'black'}}
            onPress={() => alert('Link to help')}
            />
            {/* Seccion del separador aquí */}
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Nosotros</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.separador} />
            {/* Continuacion de los demas botones */}
            <DrawerItem 
            label="Acerca de Merkanta" 
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')} color="black"
            icon={({ color, size }) => (
                <MaterialCommunityIcons name="information-outline" size={24} color="black" />
            )}
            />
            
            <DrawerItem style={{color: 'black'}}
            label="Contactanos"
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            icon={(color, size) => (
                <Foundation name="telephone" size={24} color="black" />
            )}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:180,
        padding: 20,
        backgroundColor: '#00A76F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:-36

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button:{
    },
    line: {
        flex: 1,  // Para que ocupe todo el espacio disponible
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,  // Espacio entre las líneas y el texto
        fontSize: 14,
        color: '#666',  // Color del texto
    },
    separatorContainer: {
        flexDirection: 'row',  // Disposición horizontal
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default CustomDrawerContent;
