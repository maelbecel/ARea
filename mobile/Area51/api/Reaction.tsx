/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * The function `Reaction` is an asynchronous function that takes in two string parameters (`slug` and
 * `actionSlug`) and returns a promise that resolves to an array of `Input` objects.
 * @param {string} slug - The `slug` parameter is a string that represents the identifier of a specific
 * reaction. It is used to specify which reaction to retrieve inputs for.
 * @param {string} actionSlug - The `actionSlug` parameter is a string that represents the action being
 * performed. It is used in the URL to specify the specific action for the reaction.
 * @returns The function `Reaction` returns a Promise that resolves to an array of `Input` objects.
 */
const Reaction = async (slug : string, actionSlug : string): Promise<any[]> => {
    try {
        let inputs : any[] = [];
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress: string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/reaction/${slug}/${actionSlug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const json : any = await response.json();
        if (json.data == undefined) return null;
        for (let i = 0; i < json.data.inputs.length; i++)
        {
            let tmp : any = {name : json.data.inputs[i].name, label : json.data.inputs[i].label, type : json.data.inputs[i].type, options : json.data.inputs[i].options};
            inputs.push(tmp);
        }
        return inputs;
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

/* The statement `export default Services;` is exporting the `Services` function as the default export
of the module. This means that when another module imports this module, they can import the
`Services` function directly without having to specify its name. For example, in another module, you
can import the `Services` function like this: `import Services from './Services';`. */
export default Reaction;