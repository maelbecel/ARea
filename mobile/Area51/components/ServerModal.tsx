import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';

/* The code defines a functional component called `ServerModal` using TypeScript and React. */
const ServerModal: React.FC = () => {
    const [serverAddress, setServerAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    /* The `useEffect` hook is used to perform side effects in functional components. In this code, the
    `useEffect` hook is used to check if the server address is already saved in the local storage. */
    useEffect(() => {
      const checkAndShowModal = async () => {
        try {
          const savedAddress = await AsyncStorage.getItem('serverAddress');
          if (!savedAddress) {
            // Si l'adresse du serveur n'est pas enregistrée, ouvrez le modal
            setModalVisible(true);
          } else {
            setServerAddress(savedAddress);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'adresse du serveur :', error);
        }
      };

      checkAndShowModal();
    }, []); // Le tableau vide [] assure que useEffect s'exécute une seule fois après le premier rendu

    /**
     * The function saves the server address in local storage and checks if the server is reachable.
     */
    const saveServerAddress = async () => {
        // Enregistrez l'adresse du serveur dans le stockage local
        // use this regex ^((?!-)[A-Za-z0-9-]{1,63}(?<!-).)+[A-Za-z]{2,6}$
        if (!serverAddress.match(/^(http:\/\/|https:\/\/)?([a-zA-Z0-9][a-zA-Z0-9_-]*(\.[a-zA-Z0-9_-]*)+)(\/.*)?$/)) {
          Alert.alert(
            'Warning',
            'The server is not on a valid domain name. Therefore, the application may not function properly. By clicking OK, you agree to use the application at your own risk.',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return;
                },
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    await fetch(`${serverAddress}/about.json`);

                    await AsyncStorage.setItem('serverAddress', serverAddress);
                    await AsyncStorage.setItem('serverAddressWarning', 'false');
                    setModalVisible(false);
                  } catch (error) {
                    Alert.alert('Error', 'Unable to connect to the server. Please check the server address.');
                  }
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          try {
            await fetch(`${serverAddress}/about.json`);

            await AsyncStorage.setItem('serverAddress', serverAddress);
            await AsyncStorage.setItem('serverAddressWarning', 'true');
            setModalVisible(false);
          } catch (error) {
            Alert.alert('Error', 'Unable to connect to the server. Please check the server address.');
          }
          return;
        }
    };

    /* The `return` statement in the code is returning the JSX (JavaScript XML) code that defines the
    UI of the `ServerModal` component. */
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={modalVisible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.0)'}/> */}
            <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="settings" size={50} color="#363841" />
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
                  <Text style={{ marginBottom: 10 }}>Please enter the server address:</Text>
                  <TextInput
                    style={styles.input}
                    value={serverAddress}
                    onChangeText={(text) => setServerAddress(text)}
                  />
                  <Button title="Save" onPress={saveServerAddress} color="#363841" />
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
    container: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    settingsButton: {
    },
});

export default ServerModal;
