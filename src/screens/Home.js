import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Hola Mundo</Text>
            <Button
        title="Ir a producto..."
        onPress={() => navigation.navigate('Producto')}
      />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderBlockColor: 'red',
    }
});
