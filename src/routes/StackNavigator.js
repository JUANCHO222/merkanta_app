import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// * Importacion de las pantallas
import BtnSearchBar from '../components/BtnSearchBar';
import SearchBar from '../components/SearchBar';
import ProductSearch from '../components/ProductSearch';
import Categorie from '../screens/Categorie';
import Products from '../screens/Product';
import Home from '../screens/Home';
import ShoppingCart from '../screens/ShoppingCart';
import Prueba from '../screens/Prueba';
import MyAccount from '../screens/MyAccount';
import LoginScreen from '../screens/Login';
import SignUp from '../screens/SignUp';
import MyData from '../screens/MyData';
import MyDirection from '../screens/MyDirection';
import PurchaseHistory from '../screens/PurchaseHistory';
import PrincipalForm from '../screens/PrincipalForm';
import UpProduct from '../screens/UpProduct';


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
        component={Home}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BtnSearchBar onPress={() => navigation.navigate('BusquedaTab')} />
          ), 
        }}
      />
      <Stack.Screen
        name="Categoria"
        component={Categorie}
        options={{
          headerShown: false,
          // Ocultar las tabs para esta pantalla
          tabBarStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="Producto"
        component={Products}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <BtnSearchBar onPress={() => navigation.navigate('BusquedaTab')} />
          ),
          // Ocultar las tabs para esta pantalla
          tabBarStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="Carrito de compras"
        component={ShoppingCart}
        options={{
          // Ocultar las tabs para esta pantalla
          tabBarStyle: { display: 'none' },
        }}
      />
      
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Stack.Screen 
        name="Signup"
        component={SignUp}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Stack.Screen 
        name="Informacion Personal"
        component={MyData}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Stack.Screen 
        name="Mis Direcciones"
        component={MyDirection}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Stack.Screen 
        name="Mis Compras"
        component={PurchaseHistory}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
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
          name="BusquedaTab"
          options={{
            headerTitle: () => (
              <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                onClear={() => setSearchText('')}
              />
            ),
          }}
        >
        {() => <ProductSearch searchText={searchText}/>}
</Tab.Screen>

        <Tab.Screen
          name="CarritoTab"
          component={ShoppingCart}
          options={{ title: 'Mi Carrito' }}
        />
        <Tab.Screen
          name="Mi Cuenta"
          component={MyAccount}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
        name="Prueba"
        component={Prueba}
        options={{
          tabBarStyle: { display: 'flex' },
        }}
        />
        <Tab.Screen 
        name="Formulario"
        component={PrincipalForm}
        options={{
          tabBarStyle: { display: 'flex' },
        }}
      />
        <Tab.Screen 
        name="Generar Produto"
        component={UpProduct}
        options={{
          tabBarStyle: { display: 'flex' },
        }}
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
