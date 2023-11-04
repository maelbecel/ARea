/* The code is importing three modules: `Alert` from the `react-native` library, `AsyncStorage` from
the `@react-native-async-storage/async-storage` library, and `SecureStore` from the
`expo-secure-store` library. */
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

/**
 * The function `AppletInfos` is an asynchronous function that retrieves information about an applet
 * from a server using a provided ID and authentication token.
 * @param {number} id - The `id` parameter is a number that represents the identifier of an applet. It
 * is used to fetch information about a specific applet from the server.
 * @returns The function `AppletInfos` returns a Promise that resolves to `any` type.
 */
const AppletInfos = async (id: number) : Promise<any> => {
    try {
        const token : string = await SecureStore.getItemAsync("token_api");
        if (id === undefined) {
            console.error("something went wrong");
            return;
        }
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const data : any = await (
            await fetch(`${serverAddress}/applet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        ).json();
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

export default AppletInfos;