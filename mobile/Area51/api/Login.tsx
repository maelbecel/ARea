/* The line `import * as SecureStore from 'expo-secure-store';` is importing the `SecureStore` module
from the `expo-secure-store` package. This module provides a secure storage API that allows you to
securely store sensitive data, such as user authentication tokens or API keys, on the device. It
provides methods for storing, retrieving, and deleting data from the secure storage. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The Login function is an asynchronous function that sends a POST request to a login API endpoint
 * with the provided email and password, and returns the response as JSON.
 * @param {string} email - The `email` parameter is a string that represents the user's email address.
 * It is used to identify the user during the login process.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * It is used to authenticate the user during the login process.
 * @returns The function `Login` returns a Promise that resolves to a JSON object.
 */
const LoginAPI  = async (email: string, password : string) => {
    try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const json = await response.json();
        SecureStore.setItemAsync('token_api', json.data);
        return json;
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

/* The line `export default LoginAPI;` is exporting the `LoginAPI` function as the default export of
the module. This means that when another module imports this module, they can import the `LoginAPI`
function directly without having to specify its name. For example, in another module, you can import
the `LoginAPI` function like this: `import LoginAPI from './LoginAPI';`. */
export default LoginAPI;