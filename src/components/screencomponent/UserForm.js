import React from 'react';
import { View, StyleSheet } from 'react-native';
import TxtEntrada from '../../components/inputs/EntradaTexto';
import PasswordInput from '../../components/inputs/Contrasena';

const UserForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => (
  <View>
    <TxtEntrada keyboardType="email-address" placeholder="Correo Electrónico" value={email} onChangeText={setEmail} />
    <PasswordInput placeholder="Contraseña" value={password} onChangeText={setPassword} />
    <PasswordInput placeholder="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
});

export default UserForm;
