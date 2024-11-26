import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const EntradaTexto = ({ keyboardType, maxLength, placeholder, value, onChangeText }) => {


  return (
    <TextInput 
      style={[styles.InputContainer, styles.TextInput]}
      placeholder={placeholder}   // Mostrar el placeholder dinámicamente
      placeholderTextColor="#666"
      keyboardType={keyboardType}        // Tipo de teclado según la prop
      maxLength={maxLength}              // Longitud máxima según la prop
      allowFontScaling={true}            // Escalar el tamaño de la fuente en función de la resolución
      returnKeyType='done'               // Tecla de retorno 'done'
      value={value}               // Vincula el valor con el estado
      onChangeText={onChangeText} // Actualiza el estado al escribir
    />
  );
};

const styles = StyleSheet.create({
  // Estilos del componente (contenedor)
  InputContainer: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  // Estilos del texto
  TextInput: {
    color: 'black',
    fontSize: 16,
  },
});

export default EntradaTexto;
