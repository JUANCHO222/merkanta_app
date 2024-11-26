import { auth, onAuthStateChanged,reauthenticateWithCredential, EmailAuthProvider,  updateEmail, sendEmailVerification, doc,  db, updateDoc, getDoc } from '../../firebase/firebase';

  
  // * Función para manejar el cambio de texto
export const handleChange = (field, value, formData,setFormData) => {
    if (formData.direccion.hasOwnProperty(field)) {
      setFormData((prevState) => ({
        ...prevState,
        direccion: {
          ...prevState.direccion,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };


export const handleSubmit = async (user, formData) => {
    if (user) {
      try {
        const userRef = doc(db, "usuario", user.uid);
        await updateDoc(userRef, formData);
        Alert.alert("Éxito", "Los datos han sido actualizados.");
        setIsEditing(false);
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al guardar los datos.");
        console.error("Error updating document: ", error);
      }
    }
  }