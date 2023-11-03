import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The function `DeleteUser` is an asynchronous function that sends a DELETE request to the server to
 * delete the current user, using the provided token for authorization, and returns the response data.
 * 
 * @param token The `token` parameter is a string that represents the authentication token for the
 * user. This token is used to authorize the user's request to delete their account.
 * @param serverAddress The `serverAddress` parameter is a string that represents the address of the
 * server where the API is hosted. It should be in the format of a URL, such as
 * "https://example.com/api".
 * 
 * @return The function `DeleteUser` returns a Promise that resolves to `any`.
 */
const DeleteUser  = async () : Promise<any> => {
    try {
        console.log("Cheeef")
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const token : string  = await SecureStore.getItemAsync('token_api');
        const data : any = await fetch(`${serverAddress}/user/me`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        console.log("Data : ", data.status, data.message);
        return data;
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

/* The statement `export default DeleteUser;` is exporting the `DeleteUser` function as the default
export of the module. This means that when another module imports this module, they can import the
`DeleteUser` function directly without having to specify its name. For example, in another module,
you can import the `DeleteUser` function like this: `import DeleteUser from './DeleteUser';`. */
export default DeleteUser;