import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import HeaderImage from '../components/HeaderImage';
import UserForm from '../components/UserForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

// Función para guardar los datos del usuario
const saveUserData = async (id, email) => {
  try {
    await AsyncStorage.setItem('userId', id.toString());
    await AsyncStorage.setItem('userEmail', email);
    console.log('Datos del usuario guardados en AsyncStorage');
  } catch (error) {
    console.error('Error al guardar datos del usuario:', error);
  }
};

  async function CreateUser() {
    try {
      const response = await fetch(
        'https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Usuario/register',
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      console.log('Estado de respuesta:', response.status);
  
      // Verifica si la respuesta es JSON
      const responseText = await response.text();
      console.log('Respuesta del servidor (raw):', responseText);
  
      // Intenta convertir a JSON si el servidor responde correctamente
      const data = response.ok ? JSON.parse(responseText) : null;
      console.log('Datos recibidos del servidor:', data); // Asegúrate de ver los datos recibidos del servidor (si hay)
  
      if (data && data.idUsuario && data.email) {
        await saveUserData(data.idUsuario, data.email);
        Alert.alert('Éxito', 'Cuenta creada con éxito.');
        navigation.navigate('Formulario');
      } else {
        throw new Error('Datos inválidos recibidos del servidor.');
      }
    } catch (err) {
      console.error('Error en CreateUser:', err.message);
      Alert.alert('Error', 'No se pudo crear la cuenta. Intenta más tarde.');
    }
  }
  
  

  return (
    <View style={styles.container}>
      <HeaderImage uri="https://cdn.pixabay.com/photo/2024/07/19/08/16/waves-8905720_1280.png" />

      <UserForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <View style={styles.buttonContainer}>
        <PrimaryButton texto="Registrarse" color="#0abf7e" onPress={CreateUser} largo="100%" ancho={50} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d9d9d9',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
});
