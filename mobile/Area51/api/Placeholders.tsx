/* These lines of code are importing modules from external libraries. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The above type is a TypeScript type definition for a dictionary object where the keys are strings
 * and the values are also strings.
 * @property {string} [key: string] - This is a type declaration for a dictionary object in TypeScript.
 * It specifies that the keys of the dictionary are strings, and the values are also strings.
 */
export type Dict = {[key: string]: string}

/**
 * The function `createDictionary` takes in an object of placeholders and returns a dictionary with the
 * same key-value pairs.
 * @param {any} placeholders - The `placeholders` parameter is an object that contains key-value pairs.
 * Each key represents a placeholder name, and each value represents the value that will replace the
 * placeholder.
 * @returns The function `createDictionary` returns a dictionary object.
 */
const createDictionary = (placeholders : any) : Dict => {
    let dict : Dict = {};
    for (let key in placeholders) {
        dict[key] = placeholders[key]
    }
    return dict;
}

/**
 * The function `PlaceHolders` is an asynchronous function that retrieves placeholders from a server
 * based on a given slug and actionSlug, using a token for authorization.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a
 * specific reaction. It is used to identify the reaction in the API endpoint URL.
 * @param {string} actionSlug - The `actionSlug` parameter is a string that represents the action being
 * performed. It is used in the URL to specify the specific action for which placeholders are being
 * retrieved.
 * @returns The function `PlaceHolders` returns a Promise that resolves to a `Dict` object.
 */
const PlaceHolders = async (slug : string, actionSlug : string): Promise<Dict> => {
    try {
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/reaction/${slug}/${actionSlug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const json : any = await response.json();
        if (json.data == undefined) return null;
        return createDictionary(json.data.placeholders);
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

export default PlaceHolders;