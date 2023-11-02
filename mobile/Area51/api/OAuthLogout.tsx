/* The code is importing three modules: `AsyncStorage`, `Alert`, and `SecureStore`. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * The above function is an asynchronous function that logs out a user from a specific service by
 * making a DELETE request to the server with the user's token and service information.
 * @param {string} service - The `service` parameter is a string that represents the name or identifier
 * of the service for which the OAuth logout is being performed.
 * @returns a boolean value. If the fetch request is successful, it will return true. If there is an
 * error, it will return false.
 */
const OAuthLogout = async (service: string) : Promise<boolean> => {
    try {
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress : string  = await AsyncStorage.getItem('serverAddress');
        await fetch(`${serverAddress}/service/${service}/oauth2`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return true;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        return false;
    }
}

export default OAuthLogout;