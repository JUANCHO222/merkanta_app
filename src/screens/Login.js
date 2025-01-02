import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import EntradaTexto from '../components/EntradaTexto';
import PasswordInput from '../components/Contrasena';
import BotonTexto from '../components/BotonTexto';
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
        'https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Usuario/Login',
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json', // Tipo de contenido de la solicitud
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          Alert.alert('Error', 'Correo o contraseña incorrectos.');
        } else {
          Alert.alert('Error', `Ocurrió un error: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      console.log(data)


      if (data && data.message === 'Inicio de sesión exitoso.') {
        // Verificar si data.user.id existe
        const userId = data.user?.idUsuario?.toString();

        if (userId) {
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userEmail', data.user.email);
          console.log('Datos almacenados correctamente.');
          navigation.navigate('Mi Cuenta');
        } else {
          Alert.alert('Error', 'No se pudo recuperar el ID de usuario.');
        }
      } else {
        Alert.alert('Error', 'Credenciales incorrectas.');
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

      <EntradaTexto
        keyboardType="email-address"
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        iconName="email"
      />
      <PasswordInput
        secureTextEntry
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.textButtonContainer}>
        <BotonTexto onPress={() => setShowModal(true)} texto="¿Olvidó su contraseña?" />
        <BotonTexto onPress={() => navigation.navigate('Signup')} texto="Registrarse" />
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
          <PrimaryButton
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
