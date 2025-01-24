// ! Librerias y componentes
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

// ! Iconos
import facebook from '../../assets/icons/icons8-facebook-svg.png'; // Asegúrate de la ruta correcta
import youtube from '../../assets/icons/icons8-instagram-svg.png';
import instagram from '../../assets/icons/icons8-tik-tok-svg.png';
import tiktok from '../../assets/icons/icons8-youtube-svg.png';

export default function Footer() {
  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerContent}>
        <View style={styles.containerIcon}>
            <Image source={facebook} style={styles.icon} />
            <Image source={youtube} style={styles.icon} />
            <Image source={instagram} style={styles.icon} />
            <Image source={tiktok} style={styles.icon} />
        </View>
        <Image
            source={require('../../assets/images/mekanta_logo-removebg-preview.png')}
            style={styles.imagenLogo}
        />
        <Text style={styles.text}>
          by <Text style={{fontWeight: 'bold'}}>Farvisan</Text>{'\n'}Sándalo 83, Santa María Insurgentes, Cuauhtémoc, 06430 Ciudad de México, CDMX
        </Text>
        <Text style={styles.text}>Términos y condiciones</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    containerFooter:{
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#00A76F',
    },
    containerContent:{
      margin:10,
      paddingHorizontal:10,
    },
    containerIcon:{
      marginTop:10,
      paddingHorizontal:10, // * espaciado entre componentes en el eje horizontal
      flexDirection:'row',
      justifyContent:'space-evenly',
    },
    containerAdvertisement:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#D9D9D9',
    },
    imagenLogo:{
      width: 270, 
      height: 50,
      alignSelf: 'center', // * Uica este componente en especifico 
      marginBottom: 10,
      marginTop:10,
      // borderWidth:1
    },
    imagenMercado:{
      width: 118,
      height: 36,
    },
    text:{
      marginHorizontal:10,
      marginBottom:10,
      fontSize:13,
      color:'white',
      textAlign: 'center',
      // borderWidth:1      
    },
    icon:{
      height:25,
      width:25,
      margin:5
    }
});
