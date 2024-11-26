import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';

import {useNavigation} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import mueblesIcon from '../../assets/icons/icons8-muebles-50.png';
import aliBebIcon from '../../assets/icons/icons8-comida-vegetariana-50.png';
import clothesIcon from '../../assets/icons/icons8-zapatillas-64.png';
import saludIcon from '../../assets/icons/icons8-máscara-de-protección-50.png';
import cuidadoIcon from '../../assets/icons/icons8-limpieza-50.png';
import { BtnPrimary } from '../components/index';
import { useState, useEffect } from 'react';
import { auth, signOut, onAuthStateChanged } from '../firebase/firebase';

const DrawerListPrincipal = [
    {icon: 'home',                      label: 'Inicio',        navigateTo: 'Inicio'            },
    {icon: 'person',                    label: 'Perfil',        navigateTo: 'Mi Perfil'         },
    {icon: 'bag',                       label: 'Historial',     navigateTo: 'Mi Historial'      },
    {icon: 'notifications',             label: 'Notificacion',  navigateTo: 'Mis notificaciones'},
];

const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    return (
        <DrawerItem
            icon={({size}) => <Ionicons name={icon} color='black' size={size} />}
            label={label} labelStyle={{color: 'black'}}
            onPress={() => {
                navigation.navigate(navigateTo);
            }}
        />
    );
};

const DrawerItems = props => {
    return DrawerListPrincipal.map((el, i) => {
        return (
            <DrawerLayout
                key={i}
                icon={el.icon}
                label={el.label}
                navigateTo={el.navigateTo}
            />
        );
    });
};



const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
          setUser(user); // Actualiza el estado cuando el usuario cambie
        });
        
        // Limpiar el suscriptor cuando el componente se desmonte
        return () => subscriber(); 
      }, []);
    
    // * Seccion de los componentes del menu de cajon
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
            {user?(
                <>
                <View style={{width:100, height:100, borderRadius:180}}>
                        <Image
                        source={{
                            uri: 'https://cdn.pixabay.com/photo/2024/09/30/15/37/halloween-9086123_1280.jpg',
                        }}
                        style={{width: 100,
                            height: 100, borderRadius:180}}
                        />
                    </View>
                        <Text style={styles.text}>{user.email}</Text>
                </>
                    
            )
            :(
            <>
                <BtnPrimary 
                style={styles.button} 
                onPress={() => {
                    navigation.navigate('Login')}
                } 
                color='black' 
                texto='Iniciar Sesion' 
                largo='100%'
                ancho={50}
            /> 
            </>)
            }
            </View>
            <DrawerItemList {...props} />
            <DrawerItems />
            {/*Agregar el separador aquí */}
            <View style={styles.separatorContainer}>
                <View 
                    style={styles.line} />
                <Text 
                    style={styles.separatorText}>Categorías</Text>
                <View 
                    style={styles.line} />
            </View>
            {/* Botones del menu */}
            <DrawerItem style={{color: 'black'}}
            label="Hogar, muebles y jardin"
                icon={({ size }) => (
                    <Image 
                        source={mueblesIcon} 
                        style={{ width: size, height: size }}/>
                )}
                labelStyle={{color:'black'}}
                onPress={() => {
                    navigation.navigate('Muebles')}
                }
            />
            
            {/* Seccion del separador aquí */}
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Nosotros</Text>
                <View style={styles.line} />
            </View>
            {/* Botones del menu */}
            <View style={styles.separador} />
            {/* Continuacion de los demas botones */}
            <DrawerItem 
            label="Acerca de Merkanta" 
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')} color="black"
            icon={({ color, size }) => (
                <Ionicons name="information-circle" size={24} color="black" />
            )}
            />
            
            <DrawerItem style={{color: 'black'}}
            label="Contactanos"
            labelStyle={{color:'black'}} onPress={() => alert('Link to help')}
            icon={(color, size) => (
                <Ionicons name="call-sharp" size={24} color="black" />
            )}
            />
            {user?(
                <DrawerItem
                    label="Cerrar sesión"
                    labelStyle={{ color: 'black' }}
                    icon={({ color, size }) => (
                        <Ionicons name="log-out" size={size} color={color} />
                    )}
                    onPress={() => {
                        auth.signOut(); // Cerrar sesión
                        navigation.navigate('Inicio');
                    }}
                />
            ):(<>
            
            
            </>)}

        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'110%',
        height:170,
        padding: 20,
        backgroundColor: '#00A76F',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:-12,
        marginLeft:-20

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text:{
        textAlign:'center',
        width:'100%',
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
        borderWidth:1
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
