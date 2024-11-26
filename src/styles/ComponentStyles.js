import { StyleSheet } from "react-native";

const ComponentStyles =  StyleSheet.create({
    // * Boton
    button:{
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 12
    },
    textButton:{
        color: 'white',
        fontSize: 14,
    },
    // * Boton de imagen
    buttonStyle:{
        flex:1,
        height: 125,
        borderRadius: 12,
    },
    imageContainer:{
        width:'100%',
        height: 125,
    },
    imagenStyle:{
        width: '100%',
        height: '100%', 
        borderRadius: 12,
    },
    // * Boton de redes sociales
    buttonsStyle: {
        height:55,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:15,
        backgroundColor:'white',
        borderRadius: 12,
    },
    containerLabel:{
        marginLeft:10,
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
    },
    labelStyle:{
        textAlign: 'center',
    },
    // * Entrada de texto
    input:{
        width: '100%',
        height:45,
        alignItems: 'center',
        borderWidth:1,
        borderColor: 'black',
        borderRadius: 12,
    },
    textInput:{
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    // *
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginTop:30,
        marginBottom:23,
        justifyContent: 'center',
      },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
      },
      separatorText:{
        marginHorizontal:5
      },
    //   
      buttonText:{
        padding:5,
      },
      forgotPasswordText: {
        color: '#00A76F',
        fontSize: 14,
      },

})

export {ComponentStyles};