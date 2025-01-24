import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// * Importacion de las pantallas
import BtnSearchBar from '../components/BtnSearchBar';

import { IniciarSesion, Registrarse,MiCuenta, MisDatos, MiDireccion, Inicio } from '../screens';


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
            <BtnSearchBar onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
    const [searchText, setSearchText] = React.useState(''); // Estado compartido para la barra de búsqueda
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            height: 79,
            backgroundColor: '#00A76F',
          },
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
