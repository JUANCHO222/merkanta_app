// In App.js in a new project
import * as React from 'react';

// Rutas
import 'react-native-gesture-handler';
import { Inicio, Notificacion, Historial, Perfil } from '../screens';
import { createDrawerNavigator,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Iconos
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();


export const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Inicio" 
            screenOptions={{
            // Aqui es la personalizacion del  
            headerStyle: { backgroundColor: '#00A76F' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            // Aqui inicia la personalización del drawer
            drawerActiveTintColor: '#000',
            drawerActiveBackgroundColor: '#d0fbe4',
            drawerInactiveTintColor: '#000',
            // drawerInactiveBackgroundColor: '#f0f0f0',
        }}      
        >
            <Drawer.Screen name = "Inicio"              
            component = { Inicio       } 
            options={{ drawerLabel: 'Perfil', drawerIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
                ), }}/>
            <Drawer.Screen name = "Historial de compras" 
            component = { Historial    } 
            options={{drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-bag" color={color} size={size} />
            ),}}/>
            <Drawer.Screen name = "Notificaciones"       
            component = { Notificacion } 
            options={{drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),}}/>
            <Drawer.Screen name = "Perfil"               
            component = { Perfil       } 
            options={{drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="user-large" color={color} size={size} />
            ),}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


