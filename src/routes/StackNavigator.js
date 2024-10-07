// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio, Producto } from '../screens/';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">
                <Stack.Screen name="Inicio" component={Inicio}  options={{ title: 'Inicio' }}/>
                <Stack.Screen name="Producto" component={Producto} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
