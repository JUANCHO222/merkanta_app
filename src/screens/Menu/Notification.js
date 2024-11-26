import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { BtnPrimary, TarjetaNotificacion,   } from '../../components/index';
import { auth, onAuthStateChanged } from '../../firebase/firebase';  // Asegúrate de importar correctamente
import {useNavigation} from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { GlobalStyles } from '../../styles/GlobalStyles';



export default function Notification() {
  const navigation = useNavigation();
  const data = [1]
  const [user, setUser] = useState(null);

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
                {user ? 
                  (
                    <>
                      <TarjetaNotificacion/>
                    </>
                  ):
                  (
                    <>
                      <BtnPrimary texto='Iniciar sesion' color='#00A76F' largo={'100%'} ancho={45} onPress={() => {
                        navigation.navigate('Login')}}/>
                    </>
                  )
                }
              </View>
          )}
          contentContainerStyle={GlobalStyles.scroll}
        />
    </View>
  );
}
