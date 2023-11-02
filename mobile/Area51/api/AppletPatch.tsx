/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the same directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from  './ServiceInfo'
import { Alert } from 'react-native';

// TODO Documentation github

/**
 * The function `AppletPatch` is an asynchronous function that updates an applet with the provided
 * parameters and returns a boolean indicating success or an error message.
 * @param {string} name - The name of the applet.
 * @param {string} actionSlug - The `actionSlug` parameter is a string that represents the slug (unique
 * identifier) of the action for the applet.
 * @param {Input[]} actionInputs - The `actionInputs` parameter is an array of objects that represent
 * the inputs required for the action. Each object in the array has the following properties:
 * @param actionResp - The `actionResp` parameter is an array of responses from the action. It contains
 * the values that will be used as inputs for the action in the PATCH request.
 * @param {string[]} reactionSlug - The `reactionSlug` parameter is an array of strings that represents
 * the slugs of the reactions for the applet. Each string in the array corresponds to a specific
 * reaction.
 * @param {Input[][]} reactionInputs - The `reactionInputs` parameter is a 2-dimensional array of type
 * `Input`. Each element in the outer array represents a reaction, and each element in the inner array
 * represents an input for that reaction.
 * @param reactionResp - The parameter `reactionResp` is an array of arrays. Each inner array
 * represents the response values for a specific reaction. The outer array represents the responses for
 * all the reactions.
 * @param {number} id - The `id` parameter is the identifier of the applet that you want to update. It
 * is used to specify which applet should be patched with the new data.
 * @returns a Promise that resolves to either a boolean value or any other value.
 */
const AppletPatch = async (name : string, actionSlug : string, actionInputs : Input[], actionResp : Array<any>,  reactionSlug : string[], reactionInputs : Input[][], reactionResp : Array<any>, id : number): Promise<boolean | any> => {
    try {
        const token : string = await SecureStore.getItemAsync('token_api');
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const response : Response = await fetch(`${serverAddress}/applet/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                notifUser: true,
                name: name,
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
            alert("Error " + response.status + " : " + json.detail)
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

/* `export default AppletPatch;` is exporting the `AppletPatch` function as the default export of the
module. This means that when another module imports this module, they can import the `AppletPatch`
function directly without having to specify its name. For example, in another module, you can import
the `AppletPatch` function like this: `import AppletPatch from './AppletPatch';`. */
export default AppletPatch;