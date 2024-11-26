import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback,
} from 'react-native';
import { BtnPrimary } from '../../components';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { auth, onAuthStateChanged, db, doc, updateDoc } from '../../firebase/firebase';

export default function Formulario() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null); // Imagen de perfil
  const [modalVisible, setModalVisible] = useState(false);

  // Datos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [extNumber, setExtNumber] = useState('');
  const [intNumber, setIntNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });

    return () => subscriber(); // Cleanup
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se necesita permiso para acceder a las fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [image],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'No se encontró un usuario autenticado.');
      return;
    }

    try {
      const userDocRef = doc(db, 'usuario', user.uid);

      // Datos a actualizar
      const updatedData = {
        nombreUsuario: name,
        apellidoUsuario: lastName,
        telefono: phone,
        direccion: {
          calle: street,
          numeroExterior: extNumber,
          numerioInterior: intNumber,
          codigoPostal: postalCode,
          estado: state,
          pais: country,
        },
        imgPerfil: image || '', // Agrega la URL de la imagen si se selecciona
      };

      await updateDoc(userDocRef, updatedData);
      Alert.alert('Éxito', 'Perfil actualizado correctamente.');
      // Redirigir a la pantalla principal después de registrarse
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }] // Cambia 'Home' por el nombre de tu pantalla principal
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.message);
      Alert.alert('Error', 'No se pudo actualizar el perfil. Inténtalo nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image source={require('../../../assets/icon.png')} style={styles.image} />
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <MaterialIcons name="image" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Calle</Text>
        <TextInput
          style={styles.input}
          placeholder="Calle"
          value={street}
          onChangeText={setStreet}
        />
        <Text style={styles.label}>Número Exterior</Text>
        <TextInput
          style={styles.input}
          placeholder="Número Exterior"
          value={extNumber}
          onChangeText={setExtNumber}
        />
        <Text style={styles.label}>Número Interior</Text>
        <TextInput
          style={styles.input}
          placeholder="Número Interior"
          value={intNumber}
          onChangeText={setIntNumber}
        />
        <Text style={styles.label}>Código Postal</Text>
        <TextInput
          style={styles.input}
          placeholder="Código Postal"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={state}
          onChangeText={setState}
        />
        <Text style={styles.label}>País</Text>
        <TextInput
          style={styles.input}
          placeholder="País"
          value={country}
          onChangeText={setCountry}
        />

        <BtnPrimary texto="Guardar Cambios" onPress={handleSubmit} color="#00A76F" largo="100%" ancho={50} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Agrega tus estilos aquí
});
