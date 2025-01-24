import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// * Importacion de las pantallas
import BtnSearchBar from '../components/BtnSearchBar';

import { Login, MyAccount, MyData, MyDirection, SignUp } from '../screens';


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
        component={Login}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BtnSearchBar onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />

      <Stack.Screen
        name="Datos"
        component={MyData}
        options={{
          headerBackTitle: 'Datos',
        }}      
      />

      <Stack.Screen
        name="Cuenta"
        component={MyAccount}
        options={{
          headerBackTitle: 'Datos',
        }}      
      />
      
      <Stack.Screen
        name="Direcciones"
        component={MyDirection}
        options={{
          headerBackTitle: 'Direcciones',
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

        <Tab.Screen
          name="Registro"
          component={SignUp}
          options={{ title: 'Mi Carrito' }}
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
