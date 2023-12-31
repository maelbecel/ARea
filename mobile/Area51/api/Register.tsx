/* The line `import * as SecureStore from 'expo-secure-store';` is importing the `SecureStore` module
from the `expo-secure-store` package. This module provides a secure storage API that allows you to
securely store sensitive data, such as user authentication tokens or API keys, on the device. It
provides methods for storing, retrieving, and deleting data from the secure storage. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The Register function is an asynchronous function that sends a POST request to the specified API
 * endpoint with the provided email, password, and username, and returns the response as JSON.
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user who wants to register.
 * @param {string} password - The password parameter is a string that represents the user's password.
 * @param {string} username - The `username` parameter is a string that represents the username of the
 * user who wants to register.
 * @returns a JSON object.
 */
const RegisterAPI = async (email: string, password : string, username : string) : Promise<any> => {
    try {
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, username}),
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

/* The line `export default RegisterAPI;` is exporting the `RegisterAPI` function as the default export
of this module. This means that when another module imports this module, they can import the
`RegisterAPI` function directly without having to specify its name. For example, in another module,
you can import the `RegisterAPI` function like this: */
export default RegisterAPI;