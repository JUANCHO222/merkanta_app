import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { BtnPrimary, Separador, BtnSocial } from '../../components';
import HeaderImage from '../../components/screencomponent/HeaderImage';
import UserForm from '../../components/screencomponent/UserForm';
import { handleSignUp } from './authService';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    await handleSignUp(email, password);
  };

  return (
    <View style={styles.container}>
      <HeaderImage uri="https://cdn.pixabay.com/photo/2024/07/19/08/16/waves-8905720_1280.png" />

      <UserForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />

      <View style={styles.buttonContainer}>
        <BtnPrimary texto="Registrarse" color="#00A76F" onPress={onSignUp} largo="100%" ancho={50} />
      </View>

      <Separador />

      <View style={styles.socialContainer}>
        <BtnSocial texto="Regístrate con Google" ruta={require('../../../assets/icons/google-icon.png')} />
        <BtnSocial texto="Regístrate con Apple" ruta={require('../../../assets/icons/mac-icon.png')} />
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
  },
  socialContainer: {
    flexDirection: 'column',
  },
});
