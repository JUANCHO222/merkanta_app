import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const EntradaTexto = ({ keyboardType, maxLength, placeholder }) => {

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

  return (
    <TextInput 
      style={[styles.InputContainer, styles.TextInput]}
      placeholder={currentPlaceholder}   // Mostrar el placeholder dinámicamente
      keyboardType={keyboardType}        // Tipo de teclado según la prop
      maxLength={maxLength}              // Longitud máxima según la prop
      blurOnSubmit={false}               // Evitar que el teclado se oculte al enviar
      allowFontScaling={true}            // Escalar el tamaño de la fuente en función de la resolución
      returnKeyType='done'               // Tecla de retorno 'done'
      onFocus={() => setCurrentPlaceholder('')}  // Borrar el placeholder al enfocar
      onBlur={() => setCurrentPlaceholder(placeholder)} // Restaurar el placeholder al perder el foco
    />
  );
};

const styles = StyleSheet.create({
  // Estilos del componente (contenedor)
  InputContainer: {
    width: 312,
    height: 46,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    alignItems: 'center',
    margin: 24,
    marginBottom: -10,
  },
  // Estilos del texto
  TextInput: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EntradaTexto;
