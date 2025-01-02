import React from 'react';
import {useState, useEffect} from 'react'
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import CardHistorial from '../components/CardHistorial';

function PurchaseHistory() {
  const navigation = useNavigation();
  const data = [1]
  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
            <View style={GlobalStyles.content}>
              <CardHistorial/> // ToDo: Convertir esto en un button o collide que contenga Buttons
            </View>
        )}
        contentContainerStyle={GlobalStyles.scroll}
      />

    </View>
  );
}

export default PurchaseHistory;
