import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function AddressForm({
  direccion,
  onInputChange,
  onSave,
  onCancel,
}) {
  const [region, setRegion] = useState({
    latitude: 19.4326, // Default to Mexico City
    longitude: -99.1332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState(null);

  // Función para obtener coordenadas de la dirección
  const getCoordinatesFromAddress = async () => {
    const { calle, numeroExterior, colonia, municipio, codigoPostal, ciudad, estado } = direccion;
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
          latitudeDelta: 0.008,
          longitudeDelta: 0.008, // Reduce el zoom para un enfoque más cercano
        });
        setMarker({ latitude: lat, longitude: lng });
      } else {
        Alert.alert('Error', 'No se pudo encontrar la ubicación. Verifica los datos ingresados.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener las coordenadas.');
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    onInputChange('latitud', latitude.toString());
    onInputChange('longitud', longitude.toString());
  };

  const handleSave = () => {
    if (!marker) {
      Alert.alert('Error', 'Selecciona una ubicación en el mapa antes de guardar.');
      return;
    }
    onSave();
  };

  useEffect(() => {
    if (direccion.latitud && direccion.longitud) {
      setRegion({
        latitude: parseFloat(direccion.latitud),
        longitude: parseFloat(direccion.longitud),
        latitudeDelta: 0.008,  // Establece un zoom adecuado
        longitudeDelta: 0.008,
      });
      setMarker({
        latitude: parseFloat(direccion.latitud),
        longitude: parseFloat(direccion.longitud),
      });
    }
  }, [direccion.latitud, direccion.longitud]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calle:</Text>
      <TextInput
        value={direccion.calle}
        style={styles.input}
        onChangeText={(text) => onInputChange('calle', text)}
      />
      <Text style={styles.label}>Número Exterior:</Text>
      <TextInput
        value={direccion.numeroExterior}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => onInputChange('numeroExterior', text)}
      />
      <Text style={styles.label}>Número Interior:</Text>
      <TextInput
        value={direccion.numeroInterior}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => onInputChange('numeroInterior', text)}
      />
      <Text style={styles.label}>Colonia:</Text>
      <TextInput
        value={direccion.colonia}
        style={styles.input}
        onChangeText={(text) => onInputChange('colonia', text)}
      />
      <Text style={styles.label}>Municipio:</Text>
      <TextInput
        value={direccion.municipio}
        style={styles.input}
        onChangeText={(text) => onInputChange('municipio', text)}
      />
      <Text style={styles.label}>Código Postal:</Text>
      <TextInput
        value={direccion.codigoPostal}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => onInputChange('codigoPostal', text)}
      />
      <Text style={styles.label}>Ciudad:</Text>
      <TextInput
        value={direccion.ciudad}
        style={styles.input}
        onChangeText={(text) => onInputChange('ciudad', text)}
      />
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        value={direccion.estado}
        style={styles.input}
        onChangeText={(text) => onInputChange('estado', text)}
      />

      <Text style={styles.label}>referencia:</Text>
      <TextInput
        value={direccion.referencia}
        style={styles.input}
        onChangeText={(text) => onInputChange('referencia', text)}
      />


      {/* Botón para obtener la ubicación en el mapa */}
      <Button title="Buscar Dirección" onPress={getCoordinatesFromAddress} />

      {/* Mapa */}
      {region && (
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            {marker && <Marker coordinate={marker} />}
          </MapView>
        </View>
      )}

      {/* Botones de guardar y cancelar */}
      <Button title="Guardar Dirección" onPress={handleSave} />
      <Button title="Cancelar" onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  map: {
    width: '100%',  // Esto hace que el mapa ocupe todo el ancho disponible
    height: 400,    // Ajusta esta altura para que el mapa se vea más grande si lo deseas
  },
});
