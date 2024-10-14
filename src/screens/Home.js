import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { BtnPrimary, TxtEntrada, Footer } from '../components';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {/* Botón principal descomentado si es necesario */}
                    {/* <BtnPrimary color='green' onPress={() => Alert.alert("Botón presionado")} /> */}
                </View>
            <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F0F0', // Color de fondo para la pantalla
        borderWidth: 2, // Mantén esto solo si es parte del diseño
    },
    scrollContent: {
        flexGrow: 1, // Permite que el ScrollView use el espacio disponible
        justifyContent: 'space-between', // Centra el contenido verticalmente si hay espacio suficiente
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2, // Mantén esto solo si es parte del diseño
        padding: 10,
        margin: 10,
    },
});
