import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



export const HelloWorldScreen = ({nombre}) => {
    return (
        <View >
            <Text style={styles.container}>{nombre}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderBlockColor: 'red',
    }
});
