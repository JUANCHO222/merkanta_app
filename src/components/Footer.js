import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerUp}>
        <Text>Hola</Text>
      </View>
      <View style={styles.footerDown}>
        <Text >Procesamos el pago y el envío con</Text>
        <Image
          source={require('../../assets/Cliente-Logo-Mercado-Libre.png')}
          style={styles.footerDownImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'column',
    width: '361px',
    height: '336px',
    backgroundColor: '#00A76F',
  },
  footerUp: {
    flex: 1,
    width: '361px',
    height: '256px',
    justifyContent: 'center', // Para centrar el contenido verticalmente
    alignItems: 'center', // Para centrar el contenido horizontalmente
  },
  footerDown: {
    flex: 1,
    flexDirection: 'row',
    width: '361px',
    height: '80px',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDownImage: {
    width: 120,
    height: 40,
  },
  textDown:{
    fontSize: '10px',
  }
});
