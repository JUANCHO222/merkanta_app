import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Spinner({ categorias, selectedValue, setSelectedValue }) {
  console.log('Spinner', categorias);

  if (categorias.length === 0) {
    return <Text>Cargando categorías...</Text>; // Muestra este mensaje mientras las categorías se cargan
  }

  // Filtra categorías con id_categoria no válidos
  const categoriasFiltradas = categorias.filter(
    (categoria) => categoria.id_categoria !== undefined && categoria.id_categoria !== null
  );
  console.log('xd', categoriasFiltradas);

  return (
    <Picker
      selectedValue={selectedValue}
      style={styles.pickerStyle}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Selecciona una categoría" value={null} />
      {categoriasFiltradas.map((categoria) => (
        <Picker.Item
          key={categoria.id_categoria} // Clave única para cada categoría
          label={categoria.nombreCategoria} // Propiedad correcta
          value={categoria.id_categoria} // Usamos id_categoria como valor
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  pickerStyle: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
