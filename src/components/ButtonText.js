import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ComponentStyles } from '../styles/ComponentStyles'
export default function ButtonText({texto, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={ComponentStyles.buttonText}>
        <Text style={ComponentStyles.forgotPasswordText}>{texto}</Text>
    </TouchableOpacity>
  )
}
