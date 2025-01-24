import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from './TextInputs';
import TextInputPassword from './TextInputPassword';

const UserForm = ({ nombre, setNombre, apellido, setApellido, numero, setNumero,email, setEmail, password, setPassword,}) => (
  <View>
    <TextInput keyboardType="default" placeholder="Nombre" value={nombre} onChangeText={setNombre} iconName={'person'}/>
    <TextInput keyboardType="defaul" placeholder="Apellido" value={apellido} onChangeText={setApellido} iconName={'person'}/>
    <TextInput keyboardType="phone-pad" placeholder="Numero telefonico" value={numero} onChangeText={setNumero} iconName={'phone'}/>
    <TextInput keyboardType="email-address" placeholder="Correo Electrónico" value={email} onChangeText={setEmail} iconName={'email'}/>
    <TextInputPassword placeholder="Contraseña" value={password} onChangeText={setPassword} />
  </View>
);


export default UserForm;
