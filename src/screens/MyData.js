import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import EntradaTexto from '../components/EntradaTexto';
import PrimaryButton from '../components/PrimaryButton';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyData() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
  });
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
      
      if (userId) {
        setUser({ userId });
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.userId) return;

      try {
        const response = await fetch(
          `https://sought-dassie-partly.ngrok-free.app/api/Usuario/obtener-usuario/${user.userId}`
        );
        if (!response.ok) throw new Error('Error al obtener los datos del usuario');
        const data = await response.json();
        setUserData({
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user || !user.userId) {
      Alert.alert('Error', 'No se pudo identificar al usuario');
      return;
    }

    try {
      const response = await fetch(
        `https://sought-dassie-partly.ngrok-free.app/api/Usuario/EditarUsuario/${user.userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono,
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Éxito', 'Datos actualizados correctamente');
        setIsEditing(false);
      } else {
        const errorMessage = await response.text(); // Lee el mensaje de error de la respuesta
        console.error('Error al actualizar los datos:', errorMessage);
        Alert.alert('Error', 'No se pudieron actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar actualizar los datos');
    }
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text>Nombre</Text>
          <EntradaTexto
            placeholder={'Nombre'}
            iconName={'person'}
            value={userData.nombre}
            onChangeText={(text) => setUserData({ ...userData, nombre: text })}
          />
          <Text>Apellido</Text>
          <EntradaTexto
            placeholder={'Apellido'}
            iconName={'person'}
            value={userData.apellido}
            onChangeText={(text) => setUserData({ ...userData, apellido: text })}
          />
          <Text>Telefono</Text>
          <EntradaTexto
            placeholder={'Telefono'}
            iconName={'phone'}
            value={userData.telefono}
            onChangeText={(text) => setUserData({ ...userData, telefono: text })}
          />
          <Text>Email</Text>
          <EntradaTexto
            placeholder={'Email'}
            iconName={'mail'}
            disabled={true}
            value={userData.email}
          />
          <View style={{ marginBottom: 15 }}>
            <PrimaryButton
              texto={'Guardar'}
              color={'#0abf7e'}
              ancho={45}
              bordered={false}
              onPress={handleSave}
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
          <View style={styles.cardData}>
            <Text style={styles.labelTitle}>Datos Personales</Text>
            <Text style={styles.textDescription}>Nombre: {userData.nombre}</Text>
            <Text style={styles.textDescription}>Apellidos: {userData.apellido}</Text>
            <Text style={styles.textDescription}>Email: {userData.email}</Text>
            <Text style={styles.textDescription}>Numero de telefono: {userData.telefono}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    padding: 20,
  },
  cardData: {
    padding: 10,
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
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
});
