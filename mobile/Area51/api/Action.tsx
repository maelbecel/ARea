/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the current directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * The function `Action` is an asynchronous function that takes a `slug` parameter and returns a
 * promise that resolves to an array of `Input` objects.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for the
 * action. It is used to construct the URL for the API request.
 * @returns The function `Action` returns a Promise that resolves to an array of `Input` objects.
 */
const Action = async (slug : string): Promise<any[]> => {
    try {
        let inputs : any[] = [];
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/action/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log("slug : ", response.status);
        const json = await response.json();
        console.log("slug : ", json.data.inputs);
        if (json.data == undefined) return null;
        for (let i = 0; i < json.data.inputs.length; i++)
        {
            let tmp  = {name : json.data.inputs[i].name, label : json.data.inputs[i].label, type : json.data.inputs[i].type, options : json.data.inputs[i].options};
            inputs.push(tmp);
        }
        return inputs;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* `export default Action;` is exporting the `Action` function as the default export of the module.
This means that when another module imports this module, they can import the `Action` function
directly without having to specify its name. For example, in another module, you can import the
`Action` function like this: `import Action from './path/to/module';`. */
export default Action;