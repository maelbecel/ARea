import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DeleteApplet from '../api/DeleteApplet';
import { useNavigation } from '@react-navigation/native';
import DeleteUser from '../api/DeleteUser';
import * as SecureStore from 'expo-secure-store';

/* The code defines a functional component called `DeleteAccount` using TypeScript and React. */
const DeleteAccount: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation: any = useNavigation();

    const handleDelete = async () => {
        try {
          await DeleteUser();
          await SecureStore.deleteItemAsync('token_api');
          navigation.navigate('Login');
        } catch (error) {
          console.error(error);
        }
    };

    /* The `return` statement in the code is returning the JSX (JavaScript XML) code that defines the
    UI of the `DeleteAccount` component. */
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.text}>Delete Account</Text>
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
                  <Text style={ styles.title }>Delete account</Text>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={ styles.text }>Are you sure you want to delete your account ?</Text>
                        <Text style={ styles.subtitles }>This action cannot be undone.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#363841" />
                        <Button title="Delete" onPress={handleDelete} color="red" />
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
    text: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitles: {
        fontSize: 18,
        color: '#363841',
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default DeleteAccount;
