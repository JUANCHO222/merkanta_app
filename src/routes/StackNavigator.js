import * as React from 'react';
import 'react-native-gesture-handler';
import { Inicio, Notificacion, Historial, Perfil } from '../screens';
import { createDrawerNavigator,DrawerItem  } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Importa el contenido personalizado
import {useEffect} from 'react';
import {Busqueda} from '../components/index'

// *Iconos
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
    const navigation = useNavigation();
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#00A76F', // Color de fondo del header
            },
            headerTintColor: '#ffffff', // Color del texto del header
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerActiveTintColor: '#000',
            drawerActiveBackgroundColor: '#d0fbe4',
            drawerInactiveTintColor: '#000',
            
        }}>
            <Stack.Screen 
            name="InicioStack"
            component={Inicio}
            options={{
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Busqueda
                      onSearch={(text) => {
                        console.log('Buscando:', text); // Maneja la búsqueda aquí
                      }}
                    />
                  ),                headerRight: () => (
                    <Icon
                        name="cart" // Nombre del icono
                        size={25} // Tamaño del icono
                        color="white" // Color del icono
                        onPress={() => alert('Ícono presionado')} // Acción al presionar el icono
                        style={{ marginRight: 15 }} // Espaciado del icono
                    />
                    ),      
                headerLeft: () => {
                    return (
                        <Icon
                            name='menu'
                            size={30}
                            color={'#fff'}
                            onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    );
                }
            }} />
            <Stack.Screen name="Mis notificaciones" component={Notificacion} />
            <Stack.Screen name="Mi Historial"          component={Historial} />
            <Stack.Screen name="Mi Perfil"             component={Perfil} />
        </Stack.Navigator>
    );
}

export const DrawNavigation = () => {
    return(
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerShown:false,
            drawerActiveTintColor: '#000',
            drawerActiveBackgroundColor: '#d0fbe4',
            drawerInactiveTintColor: '#000',
        }}
    >
        <Drawer.Screen
            name="InicioDrawer"
            component={StackNavigation}
            options={{
                drawerLabel: 'Inicio',
                drawerIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
            }}
        />
        
    </Drawer.Navigator>
    );
}

export const StackNavigator = () => {
   
    return (
        <NavigationContainer>
            <DrawNavigation/>
        </NavigationContainer>
    );
};
