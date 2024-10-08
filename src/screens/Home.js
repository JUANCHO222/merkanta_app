import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BtnPrimary, TxtEntrada, Footer } from '../components';


export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TxtEntrada 
                placeholder='Ingrese un numero'
                keyboardType='none'
                maxLength={13}/>
                <TxtEntrada 
                placeholder='Ingrese un numero'
                keyboardType='none'
                maxLength={13}/>
                <BtnPrimary texto='cloor' color='green'/>
            </View>
            <Footer/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Asegura que el footer esté en la parte inferior
        padding: 10,
        margin: 10,
    },
    content: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
    },
});
