/* The code is importing two modules: `SecureStore` from the `expo-secure-store` package and
`AsyncStorage` from the `@react-native-async-storage/async-storage` package. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The function `PatchUser` is an asynchronous function that sends a PATCH request to update user
 * information (email, newPassword, and username) to a server using the provided server address and token.
 * @param {string} email - The email parameter is a string that represents the user's email address.
 * @param {string} newPassword - The `newPassword` parameter is a string that represents the new newPassword for
 * the user.
 * @param {string} currentPassword - The `currentPassword` parameter is a string that represents the new newPassword for
 * the user.
 * @param {string} username - The `username` parameter is a string that represents the new username for
 * the user.
 * @returns the JSON response from the server.
 */
const PatchUser = async (email: string | null, newPassword : string | null, currentPassword : string | null, username : string | null) => {
    try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');
        const data = {}
        if (email != null) {
            data["email"] = email;
        }
        if (newPassword != null) {
            data["newPassword"] = newPassword;
        }
        if (currentPassword != null) {
            data["currentPassword"] = currentPassword;
        }
        if (username != null) {
            data["username"] = username;
        }
        const response = await fetch(`${serverAddress}/user/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
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

/* The line `export default PatchUser;` is exporting the `PatchUser` function as the default export of
this module. This means that when another module imports this module, they can import the
`PatchUser` function directly without having to specify its name. For example, in another module,
you can import the `PatchUser` function like this: `import PatchUser from './PatchUser';`. */
export default PatchUser;