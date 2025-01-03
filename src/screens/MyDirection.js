import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import EntradaTexto from '../components/EntradaTexto'
import PrimaryButton from '../components/PrimaryButton'

export default function MyDirection() {
  const [numeroExterior, setNumeroExterior] = useState('');
  const [numeroInterior, setNumeroInterior] = useState('');
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [referencia, setReferencia] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{padding:20}}>
        {isEditing ? (
          <>
         <Text style={styles.label}>Calle</Text>
          <EntradaTexto
            placeholder={'Calle'}
            value={calle}
            onChangeText={setCalle}
          />

          <View style={styles.numberFieldsContainer}>
            <Text style={styles.label}>Número Exterior</Text>
            <EntradaTexto
              placeholder={'Número Exterior'}
              value={numeroExterior}
              onChangeText={setNumeroExterior}
            />
          </View>

          <View style={styles.numberFieldsContainer}>
            <Text style={styles.label}>Número Interior</Text>
            <EntradaTexto
              placeholder={'Número Interior'}
              value={numeroInterior}
              onChangeText={setNumeroInterior}
            />
          </View>

          <Text style={styles.label}>Colonia o Localidad</Text>
          <EntradaTexto
            placeholder={'Colonia o Localidad'}
            value={colonia}
            onChangeText={setColonia}
          />

          <Text style={styles.label}>Municipio o Alcaldía</Text>
          <EntradaTexto
            placeholder={'Municipio o Alcaldía'}
            value={municipio}
            onChangeText={setMunicipio}
          />

          <Text style={styles.label}>Código Postal</Text>
          <EntradaTexto
            placeholder={'Código Postal'}
            value={codigoPostal}
            onChangeText={setCodigoPostal}
          />

          <Text style={styles.label}>Ciudad o Pueblo</Text>
          <EntradaTexto
            placeholder={'Ciudad o Pueblo'}
            value={ciudad}
            onChangeText={setCiudad}
          />

          <Text style={styles.label}>Estado</Text>
          <EntradaTexto
            placeholder={'Estado'}
            value={estado}
            onChangeText={setEstado}
          />

          <Text style={styles.label}>País</Text>
          <EntradaTexto
            placeholder={'País'}
            value={pais}
            onChangeText={setPais}
          />

          <Text style={styles.label}>Referencia</Text>
          <EntradaTexto
            placeholder={'Referencia'}
            value={referencia}
            onChangeText={setReferencia}
          />

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
            <PrimaryButton 
                texto={'Agregar +'}
                color={'#0abf7e'}
                ancho={45}
                largo={'100%'}
                bordered={false}
                onPress={() => {}}
              />
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