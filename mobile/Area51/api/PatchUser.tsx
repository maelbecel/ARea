/* The code is importing two modules: `SecureStore` from the `expo-secure-store` package and
`AsyncStorage` from the `@react-native-async-storage/async-storage` package. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The function `PatchUser` is an asynchronous function that sends a PATCH request to update user
 * information (email, password, and username) to a server using the provided server address and token.
 * @param {string} email - The email parameter is a string that represents the user's email address.
 * @param {string} password - The `password` parameter is a string that represents the new password for
 * the user.
 * @param {string} username - The `username` parameter is a string that represents the new username for
 * the user.
 * @returns the JSON response from the server.
 */
const PatchUser = async (email: string, password : string, username : string) => {
    try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');
        const data = {}
        if (email != null) {
            data["email"] = email;
        }
        if (password != null) {
            data["password"] = password;
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
        console.log("Patch ", data)
        const json = await response.json();
        console.log("Patch ", response.status , " say : " + json.data)
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* The line `export default PatchUser;` is exporting the `PatchUser` function as the default export of
this module. This means that when another module imports this module, they can import the
`PatchUser` function directly without having to specify its name. For example, in another module,
you can import the `PatchUser` function like this: `import PatchUser from './PatchUser';`. */
export default PatchUser;