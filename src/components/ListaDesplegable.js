import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ListaDesplegable({ stock, borderRadius = 12 }) {
  const [selectedValue, setSelectedValue] = useState(null);

  // Genera dinámicamente las opciones según el stock
  const pickerItems = Array.from({ length: stock }, (_, index) => index + 1);
  console.log('Variant seleccionada:', stock);

  return (
    <View style={[styles.pickerContainer, { borderRadius }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden', // Necesario para que el borderRadius se aplique correctamente
  },
  pickerStyle: {
    height: 45,
    backgroundColor: '#fff',
  },
});
