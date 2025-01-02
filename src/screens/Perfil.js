import React, { useState, useEffect } from 'react'; 
import { View, Image, TouchableOpacity,StyleSheet, Modal, Text, Alert,TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { BtnPrimary, TxtEntrada } from '../../components/index';
import { auth, onAuthStateChanged,reauthenticateWithCredential, EmailAuthProvider,  updateEmail, sendEmailVerification, doc,  db, updateDoc, getDoc } from '../../firebase/firebase';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // Importa íconos de Expo
import { handleChange, handleSubmit} from './PerfilFunctions';

function Perfil({initialData}) {
  const [userData, setUserData] = useState(null); // Estado para guardar los datos del usuario
  const [loading, setLoading] = useState(true);   // Estado para el indicador de carga
  const [user, setUser] = useState(null);
  const [editEmail, setEditEmail ] = useState('');
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  

const navigation = useNavigation();

useEffect(() => {
  const subscriber = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Actualiza el estado
      if (!authUser) console.log("No hay usuario autenticado");
  });
  return () => subscriber(); // Limpia la suscripción al desmontar el componente
}, []);

useEffect(() => {
  if (user) {
    const fetchData = async () => {
      try {
        const userRef = doc(db, "usuario", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFormData((prevState) => ({
            ...prevState,
            ...userData,
          }));
          setUserData(userData); // Para datos originales
        } else {
          console.log("No se encontró el usuario en la base de datos.");
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
}, [user]);


const [formData, setFormData] = useState({
  nombreUsuario: '',
  apellidoUsuario: '',
  telefono: '',
  direccion: {
    calle: '',
    numeroExterior: '',
    numerioInterior: '',
    colonia: '',
    alcaldiaMunicipio: '',
    codigoPostal: '',
    estado: '',
    pais: '',
  },
  ...initialData, // Si `initialData` está definido, sobrescribirá los valores predeterminados
});


  // * Esrado para el abrir y cerrar el modal
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const textoProps = [
    {
      key:1,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Nombre',
      value: formData.nombreUsuario, // Valor del campo directamente
      onChangeText: (value) => handleChange('nombreUsuario', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:2,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Apellido',
      value: formData.apellidoUsuario, // Valor del campo directamente
      onChangeText: (value) => handleChange('apellidoUsuario', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:3,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Calle',
      value: formData.direccion.calle, // Valor del campo directamente
      onChangeText: (value) => handleChange('calle', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:4,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Numero Exterior',
      value: formData.direccion.numeroExterior, // Valor del campo directamente
      onChangeText: (value) => handleChange('numeroExterior', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:5,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Numero Interior',
      value: formData.direccion.numerioInterior, // Valor del campo directamente
      onChangeText: (value) => handleChange('numerioInterior', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:6,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Codigo Postal',
      value: formData.direccion.codigoPostal, // Valor del campo directamente
      onChangeText: (value) => handleChange('codigoPostal', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:7,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'Estado',
      value: formData.direccion.estado, // Valor del campo directamente
      onChangeText: (value) => handleChange('estado', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
    {
      key:8,
      styleTextInput: styles.input, // Asegúrate de que `styles.input` es el estilo correcto
      placeholder: 'País',
      value: formData.direccion.pais, // Valor del campo directamente
      onChangeText: (value) => handleChange('pais', value, formData, setFormData), // Pasas la referencia con los parámetros correctos
    },
  ];

  const dataProps = [
    {
      label: null, // No necesita etiqueta, es solo el nombre
      value: `${formData.nombreUsuario}`,
      customStyle: [styles.textStyle, styles.nameLabel],
    },
    {
      label: "Dirección:",
      value: `${formData.direccion.calle} ${formData.direccion.numeroExterior}${formData.direccion.numerioInterior},
      ${formData.direccion.colonia}, ${formData.direccion.alcaldiaMunicipio}, ${formData.direccion.estado}, ${formData.direccion.pais}, CP: ${formData.direccion.codigoPostal}`,
      customStyle: styles.textStyle,
    },
    {
      label: "Email:",
      value: user ? user.email : "No disponible",
      customStyle: styles.textStyle,
    },
    {
      label: "Teléfono:",
      value: `${formData.telefono}`,
      customStyle: styles.textStyle,
    },
  ];
  
  return (
    
    <View style={styles.screenContainer}>
      {user ? (
        <>
        {isEditing ? (
          <>
          <ScrollView>
          <View style={styles.editContainer}>
          <View style={styles.profileContainer}>

              {/* ------Sección de los datos del usuario-----  */}

              {textoProps.map((prop) => (
                <View key={prop.key}>
                  <Text style={styles.label}>{prop.placeholder}</Text> {/* Aquí parece correcto */}
                  <TextInput
                    style={prop.styleTextInput}
                    placeholder={prop.placeholder}
                    value={prop.value}
                    onChangeText={prop.onChangeText}
                  />
                </View>
))}


            
              {/* Agrega más campos de entrada según sea necesario */}
                <BtnPrimary texto="Guardar Cambios" onPress={() => handleSubmit(user, formData)} color="#00A76F" largo={240} ancho={40}/>
                <BtnPrimary texto="Cancelar" onPress={() => setEditEmail(false)} color="#00A76F" largo={240} ancho={40}/>
          </View>
          </View>
          </ScrollView>
            </>
          ):
          (
            <>
              <View style={styles.infoContainer}>
              {dataProps.map((item, index) => (
  <View style={item.customStyle} key={index}>
    {item.label && <Text style={styles.infoLabel}>{item.label}</Text>}
    <Text style={styles.infoValue}>{item.value}</Text> {/* Asegúrate de que item.value sea válido */}
  </View>
))}
              </View>
              <View style={{ alignItems: 'center' }}>
                <BtnPrimary color='#00A76F' texto='Editar' ancho={45} largo={180} onPress={() => setIsEditing(true)}/>
              </View>
            </>
          )
        }
        </>
        
      ) : (
        <>
          <View style={{ alignItems: 'center', marginTop: 20, marginHorizontal:20 }}>
            <BtnPrimary
              color='#00A76F'
              texto='Iniciar sesion'
              ancho={45}
              largo={'100%'}
              onPress={() => {
                navigation.navigate('Login')}}
            />
        </View>
        </>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  imageStyle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  nameLabel: {
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    color:'black'
  },
// * ______seccion del formulario______
  input: {
    width:'100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    padding: 12,
  },
  editContainer:{
    padding:20,
  },
  imageWrapperModal: {
    width: 100,
    height: 100,
    borderRadius: 180, // Para que sea circular
    marginTop:10,
  },
  imageWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 180, // Para que sea circular
    marginBottom:20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75, // También aplica al contenedor de la imagen
    backgroundColor:'white'
  },
  imageModal:{
    width: '100%',
    height: '100%',
  },
  uploadButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Centra el botón
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 25,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    transform:[{translateX: 20 }, { translateY: 10 }],
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 90,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold',
    color:'white'
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  // buttonContainer:{
  //   alignItems:'center',
  //   justifyContent:'center'
  // },
  buttons:{
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextClose:{
    color: 'blue',
    fontSize: 16,
  },
  buttomDelete:{
    width: 40,
    height: 40,
    color: 'red',
    fontSize: 16,
    backgroundColor: 'red',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label:{
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  }

});

export default Perfil;


