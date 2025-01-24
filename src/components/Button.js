import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, texto, color, largo, ancho, bordered }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.BtnPrimary, 
        { 
          borderColor: color, 
          borderWidth: bordered ? 2 : 0, // Si `bordered` es true, se aplica el borde
          width: largo,
          height: ancho,
          backgroundColor: bordered ? 'transparent' : color, // Fondo transparente si tiene borde
        }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.texto, { color: bordered ? color : 'white' }]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnPrimary: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 14,
  }
});

export default Button;
