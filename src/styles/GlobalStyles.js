import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        
    },
    scroll:{
        justifyContent: 'space-between',
    },
    content:{
        padding: 20, // Margen para separar los productos
    }
    
    
});

export {GlobalStyles};