import React,{useState} from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import EntradaTexto from '../components/EntradaTexto'
import PrimaryButton from '../components/PrimaryButton'



export default function MyData() {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <View style={[styles.container]}>
      { isEditing ? (
        <>
          <Text>Nombre</Text>
          <EntradaTexto placeholder={'Nombre'} iconName={'person'}/>
          <Text>Apellido</Text>
          <EntradaTexto placeholder={'Apellido'} iconName={'person'}/>
          <Text>Telefono</Text>
          <EntradaTexto placeholder={'Telefono'} iconName={'phone'}/>
          <Text>Email</Text>
          <EntradaTexto placeholder={'Email'} iconName={'mail'} disabled={true}/> 
          <View style={{marginBottom:15}}>
            <PrimaryButton
              texto={'Guardar'}
              color={'#0abf7e'}
              ancho={45}
              bordered={false}
              onPress={() => {}}
            />
          </View>

          <PrimaryButton
            texto={'Cancelar'}
            color={'red'}
            ancho={45}
            bordered={false}
            onPress={() => setIsEditing(false)}
          />
        </>
      ) : (
          <>
            <View style={[styles.cardData]}>
              <Text style={[styles.labelTitle]}>Datos Personales</Text>
              <Text style={[styles.textDescription]}>Nombre:</Text>
              <Text style={[styles.textDescription]}></Text>
              <Text style={[styles.textDescription]}>Apellidos:</Text>
              <Text style={[styles.textDescription]}></Text>
              <Text style={[styles.textDescription]}>Email:</Text>
              <Text style={[styles.textDescription]}></Text>
              <Text style={[styles.textDescription]}>Numero de telefono:</Text>
              <Text style={[styles.textDescription]}></Text>
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
        ) 
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#d9d9d9',
        padding:20
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
    labelTitle:{
      fontSize:16,
      fontWeight:'bold',
      marginBottom:5
    }
})