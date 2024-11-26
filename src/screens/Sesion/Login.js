import React, { useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { BtnPrimary, BtnTexto, TxtEntrada, Separador, BtnSocial, ResetPasswordModal } from '../../components/index';
import { handleLogin, handleForgotPassword } from './authFunctions';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase';


const LoginScreen = () => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailReset, setEmailReset] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{ uri: 'https://cdn.pixabay.com/photo/2024/07/19/08/16/waves-8905720_1280.png' }}
        />
      </View>

      <TxtEntrada
        keyboardType="email-address"
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TxtEntrada
        secureTextEntry
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.textButtonContainer}>
        <BtnTexto onPress={() => setShowModal(true)} texto="¿Olvidó su contraseña?" />
        <BtnTexto onPress={() => navigation.navigate('Crear Cuenta')} texto="Registrarse" />
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
          <BtnPrimary
            texto="Iniciar Sesión"
            color="#00A76F"
            onPress={() =>{console.log(email, password); handleLogin(auth, email, password, navigation, setIsLoading);}}
            largo="100%"
            ancho={50}
          />
        )}
      </View>

      <Separador />
      <View style={styles.socialContainer}>
        <BtnSocial texto="Iniciar sesión con Google" ruta={require('../../../assets/icons/google-icon.png')} />
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
    width: 150,
    height: 150,
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
  socialContainer: {
    flexDirection: 'column',
  },
});

export default LoginScreen;
