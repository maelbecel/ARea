/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the same directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The function `ActionInfo` is an asynchronous function that retrieves information about an action
 * using a provided slug, including authentication and error handling.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for an
 * action. It is used to fetch information about a specific action from the server.
 * @returns The function `ActionInfo` returns a Promise that resolves to an object of type `any`.
 */
const ActionInfo = async (slug : string): Promise<any> => {
    try {
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/action/info/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json : any = await response.json();
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

/* `export default ActionInfo;` is exporting the `ActionInfo` function as the default export of the
module. This means that when another module imports this module, they can import the `ActionInfo`
function directly without needing to specify its name. For example, in another module, you can
import `ActionInfo` like this: `import ActionInfo from './ActionInfo'`. */
export default ActionInfo;