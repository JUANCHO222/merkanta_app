import * as React from 'react';
import 'react-native-gesture-handler';
import { Inicio, Notificacion, Historial, Perfil, IniciarSesion, Categoria, Producto, Formulario,Registro, Carrito } from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from './CustomDrawerContent'; 
import {Busqueda} from '../components/index'
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

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
                name="Inicio"
                component={Inicio}
                options={{
                    headerBackVisible: false, 
                    headerTitle: () => (
                        <View style={{ width:265}}>
                            <Busqueda
                                onSearch={(text) => {
                                    console.log('Buscando:', text);
                                }}
                            />
                        </View>
                ), 
                headerRight: () => (
                    <Icon
                        name="cart"
                        size={25}
                        color="white"
                        onPress={() => navigation.navigate("Carrito de compras")}
                        style={{ marginRight: 5, marginLeft: 4 }}
                    />
                ),      
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={30}
                        color={'#fff'}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                )
                }}
            />
            <Stack.Screen name="Mis notificaciones"    component={Notificacion} />
            <Stack.Screen name="Mi Historial"          component={Historial} />
            <Stack.Screen name="Mi Perfil"             component={Perfil} />
            <Stack.Screen name="Carrito de compras"             component={Carrito} />
            <Stack.Screen name="Muebles"               component={Categoria}
                options={{
                    headerBackVisible: false, 
                    headerTitle: () => (
                        <View style={{ width:265}}>
                            <Busqueda
                                onSearch={(text) => {
                                    console.log('Buscando:', text);
                                }}
                            />
                        </View>
                ), 
                headerRight: () => (
                    <Icon
                        name="cart"
                        size={25}
                        color="white"
                        onPress={() => navigation.navigate("Carrito de compras")}
                        style={{ marginRight: 5, marginLeft: 4 }}
                    />
                ),      
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={30}
                        color={'#fff'}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                )
                }}
            />
            <Stack.Screen name="Login"                 component={IniciarSesion} />
            <Stack.Screen name="Producto"              component={Producto} 
                    options={{
                        headerBackVisible: false, 
                        headerTitle: () => (
                            <View style={{ width:265}}>
                                <Busqueda
                                    onSearch={(text) => {
                                        console.log('Buscando:', text);
                                    }}
                                />
                            </View>
                    ), 
                    headerRight: () => (
                        <Icon
                            name="cart"
                            size={25}
                            color="white"
                            onPress={() => navigation.navigate("Carrito de compras")}
                            style={{ marginRight: 5, marginLeft: 4 }}
                        />
                    ),      
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={30}
                            color={'#fff'}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    )
                    }}
            />
            <Stack.Screen name="Crear Cuenta"          component={Registro} />
            <Stack.Screen name="Formulario"          component={Formulario}
            options={{
                headerShown: false,
            }}/>
        </Stack.Navigator>
    );
}

export const DrawNavigation = () => {
    return(
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown:false,
                headerStyle: {
                    // backgroundColor: '#00A76F', // Color de fondo del header
                },
                drawerActiveTintColor: '#000',
                drawerActiveBackgroundColor: '#d0fbe4',
                drawerInactiveTintColor: 'green',
            }}
        >
        <Drawer.Screen
            name="InicioD"
            component={StackNavigation}
            options={{
                drawerLabel: 'Inicio',
                drawerIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
                drawerItemStyle: { display: 'none' } // Oculta el elemento del Drawer 
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