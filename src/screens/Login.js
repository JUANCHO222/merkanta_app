import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BtnGlobal, TxtEntrada, TxtPassword, BtnLink } from '../components';
import ResetPasswordModal from '../components/ModalRecuperacion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailReset, setEmailReset] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ocultar TabBar
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      // Mostrar TabBar nuevamente al salir
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
  
    setIsLoading(true); // Activar indicador de carga
    try {
      const response = await fetch(
        'https://sought-dassie-partly.ngrok-free.app/api/Usuario/iniciar-sesion', // Ajusta la URL de tu servidor
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Enviar datos al backend
        }
      );
  
      const data = await response.json(); // Parsear respuesta a JSON
      console.log(data);
  
      if (data && data.mensaje === 'Inicio de sesión exitoso.') {
        const usuario = data.usuario;
        console.log("datos usuario",usuario);
        if (usuario && usuario.idUsuario) {
          // Convertir IdUsuario a string y guardarlo en AsyncStorage
          await AsyncStorage.setItem('userId', usuario.idUsuario.toString());
      
          console.log('Datos almacenados correctamente.');
          navigation.navigate('Cuenta');
        } else {
          Alert.alert('Error', 'No se pudo recuperar los datos del usuario.');
        }
      } else {
        Alert.alert('Error', data.mensaje || 'Credenciales incorrectas.');
      }
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor. Inténtelo más tarde.');
      console.error('Error al iniciar sesión:', error.message);
    } finally {
      setIsLoading(false); // Desactivar indicador de carga
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/mekanta_logo-removebg-preview.png')}
        />
      </View>

      <TxtEntrada
        keyboardType="email-address"
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        iconName="email"
      />
      <TxtPassword
        secureTextEntry
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.textButtonContainer}>
        <BtnLink onPress={() => setShowModal(true)} texto="¿Olvidó su contraseña?" />
        <BtnLink onPress={() => navigation.navigate('Registro')} texto="Registrarse" />
      </View>

      <ResetPasswordModal
        modalVisible={showModal}
        closeModal={() => setShowModal(false)}
        email={emailReset}
        setEmail={setEmailReset}
        handleForgotPassword={() => handleForgotPassword(auth, emailReset, () => setShowModal(false), setIsLoading)}
      />

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00A76F" />
        ) : (
          <BtnGlobal
            texto="Iniciar Sesión"
            color="#0abf7e"
            onPress={login}
            largo="100%"
            ancho={50}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d9d9d9',
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
  textButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default LoginScreen;
