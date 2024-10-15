import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { BtnPrimary, CardProduct,TxtEntrada, CardProductsCategories,Footer } from '../components';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <CardProductsCategories/>
                </View>
            <Footer  style={styles.footer}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F0F0', // Color de fondo para la pantalla
    },
    scrollContent: {
        flexGrow: 1, // Permite que el ScrollView use el espacio disponible
        justifyContent: 'space-between', // Centra el contenido verticalmente si hay espacio suficiente
    },
    content: {
        flexDirection:'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: 'black',
        padding: 13,
        margin: 15, // Margen para separar los productos
    },    footer: {
        width: '100%', // Asegura que el footer ocupe el 100% del ancho de la pantalla
        backgroundColor: '#fff', // Puedes cambiar este color según el diseño
        borderColor: '#ccc', // Color de la línea superior
    },
});
