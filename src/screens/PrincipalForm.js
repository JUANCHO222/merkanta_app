import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import EntradaTexto from '../components/EntradaTexto';
import PrimaryButton from '../components/PrimaryButton';
import Separador from '../components/Separador';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function PrincipalForm() {
  const navigation = useNavigation();

  // Estados para los campos de entrada
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  // const [numeroExterior, setNumeroExterior] = useState('');
  // const [numeroInterior, setNumeroInterior] = useState('');
  // const [calle, setCalle] = useState('');
  // const [colonia, setColonia] = useState('');
  // const [municipio, setMunicipio] = useState('');
  // const [codigoPostal, setCodigoPostal] = useState('');
  // const [ciudad, setCiudad] = useState('');
  // const [estado, setEstado] = useState('');
  // const [pais, setPais] = useState('');
  // const [referencia, setReferencia] = useState('');

  // Recuperar datos del usuario desde AsyncStorage
  const getUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const userId = await AsyncStorage.getItem('userId');
      console.log('Datos recuperados de AsyncStorage:', { email, userId });

      if (email && userId) {
        setUser({ email, id: userId });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error.message);
      setUser(null);
    }
  };

  // Manejar la escritura de datos en el backend
  const handleWriteData = async () => {
    if (!nombre || !apellido || !telefono) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const response = await fetch(
        `https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Usuario/${user.id}/complete-profile`,
        {
          method: 'PUT',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nombre: nombre,
            Apellido: apellido,
            Telefono: telefono,
            Email: user.email, // Aquí agregamos el email
          }),
        }
      );
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error al completar perfil.');
      }
  
      Alert.alert('Éxito', 'Perfil completado exitosamente.');
      navigation.navigate('Mi Cuenta'); // Redirige al dashboard o a la pantalla que prefieras
    } catch (error) {
      console.error('Error al completar perfil:', error.message);
      Alert.alert('Error', 'No se pudo completar el perfil. Intenta más tarde.');
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      getUserData(); // Cargar datos cada vez que la pantalla esté activa
    }, [])
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.content}>
        <ScrollView>
          <Text style={styles.label}>Nombre</Text>
          <EntradaTexto
            placeholder={'Nombre'}
            iconName={'person'}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Apellido</Text>
          <EntradaTexto
            placeholder={'Apellido'}
            iconName={'person'}
            value={apellido}
            onChangeText={setApellido}
          />

          <Text style={styles.label}>Teléfono</Text>
          <EntradaTexto
            placeholder={'Teléfono'}
            iconName={'phone'}
            value={telefono}
            onChangeText={setTelefono}
          />

          {/* <Separador />

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
          /> */}

          <PrimaryButton
            texto={'Guardar'}
            color={'#0abf7e'}
            ancho={45}
            bordered={false}
            onPress={handleWriteData}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10, // Añadir un poco de margen arriba
  },
  numberFieldsContainer: {
    marginBottom: 0, // Espaciado entre cada campo de número
  },
});
