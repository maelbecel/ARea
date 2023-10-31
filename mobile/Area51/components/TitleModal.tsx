import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';
import { getWriteColor } from './ActionCard';
import { UpdateAppletTitleWithID } from '../api/UpdateApplet';

interface TitleModalProps {
    color: string;
    title: string;
}

/* The code defines a functional component called `TitleModal` using TypeScript and React. */
const TitleModal: React.FC<TitleModalProps> = ({ color, title }) => {
    const [titleInput, setTitleInput] = useState<string>(title);
    const [appletID, setId] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    /* The `useEffect` hook is used to perform side effects in functional components. In this code, the
    `useEffect` hook is used to check if the server address is already saved in the local storage. */
    useEffect(() => {
      const getData = async () => {
        setTitleInput(title);
        const id = await AsyncStorage.getItem('appletID');
        console.log("id : ", id);
        setId(id);
      };
      getData();
    }, []); // Le tableau vide [] assure que useEffect s'exécute une seule fois après le premier rendu

    const updateTitle = async () => {
        try {
            setModalVisible(false);
            console.log(titleInput);
            await UpdateAppletTitleWithID(appletID, titleInput);
        } catch (error) {
            console.log(error);
        }
    };

    /* The `return` statement in the code is returning the JSX (JavaScript XML) code that defines the
    UI of the `TitleModal` component. */
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{...styles.text, fontWeight: 'bold', color: getWriteColor(color) }}>Edit title</Text>
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
                  <Text style={ styles.title }>Edit title</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTitleInput(text)}
                    value={titleInput}
                  />
                  <Button title="Enregistrer" onPress={updateTitle} color="#363841" />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
        width: '80%',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    text: {
        fontSize: 16,
    },
});

export default TitleModal;
