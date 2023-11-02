/* The code is importing three modules: `SecureStore` from 'expo-secure-store', `AsyncStorage` from
"@react-native-async-storage/async-storage", and `Alert` from 'react-native'. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

/**
 * The function `AppletDetails` is an asynchronous function that retrieves details of an applet from a
 * server using a provided slug, and handles any errors that may occur during the process.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a
 * specific applet. It is used to fetch the details of the applet from the server.
 * @returns The function `AppletDetails` returns a Promise that resolves to the data fetched from the
 * server, or null if an error occurs.
 */
const AppletDetails = async (slug: string) : Promise<any> => {
    try {
        const token: string = await SecureStore.getItemAsync("token_api");
        const serverAddress: string = await AsyncStorage.getItem('serverAddress');
        const response: Response =
            await fetch(`${serverAddress}/service/${slug}`, {
                method: 'GET',
                cache: 'force-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        const data: any = await response.json();
        return (data);
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

export default AppletDetails;
