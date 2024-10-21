import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView,SafeAreaView  } from 'react-native';
import { Footer, ProductoDestacado  } from '../../components/index';

export default function Home({ navigation }) {
    return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar hidden={true}/>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <ProductoDestacado/>
                </View>
            <Footer  style={styles.footer}/>
            </ScrollView>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#D9D9D9', // Color de fondo de la barra de estado
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D9D9D9', // Color de fondo para la pantalla
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
        padding: 10,
        margin: 10, // Margen para separar los productos
    },    footer: {
        width: '100%', // Asegura que el footer ocupe el 100% del ancho de la pantalla
        backgroundColor: '#fff', // Puedes cambiar este color según el diseño
        borderColor: '#ccc', // Color de la línea superior
    },
});
