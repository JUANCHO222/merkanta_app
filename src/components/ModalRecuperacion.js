import React from 'react';
import { Modal, TextInput, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Button from './Button';
const ResetPasswordModal = ({ modalVisible, closeModal, email, setEmail, handleForgotPassword }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={closeModal}
  >
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Restablecer contraseña</Text>
          </View>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.inputModal}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <Button texto="Enviar" onPress={handleForgotPassword} color="#0abf7e" largo="100%" ancho={50} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
  },
  modalHeader: {
    backgroundColor: '#00A76F',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    padding: 20,
  },
  inputModal: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default ResetPasswordModal;
