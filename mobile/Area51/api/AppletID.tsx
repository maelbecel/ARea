/* The code is importing three modules: `SecureStore` from 'expo-secure-store', `AsyncStorage` from
'@react-native-async-storage/async-storage', and `Alert` from 'react-native'. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The above function is an asynchronous function that retrieves data from a server using a provided
 * ID, token, and server address, and handles any errors that may occur during the process.
 * @param {string} id - The `id` parameter is a string that represents the ID of an applet. It is used
 * to fetch the applet data from the server.
 * @returns The function `AppletID` returns a Promise that resolves to the data fetched from the server
 * if successful, or `null` if there is an error.
 */
const AppletID  = async (id : string) : Promise<any> => {
    try {
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const token : string = await SecureStore.getItemAsync('token_api');
        const response : Response = await fetch(`${serverAddress}/applet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json : any = await response.json();
        if (json == null) return null;
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

export default AppletID;