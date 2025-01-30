import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// * Importacion de las pantallas

import { BotonBusqueda, BarraBusqueda } from '../components';
import ProductSearch from '../components/ProductSearch';
import { IniciarSesion, Registrarse,MiCuenta, MisDatos, MiDireccion, Inicio, Producto, Categoria,CarritoCompras } from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const StackNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00A76F' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Inicio"
        component={Inicio}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BotonBusqueda onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />
      
      <Stack.Screen 
        name="Categoria"
        component={Categoria}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BotonBusqueda onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />

    <Stack.Screen 
      name="Producto"
      component={Producto}
      options={{
        headerBackVisible: false,
        headerTitle: () => (
          <BotonBusqueda onPress={() => navigation.navigate('BusquedaTab')} />
        ), 
      }}
    />
      <Stack.Screen 
        name="CarritoCompras"
        component={CarritoCompras}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BotonBusqueda onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { height: 79, backgroundColor: '#00A76F' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'InicioTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'BusquedaTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CarritoTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Mi Cuenta') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2fd896',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="InicioTab"
        component={StackNavigation}
        options={{ title: "Inicio", headerShown: false }}
      />

      <Tab.Screen
        name="BusquedaTab"
        options={{
          headerTitle: () => (
            <BarraBusqueda
              value={searchText}
              onChangeText={setSearchText}
              onClear={() => setSearchText('')}
            />
          ),
        }}
      >
        {() => <ProductSearch searchText={searchText} />}
      </Tab.Screen>

      <Tab.Screen
        name="Mi Cuenta"
        component={MiCuenta}
        options={{ title: "Mi Cuenta", headerShown: false }}
      />
      <Tab.Screen
        name="Inicio de sesion"
        component={IniciarSesion}
        options={{ title: "Sesion", headerShown: false }}
      />
      <Tab.Screen
        name="Registro de sesion"
        component={Registrarse}
        options={{ title: "Sesion", headerShown: false }}
      />
    </Tab.Navigator>
  );
};
  


// Navegador principal
export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <BottomTabs /> 
        </NavigationContainer>
    );
};
