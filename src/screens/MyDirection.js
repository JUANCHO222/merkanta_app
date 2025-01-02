import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import EntradaTexto from '../components/EntradaTexto'
import PrimaryButton from '../components/PrimaryButton'


export default function MyDirection() {

  const [isEditing, setIsEditing] = useState(false);
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{padding:20}}>
        {isEditing ? (
          <>
             <Text>Calle</Text>
        <EntradaTexto placeholder={'Calle'}/>
        <Text>Colonia</Text>
        <EntradaTexto placeholder={'Colonia'}/>
        <Text>Ciudad</Text>
        <EntradaTexto placeholder={'Ciudad'}/>
        <Text>Estado</Text>
        <EntradaTexto placeholder={'Estado'}/>
        <Text>Codigo Postal</Text>
        <EntradaTexto placeholder={'Codigo Postal'}/>
        <Text>Pais</Text>
        <EntradaTexto placeholder={'Pais'}/>

        <PrimaryButton 
          texto={'Guardar'}
          color={'#0abf7e'}
          ancho={45}
          bordered={false}
          onPress={() => {}}
        />
        <PrimaryButton 
          texto={'Cancelar'}
          color={'red'}
          ancho={45}
          bordered={false}
          onPress={() => setIsEditing(false)}
        />
          </>
        ):
        (
          <>
            <View style={[styles.cardData]}>
              <Text style={[styles.labelTitle]}>Dirección</Text>
              <Text style={[styles.textDescription]}>Calle 123, Colonia ABC, Ciudad XYZ, Estado de México, 55555</Text>
              <PrimaryButton 
                texto={'Editar'}
                color={'#0abf7e'}
                ancho={45}
                largo={'100%'}
                bordered={false}
                onPress={() => setIsEditing(true)}
              />
            </View>
          </>
        )}
     
      </ScrollView>

        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#d9d9d9',
    },
    cardData: {
      padding:10,
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10,
      alignItems: 'flex-start',
      justifyContent:'flex-start',
      overflow: 'hidden', // Asegura que el gradiente no se salga del botón
    },
})