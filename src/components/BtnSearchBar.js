import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BtnSearchBar = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7} // Efecto de opacidad al presionar
    >
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <Text style={styles.placeholder}>Buscar productos...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    flex: 1, // Ocupa el espacio restante como texto
  },
});

export default BtnSearchBar;
