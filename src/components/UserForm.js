import React from 'react';
import { View, StyleSheet } from 'react-native';
import EntradaTexto from './EntradaTexto';
import PasswordInput from './Contrasena';
const UserForm = ({ email, setEmail, password, setPassword,}) => (
  <View>
    <EntradaTexto keyboardType="email-address" placeholder="Correo Electrónico" value={email} onChangeText={setEmail} iconName={'email'}/>
    <PasswordInput placeholder="Contraseña" value={password} onChangeText={setPassword} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
});

export default UserForm;
