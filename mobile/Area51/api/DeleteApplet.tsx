/* The code is importing three modules: `SecureStore` from 'expo-secure-store', `AsyncStorage` from
'@react-native-async-storage/async-storage', and `Alert` from 'react-native'. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The DeleteApplet function is an asynchronous function that sends a DELETE request to a server to
 * delete an applet, and handles any errors that may occur during the process.
 * @param {number} id - The `id` parameter is the unique identifier of the applet that you want to
 * delete. It is of type `number`.
 * @returns The function `DeleteApplet` returns a Promise that resolves to a response object from the
 * server if the request is successful. If there is an error, it returns `null`.
 */
const DeleteApplet  = async (id: number) : Promise<any> => {
    try {
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const token : string  = await SecureStore.getItemAsync('token_api');
        const response : Response = await fetch(`${serverAddress}/applet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        return response;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error(error);
        return null;
    }
}

export default DeleteApplet;