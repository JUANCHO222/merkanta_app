import React, { useState, useEffect, use } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import EntradaTexto from '../components/EntradaTexto';
import PrimaryButton from '../components/PrimaryButton';
import Separador from '../components/Separador';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function PrincipalForm() {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [calle, setCalle] = useState('');
  const [numeroExterior, setNumeroExterior] = useState('');
  const [numeroInterior, setNumeroInterior] = useState('');
  const [colonia, setColonia] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [referencia, setReferencia] = useState('');
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  // Recuperar datos del usuario desde AsyncStorage
  const getUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const userId = await AsyncStorage.getItem('userId');
      const userTypeId = await AsyncStorage.getItem('userType');
      console.log('Datos recuperados de AsyncStorage:', { email, userId, userTypeId });

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

  useFocusEffect(
    React.useCallback(() => {
      getUserData(); // Cargar datos cada vez que la pantalla esté activa
    }, [])
  );

  // Obtener coordenadas iniciales basadas en la dirección
  const getCoordinatesFromAddress = async () => {
    if (!calle || !numeroExterior || !colonia || !municipio || !codigoPostal || !ciudad || !estado) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios de dirección.');
      return;
    }
  
    const address = `${calle} ${numeroExterior}, ${colonia}, ${municipio}, ${ciudad}, ${estado}, México, ${codigoPostal}`;
    const apiKey = 'AIzaSyAeM3Jzd731HYj-JQ8NHE_9jvgU4Szn_so'; // Reemplaza con tu clave de API de Google Maps
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
  
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01, // Zoom más cercano
          longitudeDelta: 0.01,
        });
  
        setMarker({
          latitude: lat,
          longitude: lng,
        });
  
        Alert.alert('Ubicación encontrada', 'La dirección se ha localizado correctamente en el mapa.');
      } else {
        Alert.alert('Error', 'No se pudo encontrar la ubicación. Verifica los datos ingresados.');
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      Alert.alert('Error', 'Hubo un problema al obtener la ubicación. Inténtalo más tarde.');
    }
  };
  

useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos denegados',
        'No se pudo obtener la ubicación porque los permisos fueron denegados.'
      );
      return;
    }

    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom inicial
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener tu ubicación.');
    }
  })();
}, []);


  // Guardar los datos y las coordenadas en la BD
  const handleWriteData = async () => {
    if (!marker) {
      Alert.alert('Error', 'Selecciona una ubicación en el mapa antes de guardar.');
      return;
    }
  
    // Asegúrate de que todos los campos requeridos tengan datos
    const direccion = {
      Calle: calle,
      NumeroExterior: numeroExterior,
      NumeroInterior: numeroInterior && numeroInterior.trim() !== '' ? parseInt(numeroInterior, 10) : null, // Asegúrate de que el número interior sea nulo si está vacío
      ColoniaLocalidad: colonia,
      MunicipioAlcaldia: municipio,
      CodigoPostal: codigoPostal,
      CiudadPueblo: ciudad,
      Estado: estado,
      Pais: 'México',
      Referencia: referencia,
      Latitud: String(marker.latitude),
      Longitud: String(marker.longitude),
    };
  
    // Verifica que no falten campos obligatorios
    if (!nombre || !apellido || !telefono || !calle || !numeroExterior || !colonia || !municipio || !codigoPostal || !ciudad || !estado) {
      Alert.alert('Error', 'Por favor llena todos los campos obligatorios.');
      return;
    }
  
    const requestData = {
      nombre,
      apellido,
      telefono,
      direccion,
    };
  
    console.log('Datos que se enviarán:', requestData);
  
    try {
      const response = await fetch(`https://c0c7-2806-2f0-9180-ce1f-8184-3299-62da-ed87.ngrok-free.app/api/Usuario/${user.id}/complete-profile-with-address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        Alert.alert('Error', 'Hubo un problema al guardar los datos. Inténtalo más tarde.');
        return;
      }
  
      const jsonResponse = await response.json();
      console.log('Respuesta JSON:', jsonResponse);
  
      if (jsonResponse.mensaje && jsonResponse.mensaje.includes("correctamente")) {
        Alert.alert('Éxito', 'Los datos se guardaron correctamente.');
      } else {
        Alert.alert('Error', 'No se pudo guardar los datos.');
      }
      
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Alert.alert('Error', 'Hubo un problema al enviar los datos. Inténtalo más tarde.');
    }
  };
  
  
  
  
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Separador texto="Datos personales" />
        <EntradaTexto placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <EntradaTexto placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <EntradaTexto placeholder="Teléfono" value={telefono} onChangeText={setTelefono} />

        <Separador texto="Dirección" />
        <EntradaTexto placeholder="Calle" value={calle} onChangeText={setCalle} />
        <EntradaTexto placeholder="Número Exterior" value={numeroExterior} onChangeText={setNumeroExterior} />
        <EntradaTexto placeholder="Número Interior" value={numeroInterior} onChangeText={setNumeroInterior} />
        <EntradaTexto placeholder="Colonia o Localidad" value={colonia} onChangeText={setColonia} />
        <EntradaTexto placeholder="Municipio o Alcaldía" value={municipio} onChangeText={setMunicipio} />
        <EntradaTexto placeholder="Código Postal" value={codigoPostal} onChangeText={setCodigoPostal} />
        <EntradaTexto placeholder="Ciudad o Pueblo" value={ciudad} onChangeText={setCiudad} />
        <EntradaTexto placeholder="Estado" value={estado} onChangeText={setEstado} />
        <EntradaTexto placeholder="Referencia" value={referencia} onChangeText={setReferencia} />

        <PrimaryButton texto="Localizar en Mapa" onPress={getCoordinatesFromAddress} />
      </ScrollView>

      {region ? (
      <>
        {/* <Text>Latitud: {region.latitude}</Text>
        <Text>Latitud: {region.longitude}</Text> */}
        <MapView
  style={styles.map}
  region={region}
  onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
  onPress={(e) => setMarker(e.nativeEvent.coordinate)} // Agregar marcador en la ubicación seleccionada
>
  {marker && <Marker coordinate={marker} />}
</MapView>

        <PrimaryButton texto="Guardar Datos" onPress={handleWriteData} />
      </>
    ) : (
      <Text style={styles.loadingText}>Cargando mapa...</Text>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200, // Ajusta la altura según sea necesario
  },
});