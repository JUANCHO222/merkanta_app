import React from 'react'
import { View, Text } from 'react-native'
import { ComponentStyles } from '../styles/ComponentStyles'

export default function Separador({ texto }) {
  return (
    <View style={ComponentStyles.separatorContainer}>
        <View style={ComponentStyles.line} />
        <Text style={ComponentStyles.separatorText}>{texto}</Text>
        <View style={ComponentStyles.line} />
    </View>
  )
}


