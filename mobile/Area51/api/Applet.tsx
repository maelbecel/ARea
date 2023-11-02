/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the same directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from  './ServiceInfo'
import { Alert } from 'react-native';


/**
 * The above function is a TypeScript React function that creates an applet by making a POST request to
 * a server with the provided parameters.
 * @param {string} name - The name of the applet.
 * @param {string} actionSlug - The `actionSlug` parameter is a string that represents the action being
 * performed in the applet. It is used to identify the specific action to be executed.
 * @param {Input[]} actionInputs - The `actionInputs` parameter is an array of objects that represent
 * the inputs required for the action. Each object in the array has the following properties:
 * @param actionResp - The `actionResp` parameter is an array of any type that represents the response
 * data from the action. It is used to populate the values of the action inputs in the request body.
 * Each element in the `actionResp` array corresponds to an input in the `actionInputs` array.
 * @param {string[]} reactionSlug - The `reactionSlug` parameter is an array of strings that represents
 * the slugs of the reactions for the applet. Each reaction slug identifies a specific action that will
 * be triggered as a reaction to the main action of the applet.
 * @param {Input[][]} reactionInputs - The `reactionInputs` parameter is a 2-dimensional array of type
 * `Input`. Each inner array represents the inputs required for a specific reaction. The outer array
 * represents the reactions themselves. So, for each reaction, you have an array of inputs.
 * @param reactionResp - The parameter `reactionResp` is an array of arrays. Each inner array
 * represents the response values for a specific reaction. The outer array represents the response
 * values for all the reactions.
 * @returns a Promise that resolves to either a boolean value or any other value.
 */
const Applet = async (name : string, actionSlug : string, actionInputs : Input[], actionResp : Array<any>,  reactionSlug : string[], reactionInputs : Input[][], reactionResp : Array<any>): Promise<boolean | any> => {
    try {
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/applet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                notifUser: true,
                name: name.substring(0, 139),
                actionSlug: actionSlug,
                enabled: true,
                actionInputs: actionInputs.map((input : Input, index : number) => {
                    return {name: input.name, label : input.label, type : input.type, value : actionResp[index]}
                }),
                reactions: reactionSlug.map((reaction : string, index : number) => { return {
                    reactionSlug: reaction,
                    reactionInputs: reactionInputs[index].map((input : Input, indexr : number) => {
                        return {name: input.name, label : input.label, type : input.type, value : reactionResp[index][indexr]}
                    })
                }})
            }, null, 4)
        });
        const json : any = await response.json();
        if (json.data == undefined) {
            Alert.alert("Error", json.message)
            return false;
        }
        return json.data;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error(error);
        return false;
    }
}


/* `export default Applet;` is exporting the `Applet` function as the default export of the module.
This means that when another module imports this module, they can import the `Applet` function
directly without having to specify its name. For example, in another module, you can import the
`Applet` function like this: `import Applet from './Applet'`. */
export default Applet;