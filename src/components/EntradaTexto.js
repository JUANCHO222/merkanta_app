import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de instalar esta librería

const EntradaTexto = ({ 
  keyboardType, 
  maxLength, 
  placeholder, 
  value, 
  onChangeText, 
  iconName // Nombre del ícono predeterminado
}) => {
  return (
    <View style={styles.InputContainer}>
      
      <TextInput
        style={styles.TextInput}
        placeholder={placeholder}
        placeholderTextColor="#666"
        keyboardType={keyboardType}
        maxLength={maxLength}
        allowFontScaling={true}
        returnKeyType="done"
        value={value}
        onChangeText={onChangeText}
      />
      <MaterialIcons name={iconName} size={24} color="#666" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    flexDirection: 'row', // Coloca el ícono al lado del TextInput
    alignItems: 'center',
    justifyContent: 'space-between', // Separa el ícono y el campo de texto
    borderWidth: 1, // Para visualización clara del borde
    borderColor: '#ddd',
  },
  TextInput: {
    flex: 1, // El TextInput ocupa todo el espacio restante
    color: 'black',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10, // Espaciado entre el ícono y el TextInput
  },
});

export default EntradaTexto;
