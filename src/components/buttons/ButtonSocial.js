import React from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity, Image } from 'react-native';
import { ComponentStyles } from '../../styles/ComponentStyles';

export default function ButtonSocial({texto, ruta}) {
  return (
    <TouchableOpacity style={[ComponentStyles.buttonsStyle]}>
        <Image source={ruta} style={[ComponentStyles.iconStyle]} />
        <View style={ComponentStyles.containerLabel}>
          <Text style={[ComponentStyles.labelStyle]}>{texto}</Text>
        </View>
    </TouchableOpacity>
    )
  }
