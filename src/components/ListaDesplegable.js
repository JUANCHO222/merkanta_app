import React from 'react';
import { View, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function ListaDesplegable() {
    const [selectedValue, setSelectedValue] = useState("java");

    return (
    <View style={{ flex: 1, height:35, justifyContent: 'center', borderRadius:4,alignItems: 'center', borderWidth: 1 }}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 35, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item style={{fontSize: 12}} label="1 Unidad" value={1} />
        <Picker.Item style={{fontSize: 12}} label="2 Unidades" value={2} />
        <Picker.Item style={{fontSize: 12}} label="3 Unidades" value={3} />
      </Picker>
    </View>
)};
