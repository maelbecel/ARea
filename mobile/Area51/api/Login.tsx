/* The line `import * as SecureStore from 'expo-secure-store';` is importing the `SecureStore` module
from the `expo-secure-store` package. This module provides a secure storage API that allows you to
securely store sensitive data, such as user authentication tokens or API keys, on the device. It
provides methods for storing, retrieving, and deleting data from the secure storage. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.log(serverAddress);
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
        console.error(error);
        return null;
    }
}

export default LoginAPI;