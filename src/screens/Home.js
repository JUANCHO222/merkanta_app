import React, { useState } from 'react';
import {View, SafeAreaView, FlatList, Button} from 'react-native';
import CardProductsCategories from '../components/CardProductsCategories';
import CardFeaturedProduct from '../components/CardFeaturedProduct';
import CardCategories from '../components/CardCategories';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client'; // Importa el cliente de Apollo que configuraste
import { GlobalStyles } from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
export default function Home(){
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    // Función para recargar todos los productos en la pantalla
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
        // TODO: Aquí puedes hacer el refetch de las consultas o cualquier acción de recarga que quieras
        
        } catch (error) {
            console.error('Error al recargar:', error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <ApolloProvider client={client}>
                <FlatList
                    data={[1]} // Esta es una lista de ejemplo. Puedes pasar tus datos si es necesario
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => (
                    <>
                        <View style={GlobalStyles.content}>

                        <CardProductsCategories 
                        collectionHandle="covid-19"
                        onPress={() => navigation.navigate('Categoria',{collectionHandle:'covid-19'}
                        )}/>
                        <CardCategories title="Categorías" />
                        <CardProductsCategories 
                        collectionHandle="miscelaneos-y-abarrotes" 
                        onPress={() => navigation.navigate('Categoria',{collectionHandle:'miscelaneos-y-abarrotes'})}/>

                        <CardFeaturedProduct />
                        {/* <Button title="Ir a Prueba" onPress={() => navigation.navigate('PruebaTab')}/> */}
                        </View>
                    </>
                    )}
                    refreshing={refreshing} // Muestra el estado de refresco
                    onRefresh={handleRefresh} // Llama a la función de recarga cuando el usuario hace Pull to Refresh
                    // ListFooterComponent={<Footer />} // Puedes agregar más componentes en el pie de la lista si es necesario
                />
            </ApolloProvider>
        </SafeAreaView>
    );
}
