/* The code is importing three modules: `SecureStore` from 'expo-secure-store', `AsyncStorage` from
"@react-native-async-storage/async-storage", and `Alert` from 'react-native'. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

/**
 * The function `AppletMe` makes an API request to retrieve information about the current user's
 * applet, handling any errors that may occur.
 * @returns The function `AppletMe` returns the data received from the server, which is the result of
 * the API call to the `/applet/me` endpoint.
 */
const AppletMe = async () : Promise<any> => {
    try {
        const token : string = await SecureStore.getItemAsync("token_api");
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/applet/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        const data : any = await response.json();
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
};

export default AppletMe;
