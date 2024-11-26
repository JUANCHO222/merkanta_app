import React from 'react';
import { StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function ListaDesplegable() {
    const [selectedValue, setSelectedValue] = useState("java");

    return (
      <Picker
        selectedValue={selectedValue}
        style={[styles.pickerStyle]}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item style={{fontSize: 12}} label="1 Unidad" value={1} />
        <Picker.Item style={{fontSize: 12}} label="2 Unidades" value={2} />
        <Picker.Item style={{fontSize: 12}} label="3 Unidades" value={3} />
      </Picker>
)};


const styles = StyleSheet.create({
    pickerStyle:{
        flex:1,
        height:45,
        borderWidth:1,
        backgroundColor:'#fff'
    }

})