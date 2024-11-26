import { Alert } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase/firebase';

export const handleLogin = async (auth, email, password, navigation, setIsLoading) => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Por favor, completa todos los campos.');
    return;
  }

  setIsLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Alert.alert('Inicio de Sesión', 'Bienvenido');
    navigation.navigate('Inicio');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Credenciales incorrectas o problema al iniciar sesión.');
  } finally {
    setIsLoading(false);
  }
};

export const handleForgotPassword = async (auth, email, closeModal, setIsLoading) => {
  if (email === '') {
    Alert.alert('Error', 'Por favor ingresa tu correo electrónico.');
    return;
  }

  setIsLoading(true);
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert('Éxito', 'Te hemos enviado un correo electrónico para restablecer tu contraseña.');
    closeModal();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Hubo un problema al enviar el correo electrónico.');
  } finally {
    setIsLoading(false);
  }
};
