import React from 'react'
import {StyleSheet, Text, View} from 'react-native';

export default function Footer() {
  return (
    <View style={[styles.footer, styles.footerContent]}>
        <View style={[styles.footerContent]}>
            <Text style={[styles.footerText]}>Footer</Text>
        </View>
    
       
    </View>
  )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#007bff',
        alignItems: 'center',
      },
      footerContent: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
      },
      footerText: {
        color: 'white',
        fontSize: 16,
      },
})