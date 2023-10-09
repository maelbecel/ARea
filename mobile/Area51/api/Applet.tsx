/* The code is importing three modules: `SecureStore` from the `expo-secure-store` library,
`AsyncStorage` from the `@react-native-async-storage/async-storage` library, and `Input` from the
`ServiceInfo` file in the same directory. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from  './ServiceInfo'


/**
 * The function `Applet` is an asynchronous function that takes in various parameters related to an
 * applet, logs them to the console, and makes a POST request to a server with the provided data.
 * @param {string} name - The name of the applet. It is a string value.
 * @param {string} actionSlug - The `actionSlug` parameter is a string that represents the slug or
 * identifier for the action that will be performed in the applet. It is used to identify the specific
 * action that the user wants to perform.
 * @param {Input[]} actionInputs - An array of objects representing the inputs required for the action.
 * Each object should have the following properties:
 * @param actionResp - The `actionResp` parameter is an array of any type that represents the response
 * from the action. It is used to populate the values of the action inputs in the request payload. Each
 * element in the `actionResp` array corresponds to an input in the `actionInputs` array.
 * @param {string} reactionSlug - The `reactionSlug` parameter is a string that represents the type of
 * reaction that will be triggered when the applet is executed. It is used to identify the specific
 * reaction that should be performed.
 * @param {Input[]} reactionInputs - The `reactionInputs` parameter is an array of objects that
 * represent the inputs required for the reaction. Each object in the array has the following
 * properties:
 * @param reactionResp - The `reactionResp` parameter is an array of any type that represents the
 * response data from the reaction. It is used to populate the values of the reaction inputs when
 * creating an applet.
 * @returns a Promise<boolean>.
 */
const Applet = async (name : string, actionSlug : string, actionInputs : Input[], actionResp : Array<any>,  reactionSlug : string, reactionInputs : Input[], reactionResp : Array<any>): Promise<boolean> => {
    try {
        let inputs : Input[] = [];
        console.log("============= New Applet ====================")
        console.log("Name: " + name)
        console.log("Action: " + actionSlug)
        console.log("Action Inputs: ", actionInputs)
        console.log("Action Response: ", actionResp)
        console.log("Reaction: " + reactionSlug)
        console.log("Reaction Inputs: ", reactionInputs)
        console.log("Reaction Response: ", reactionResp)
        console.log("=============================================")
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/applet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                notifUser: true,
                name: name,
                actionSlug: actionSlug,
                reactionSlug: reactionSlug,
                actionInputs: actionInputs.map((input, index) => {
                    return {name: input.name, label : input.label, type : input.type, value : actionResp[index], valid : true}
                }),
                reactionInputs: reactionInputs.map((input, index) => {
                    return {name: input.name, label : input.label, type : input.type, value : reactionResp[index], valid : true}
                })
            })
        });
        console.log(response.status);
        const json = await response.json();
        console.log("Applet say : ", json)
        if (json.data == undefined) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


/* `export default Applet;` is exporting the `Applet` function as the default export of the module.
This means that when another module imports this module, they can import the `Applet` function
directly without having to specify its name. For example, in another module, you can import the
`Applet` function like this: `import Applet from './Applet'`. */
export default Applet;