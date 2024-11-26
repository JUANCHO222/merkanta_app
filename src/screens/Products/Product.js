import React from 'react';
import { Text,View, ScrollView, StyleSheet, Image } from 'react-native';
import { Footer, Lista, BtnPrimary, Carrusel } from '../../components/index';

export default function Products({ navigation }) {
  return (
    <View style={[styles.containerScreen]}>
      <ScrollView  contentContainerStyle={[styles.containerScroll]}>
        <View style={[styles.containerTitle]}>
          <Text style={[styles.titleLabel]}>24pack Toalla Escudo Desinfectante Superficies C/80pz</Text>
        </View>
        <View style={[styles.containerImage]}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.imageStyle} />
        </View>
        <View style={[styles.containerPrice]}>
          <View style={[styles.textContainer]}>
            <Text style={[styles.labelPrecioAntiguo]}>$2,999</Text>
          </View>
          <View style={[styles.textContainer]}>
            <Text style={[styles.labelPrecioActual]}>$3,499</Text>
            <Text style={[styles.labelDescuento]}>15% de descuento</Text>
          </View>
          <View style={[styles.textContainer, {flexDirection:'column', alignItems:'flex-start'}]}>
            <Text style={[styles.labelIva]}>Mas envio gratis</Text>
            <Text style={[styles.labelIva]}>Mas IVA</Text>
          </View>
          <View style={[styles.buttonsContainer]}>
            <View style={{marginBottom:10}}>
              <Lista/>
            </View>
            <View style={{marginBottom:10}}>
              <BtnPrimary color='#0072A766' texto='Agregar al carrito' ancho={50}/>
            </View>
            <View>
              <BtnPrimary color='#00A76F' texto='Comprar' ancho={50}/>
            </View>
          </View>

          <View style={[styles.containerDescription]}>
            <Text style={[styles.labelTitle]}>Descripción</Text>
            <Text style={[styles.textDescription]}>Caja de 24 Toallitas Húmedas Antibacteriales Escudo con 80 Toallas cada paquete.
              Las toallitas húmed1as Escudo antibacteriales son ideales para el día a día, protegiendo de imprevistos y siendo portátiles para eliminar el 99.9 % de las bacterias en diversas situaciones.
              Ingredientes activos: Caprilil Glicol y Benzoato de Sodio. No contienen Triclosán ni parabenos, evitando la resequedad.
              Poseen una fragancia agradable y delicada. No dejan sensación pegajosa y están libres de parabenos.
              Registro COFEPRIS: 163300202D0325</Text>
          </View>
          <View>
            <Text style={[styles.labelTitle]}>Otros productos similares</Text>
            <View style={{marginBottom:20}}>
              <Carrusel/>
            </View>
          </View>
          
        </View>
        <Footer/>
      </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  containerScroll:{
    justifyContent:'space-between'
  },
  containerTitle:{
    margin:20,
  },
  titleLabel:{
    fontSize:15,
    color:'black',
  },
  containerImage:{
    marginHorizontal: 20,
    height:350,
    marginBottom:10,
    borderWidth:1
  },
  imageStyle:{
    width:'100%',
    height:'100%',
    borderRadius:12
  },
  containerPrice:{
    marginHorizontal:20,
  },
  textContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
  },
  labelPrecioAntiguo:{
    fontSize:16,
    color:'#7D7D7D'
  },
  labelPrecioActual:{
    fontSize:32,
    color:'black',
  }, 
  labelDescuento:{
    color:'green',
    fontSize:14,
    paddingTop:10,
    marginHorizontal:10
    },
  labelIva:{
    color:'black',
    fontSize:11,
  },
  buttonsContainer:{
    marginVertical:10,
  },
  labelTitle:{
    fontSize:15,
    fontWeight:'bold',
    marginBottom:10,
  },
  containerDescription:{
    marginBottom:10,
    marginVertical:10
  },
  textDescription:{
    fontSize:15,
    textAlign:'left'
  }

})