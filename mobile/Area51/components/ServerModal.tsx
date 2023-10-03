import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';

const ServerModal: React.FC = () => {
    const [serverAddress, setServerAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      const checkAndShowModal = async () => {
        try {
          const savedAddress = await AsyncStorage.getItem('serverAddress');
          if (!savedAddress) {
            // Si l'adresse du serveur n'est pas enregistrée, ouvrez le modal
            setModalVisible(true);
          } else {
            setServerAddress(savedAddress);
            console.log('Adresse du serveur récupérée :', savedAddress);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'adresse du serveur :', error);
        }
      };

      checkAndShowModal();
    }, []); // Le tableau vide [] assure que useEffect s'exécute une seule fois après le premier rendu

    const saveServerAddress = async () => {
        // Enregistrez l'adresse du serveur dans le stockage local
        try {
          await fetch(`${serverAddress}/about.json`);

          await AsyncStorage.setItem('serverAddress', serverAddress);
          setModalVisible(false);
          console.log('Adresse du serveur enregistrée :', serverAddress);
        } catch (error) {
          alert('Impossible de se connecter au serveur. Veuillez vérifier l\'adresse du serveur.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={modalVisible ? 'rgba(0, 0, 0, 0.5)' : '#fff'}
            />
            <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="settings" size={40} color="#363841" />
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
                  <Text>Veuillez entrer l'adresse du serveur :</Text>
                  <TextInput
                    style={styles.input}
                    value={serverAddress}
                    onChangeText={(text) => setServerAddress(text)}
                  />
                  <Button title="Enregistrer" onPress={saveServerAddress} color="#363841" />
                </View>
              </View>
            </Modal>
        </View>
    );
}

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
