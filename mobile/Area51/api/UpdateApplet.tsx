/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the same directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * Update an applet with a specific ID by sending a PATCH request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id    - The ID of the applet to delete.
 * @param {string} title - The new title of the applet.
 *
 * @returns {Promise<void>} A promise that sends a PATCH request to patch an applet.
 * Logs success or error messages. Does not return data.
 */
const UpdateAppletTitleWithID = async (id: string, title: string ): Promise<void> => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/applet/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                name   : title,
            })
        });

        const json = await response.json();
        if (json.data == undefined) return null;
        return json.data;
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

/**
 * Update an applet with a specific ID by sending a PATCH request to the server.
 *
 * @param {string} id    - The ID of the applet to delete.
 * @param {string} enable - The new state of the applet.
 *
 * @returns {Promise<void>} A promise that sends a PATCH request to patch an applet.
 * Logs success or error messages. Does not return data.
 */
const UpdateAppletEnableWithID = async (id: string, enable: string ): Promise<void> => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/applet/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                enable   : enable,
            })
        });

        const json = await response.json();
        if (json.data == undefined) return null;
        return json.data;
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

export { UpdateAppletTitleWithID, UpdateAppletEnableWithID };