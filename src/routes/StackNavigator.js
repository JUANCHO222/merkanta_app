import * as React from 'react';
import 'react-native-gesture-handler';
import { Inicio, Notificacion, Historial, Perfil } from '../screens';
import { createDrawerNavigator,DrawerItem  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Importa el contenido personalizado

// Iconos
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    const handleLogout = () => {
        // Aquí puedes implementar la lógica para cerrar sesión
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
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Inicio"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
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
                }}
            >
                <Drawer.Screen
                    name="Inicio"
                    component={Inicio}
                    options={{
                        drawerLabel: 'Inicio',
                        drawerIcon: ({ color, size }) => (
                            <Entypo name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Historial de compras"
                    component={Historial}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <FontAwesome5 name="shopping-bag" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Notificaciones"
                    component={Notificacion}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <FontAwesome6 name="user-large" color={color} size={size} />
                        ),
                    }}
                />
                
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
