import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#D9D9D9',
        flexDirection: 'column',
    },
    scroll:{
        justifyContent: 'space-between',
    },
    content:{
        marginHorizontal: 20, // Margen para separar los productos
        marginTop: 20,
    }
    
    
});

export {GlobalStyles};