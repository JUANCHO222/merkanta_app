import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { BtnGlobal } from '../components';
import UserForm from '../components/UserForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

// Función para guardar los datos del usuario
const saveUserData = async (id) => {
  try {
    await AsyncStorage.setItem('userId', id.toString());
    console.log('Datos del usuario guardados en AsyncStorage');
  } catch (error) {
    console.error('Error al guardar datos del usuario:', error);
  }
};

async function CreateUser() {
  if (!nombre || !apellido || !numero || !email || !password) {
    Alert.alert('Error', 'Por favor, complete todos los campos.');
    return;
  }

  try {
    const response = await fetch(
      'https://sought-dassie-partly.ngrok-free.app/api/Usuario/crear',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IdTipoUsuario: 1, // Por defecto "usuario normal"
          Nombre: nombre,
          Apellido: apellido,
          Telefono: numero,
          Email: email,
          Password: password,
        }),
      },
    );

    const data = await response.json();
    console.log('Datos recibidos del servidor:', data);

    if (response.status === 201 && data.idUsuario) {
      await saveUserData(data.idUsuario);
      Alert.alert('Éxito', 'Cuenta creada con éxito.');
      navigation.navigate('Cuenta');
    } else if (response.status === 400) {
      Alert.alert('Error', data.mensaje || 'No se pudo crear la cuenta.');
    } else {
      throw new Error(data.mensaje || 'Error desconocido.');
    }
  } catch (err) {
    console.error('Error en CreateUser:', err.message);
    Alert.alert('Error', 'No se pudo crear la cuenta. Intenta más tarde.');
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
              <Image
                style={styles.imageStyle}
                source={require('../../assets/images/mekanta_logo-removebg-preview.png')}
              />
      </View>
      <ScrollView>
      <UserForm
        nombre={nombre}
        setNombre={setNombre}
        apellido={apellido}
        setApellido={setApellido}
        numero={numero}
        setNumero={setNumero}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <View style={styles.buttonContainer}>
        <BtnGlobal texto="Registrarse" color="#0abf7e" onPress={CreateUser} largo="100%" ancho={50} />
      </View>
      </ScrollView>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageStyle: {
    width: '100%',
    height: 100,
    borderRadius: 100,
  },
});
