import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import facebook from '../../assets/icons/icons8-facebook-svg.png'; // Asegúrate de la ruta correcta
import youtube from '../../assets/icons/icons8-instagram-svg.png';
import instagram from '../../assets/icons/icons8-tik-tok-svg.png';
import tiktok from '../../assets/icons/icons8-youtube-svg.png';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerUp}>
      <View style={styles.socialIcons}>
          <Image source={facebook} style={styles.icon} />
          <Image source={youtube} style={styles.icon} />
          <Image source={instagram} style={styles.icon} />
          <Image source={tiktok} style={styles.icon} />
        </View>
        <Image
          source={require('../../assets/images/mekanta_logo-removebg-preview.png')}
          style={{ width: 200, height: 50, alignSelf: 'center'}}
        />
        <Text style={styles.textUp}>
          Sándalo 83, Santa María Insurgentes, Cuauhtémoc, 06430 Ciudad de México, CDMX
        </Text>
        <Text style={styles.textUp}>Términos y condiciones</Text>
      </View>

      <View style={styles.footerDown}>
        <Text style={{ fontSize:10 }}>Procesamos el pago y el envío con</Text>
        <Image
          source={require('../../assets/images/Cliente-Logo-Mercado-Libre.png')}
          style={styles.footerDownImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 200,
    flexDirection: 'column',
    backgroundColor: '#00A76F',
    justifyContent: 'space-between', // Centra el contenido verticalmente si hay espacio suficiente
    alignSelf: 'stretch', // 
    alignItems: 'center', // Centra el contenido horizontalmente

  },
  footerUp: {
    width: '100%',
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerDown: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDownImage: {
    width: 72,
    height: 34,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textUp: {
    width:'100%',
    fontSize:10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
});
