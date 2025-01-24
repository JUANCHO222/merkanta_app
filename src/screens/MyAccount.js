import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyAccount() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

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


  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpia todos los datos de AsyncStorage
      setUser(null); // Resetea el estado del usuario
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      navigation.navigate('InicioTab', { screen: 'Home' }); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData(); // Cargar datos cada vez que la pantalla esté activa
    }, [])
  );

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.labelStyle}>¡Bienvenido, {user.id}!</Text>
          <TouchableOpacity
            style={[styles.cardData]}
            onPress={() => navigation.navigate('InicioTab', { screen: 'Datos' })}
          >
            <LinearGradient
              colors={['#2fd896', '#a4f6ce']}
              style={[styles.gradient, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.textButton}>Mis datos</Text>
              <MaterialCommunityIcons name="card-account-details-outline" size={30} color="black" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardData]}
            onPress={() => navigation.navigate('InicioTab', { screen: 'Direcciones' })}
          >
            <LinearGradient
              colors={['#2fd896', '#a4f6ce']}
              style={[styles.gradient, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.textButton}>Agregar dirección</Text>
              <Ionicons name="location-sharp" size={30} color="black" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardData]}
            onPress={() => navigation.navigate('InicioTab', { screen: 'Mis Compras' })}
          >
            <LinearGradient
              colors={['#2fd896', '#a4f6ce']}
              style={[styles.gradient, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.textButton}>Mis Compras</Text>
              <Ionicons name="bag" size={30} color="black" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Botón de Cerrar Sesión */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={require('../../assets/images/boxtroll.png')}
            style={styles.image}
          />
          <Text style={styles.labelStyle}>¡Inicia sesión para poder acceder!</Text>
          <View style={{ marginBottom: 10 }}>
            <PrimaryButton
              color={'#0abf7e'}
              texto={'Iniciar sesión'}
              ancho={45}
              onPress={() => navigation.navigate('InicioTab', { screen: 'Login' })}
            />
          </View>
          <PrimaryButton
            color={'red'}
            texto={'Crear Cuenta'}
            ancho={45}
            bordered={true}
            onPress={() => navigation.navigate('InicioTab', { screen: 'Signup' })}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#d6d6d6',
  },
  labelStyle: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  cardData: {
    height: 60,
    flexDirection: 'row',
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
  gradient: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccount;
