import { StatusBar } from 'expo-status-bar';
import { Text,View } from 'react-native';

export default function Products({ navigation }) {
  return (
    <View>
        <StatusBar style="auto" hidden={true}/>
        <Text>Products</Text>
    </View>
  );
}
