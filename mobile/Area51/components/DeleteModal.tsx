import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DeleteApplet from '../api/DeleteApplet';
import { useNavigation } from '@react-navigation/native';

interface DeleteModalProps {
    id: number;
}

/* The code defines a functional component called `DeleteModal` using TypeScript and React. */
const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation: any = useNavigation();

    const deleteApplet = async () => {
        try {
            setModalVisible(false);
            await DeleteApplet(id);
            navigation.navigate('My Applets');
        } catch (error) {
            console.log(error);
        }
    };

    /* The `return` statement in the code is returning the JSX (JavaScript XML) code that defines the
    UI of the `DeleteModal` component. */
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{...styles.text, fontWeight: 'bold', color: 'red' }}>Delete title</Text>
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
                  <Text style={ styles.title }>Delete applet</Text>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={ styles.text }>Are you sure you want to delete this applet ?</Text>
                        <Text style={ styles.subtitles }>This action cannot be undone.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#363841" />
                        <Button title="Delete" onPress={deleteApplet} color="#363841" />
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
        fontSize: 22,
    },
    subtitles: {
        fontSize: 18,
        color: '#363841',
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default DeleteModal;
