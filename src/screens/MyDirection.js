import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressForm from '../components/AddressForm'; 
import { BtnGlobal } from '../components';
export default function MyDirection() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [direcciones, setDirecciones] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false); 
  const [direccion, setDireccion] = useState({
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    municipio: '',
    codigoPostal: '',
    ciudad: '',
    estado: '',
    pais: '',
    referencia: '',
    latitud: '',
    longitud: ''
  });

  const getUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
            
      console.log('Datos recuperados de AsyncStorage:', { userId  });

      if (userId) {
        setUser({ id: userId });
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

  const fetchAddresses = async () => {
    if (!user || !user.id) return;
  
    try {
      const response = await fetch(
        `https://sought-dassie-partly.ngrok-free.app/api/Direccion/direcciones/${user.id}`
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error de la API:', errorData);
        throw new Error(errorData?.Message || 'Error al obtener los datos del usuario');
      }
  
      const data = await response.json();
      console.log("Direcciones obtenidas:", data);
  
      if (Array.isArray(data) && data.length > 0) {
        setDirecciones(data);
      }
    } catch (error) {
      console.error('Error al obtener las direcciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las direcciones.');
    }
  };
  
  useEffect(() => {
    fetchAddresses();
  }, [user]);
  
  const handleInputChange = (campo, valor) => {
    setDireccion((prevDireccion) => ({
      ...prevDireccion,
      [campo]: valor
    }));
  };


  const handleSave = async () => {
    const payload = {
      calle: direccion.calle,
      numeroExterior: direccion.numeroExterior,
      numeroInterior:direccion.numeroInterior, 
      coloniaLocalidad: direccion.colonia,
      municipioAlcaldia: direccion.municipio,
      codigoPostal: parseInt(direccion.codigoPostal, 10) || 0,
      ciudadPueblo: direccion.ciudad,
      estado: direccion.estado,
      pais: direccion.pais,
      referencia: direccion.referencia,
      latitud: parseFloat(direccion.latitud) || 0,
      longitud: parseFloat(direccion.longitud) || 0,
      status: true,
      idUsuario: user.id,
    };
  
    console.log("JSON que se enviará al backend:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch("https://sought-dassie-partly.ngrok-free.app/api/Direccion/crear-direccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Respuesta del backend:", data);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };
  
  const handleEditSave = async () => {
    if (!direccion.idDireccionUsuario || !user.id) {
      Alert.alert('Error', 'Faltan datos para editar la dirección.');
      return;
    }
  
    const payload = {
      calle: direccion.calle,
      numeroExterior: direccion.numeroExterior,
      numeroInterior: direccion.numeroInterior,
      coloniaLocalidad: direccion.colonia,
      municipioAlcaldia: direccion.municipio,
      codigoPostal: parseInt(direccion.codigoPostal, 10) || 0,
      ciudadPueblo: direccion.ciudad,
      estado: direccion.estado,
      pais: direccion.pais,
      referencia: direccion.referencia,
      latitud: parseFloat(direccion.latitud) || 0,
      longitud: parseFloat(direccion.longitud) || 0,
      status: true,
    };
  
    try {
      const response = await fetch(
        `https://sought-dassie-partly.ngrok-free.app/api/Direccion/editar-direccion/${user.id}/${direccion.idDireccionUsuario}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error al editar la dirección:', errorData);
        throw new Error(errorData?.Message || 'Error al editar la dirección');
      }
  
      const data = await response.json();
      console.log('Dirección actualizada exitosamente:', data);
  
      Alert.alert('Éxito', 'La dirección fue actualizada correctamente.');
      setIsEditing(false);
  
      // Llamar a fetchAddresses para actualizar la lista de direcciones
      fetchAddresses();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Alert.alert('Error', 'No se pudo actualizar la dirección.');
    }
  };
  
  

  const handleCancel = () => {
    setIsEditing(false); // Salir del modo de edición
    setIsAdding(false);  // Salir del modo de agregar nueva dirección
    setDireccion({
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      municipio: '',
      codigoPostal: '',
      ciudad: '',
      estado: '',
      pais: '',
      referencia: '',
      latitud: '',
      longitud: ''
    });
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
      {isAdding || isEditing ? (
  <AddressForm
    direccion={direccion}
    onInputChange={handleInputChange}
    onSave={isEditing ? handleEditSave : handleSave}
    onCancel={handleCancel}
  />
) : (
  <>
    {direcciones.length > 0 ? (
      direcciones.map((dir, index) => {
        return (
          <View key={index} style={styles.cardData}>
            <Text style={styles.labelTitle}>Dirección {index + 1}</Text>
            <Text style={styles.textDescription}>
              {`${dir.calle || ''} ${dir.numeroExterior || ''}, ${dir.coloniaLocalidad || ''}, ${dir.municipioAlcaldia || ''}, ${dir.ciudadPueblo || ''}, ${dir.estado || ''}, ${dir.codigoPostal || ''}, ${dir.pais || ''}`}
            </Text>
            <BtnGlobal
              texto="Editar"
              color="#ff7a00"
              ancho={45}
              largo="100%"
              bordered={false}
              onPress={() => {
                setIsEditing(true);
                setDireccion({
                  idDireccionUsuario: dir.idDireccionUsuario, // Necesario para la edición
                  calle: dir.calle || '',
                  numeroExterior: dir.numeroExterior || '',
                  numeroInterior: dir.numeroInterior || '',
                  colonia: dir.coloniaLocalidad || '', // Mapeo correcto
                  municipio: dir.municipioAlcaldia || '', // Mapeo correcto
                  codigoPostal: dir.codigoPostal?.toString() || '', // Convertir a cadena
                  ciudad: dir.ciudadPueblo || '', // Mapeo correcto
                  estado: dir.estado || '',
                  pais: dir.pais || '',
                  referencia: dir.referencia || '',
                  latitud: dir.latitud?.toString() || '',
                  longitud: dir.longitud?.toString() || '',
                });
              }}
              
            />
          </View>
        );
      })
    ) : (
      <Text style={{ textAlign: 'center', marginVertical: 20 }}>No se encontraron direcciones.</Text>
    )}
    <BtnGlobal
      texto="Agregar Nueva Dirección"
      color="#ff7a00"
      ancho={45}
      largo="100%"
      bordered={false}
      onPress={() => {
        setIsAdding(true);
        setDireccion({
          numeroExterior: '',
          numeroInterior: '',
          calle: '',
          colonia: '',
          municipio: '',
          codigoPostal: '',
          ciudad: '',
          estado: '',
          pais: 'México',
          referencia: '',
          latitud: '',
          longitud: '',
        });
      }}
    />
  </>
)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  cardData: {
    padding: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 15,
    elevation: 3,
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});
