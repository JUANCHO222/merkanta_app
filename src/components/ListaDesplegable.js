import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ListaDesplegable({ stock }) {
  const [selectedValue, setSelectedValue] = useState(null);

  // Genera dinámicamente las opciones según el stock
  const pickerItems = Array.from({ length: stock }, (_, index) => index + 1);
  console.log('Variant seleccionada:', stock);

  return (
    <>
      <Picker
        selectedValue={selectedValue}
        style={[styles.pickerStyle]}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {pickerItems.map((item) => (
          <Picker.Item
            key={item}
            label={`${item} Unidad${item > 1 ? 'es' : ''}`}
            value={item}
            style={{ fontSize: 12 }}
          />
        ))}
      </Picker>
    </>
  );
  
}

const styles = StyleSheet.create({
  pickerStyle: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
