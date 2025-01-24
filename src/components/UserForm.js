import React from 'react';
import { View, StyleSheet } from 'react-native';
import EntradaTexto from './EntradaTexto';
import PasswordInput from './Contrasena';
const UserForm = ({ nombre, setNombre, apellido, setApellido, numero, setNumero,email, setEmail, password, setPassword,}) => (
  <View>
    <EntradaTexto keyboardType="default" placeholder="Nombre" value={nombre} onChangeText={setNombre} iconName={'person'}/>
    <EntradaTexto keyboardType="defaul" placeholder="Apellido" value={apellido} onChangeText={setApellido} iconName={'person'}/>
    <EntradaTexto keyboardType="phone-pad" placeholder="Numero telefonico" value={numero} onChangeText={setNumero} iconName={'phone'}/>
    <EntradaTexto keyboardType="email-address" placeholder="Correo Electrónico" value={email} onChangeText={setEmail} iconName={'email'}/>
    <PasswordInput placeholder="Contraseña" value={password} onChangeText={setPassword} />
  </View>
);


export default UserForm;
