// Importaciones del componente
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const EntradaTexto = ({placeholder, keyboardType,maxLength}) => {
  return (
    <TextInput 
      style={[styles.InputContainer, styles.TextInput]}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
      blurOnSubmit={false} // TODO: Ocultar el teclado despues de presionar el boton
      allowFontScaling={true} // TODO: Eñ texto cambia de tamaño depende la resolucion
      returnKeyType='done'
    />
  )
}


const styles = StyleSheet.create({
  // Estilos del componente (contenedor)
    InputContainer: {
        width: 312,
        height: 46,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        alignItems: 'center',
        margin: 24,
        marginBottom: -10,
    },
    // Estilos del texto
    TextInput: {
        color: 'black',
        fontSize: 16,
        textAlign:'center',
        
  }
})


export default EntradaTexto;