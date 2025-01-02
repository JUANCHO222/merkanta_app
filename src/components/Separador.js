import React from 'react'
import { View, Text } from 'react-native'
import { ComponentStyles } from '../styles/ComponentStyles'

export default function Separador() {
  return (
    <View style={ComponentStyles.separatorContainer}>
        <View style={ComponentStyles.line} />
        <Text style={ComponentStyles.separatorText}>O</Text>
        <View style={ComponentStyles.line} />
    </View>
  )
}


