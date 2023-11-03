import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';
import PatchUser from '../api/PatchUser';

const PasswordModal: React.FC = () => {
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /**
     * The function saves the server address in local storage and checks if the server is reachable.
     */
    const savePassword = async () => {
        // Enregistrez l'adresse du serveur dans le stockage local
        try {
          if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }
          const res = await PatchUser(null, password, currentPassword, null);
          if (res.status === 400) {
            alert('Wrong current password');
            return;
          }
          setModalVisible(false);
          setPassword('');
          setCurrentPassword('');
        } catch (error) {
          alert('Error while saving password');
        }
    };

    const reset = () => {
      setModalVisible(false);
      setPassword('');
      setCurrentPassword('');
      setConfirmPassword('');
    };

    /* The `return` statement in the code is returning the JSX (JavaScript XML) code that defines the
    UI of the `ServerModal` component. */
    return (
        <View>
            {/* <StatusBar backgroundColor={modalVisible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.0)'}/> */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.link}>Change password</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={ styles.title }>Change password</Text>
                  <Text style={ styles.text }>Please, enter your current password</Text>
                  <TextInput
                    style={styles.input}
                    value={currentPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                  />
                  <Text style={ styles.text }>Please, enter your new password</Text>
                  <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Text style={ styles.text }>Please, confirm your new password</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                    <Button title="Cancel" onPress={() => reset()} color="#363841" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                    <Button title="Save" onPress={savePassword} color="#363841" />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
        </View>
    );
}

/* The `const styles = StyleSheet.create({})` block is defining a JavaScript object that contains
styles for different elements in the component. The `StyleSheet.create()` function is used to create
a stylesheet object that optimizes the styles for performance. */
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        paddingHorizontal: 40,
        paddingVertical: 20,
        height: 'auto',
        borderRadius: 10,
        elevation: 5,
    },
    link: {
      color: '#00C2FF',
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      color: '#363841',
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    text: {
      color: '#363841',
      fontSize: 14,
      marginBottom: 5,
      fontWeight: 'bold',
    },
});

export default PasswordModal;
