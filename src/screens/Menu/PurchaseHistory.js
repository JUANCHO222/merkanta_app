import React from 'react';
import {useState, useEffect} from 'react'
import {View, StyleSheet, FlatList} from 'react-native';
import { TarjetaHistorial } from '../../components/index';
import { auth, onAuthStateChanged } from '../../firebase/firebase';  // Asegúrate de importar correctamente
import {useNavigation} from '@react-navigation/native';
import { BtnPrimary } from '../../components/index';
import { GlobalStyles } from '../../styles/GlobalStyles';

function PurchaseHistory() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const data = [1]

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualiza el estado cuando el usuario cambie
    });
    
    // Limpiar el suscriptor cuando el componente se desmonte
    return () => subscriber(); 
  }, []);


  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
            <View style={GlobalStyles.content}>
              {user ? (
                <>
                  <TarjetaHistorial />
                </>
              ):
              (
                <>
                  <BtnPrimary 
                    onPress={() => {
                    navigation.navigate('Login')}}
                    color='#00A76F'
                    texto='Iniciar sesion'
                    ancho={45}
                    largo={'100%'}
                  />
                </>
              )}
            </View>
        )}
        contentContainerStyle={GlobalStyles.scroll}
      />

    </View>
  );
}

export default PurchaseHistory;
