import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from '../../firebase/firebase';
import { Alert } from 'react-native';

export const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      id_usuario: user.uid,
      imgPerfil: '',
      nombreUsuario: '',
      apellidoUsuario: '',
      email: user.email,
      telefono: '',
      direccion: {
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        alcaldiaMunicipio: '',
        codigoPostal: 0,
        estado: '',
        pais: '',
        referencia: '',
      },
    };

    await setDoc(doc(db, 'usuario', user.uid), userData);

    Alert.alert('Éxito', 'Cuenta creada con éxito');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};
