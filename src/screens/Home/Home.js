import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Footer, ProductoDestacado, CardProductsCategories, CardPromos, Carro } from '../../components/index';
import { GlobalStyles } from '../../styles/GlobalStyles';

export default function Home({ navigation }) {
    // Datos de muestra para el ejemplo
    const data = [1]; // Usamos un array con un solo elemento para FlatList, ya que el contenido es fijo

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => (
                    <View style={GlobalStyles.content}>
                            <Carro />
                            <CardProductsCategories />
                            <CardPromos />
                            <ProductoDestacado />
                            <CardProductsCategories />
                    </View>
                )}
                ListFooterComponent={<Footer />}
                contentContainerStyle={GlobalStyles.scroll}
            />
        </SafeAreaView>
    );
}
