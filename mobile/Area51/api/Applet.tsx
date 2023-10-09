
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from  './ServiceInfo'


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

/* The statement `export default Services;` is exporting the `Services` function as the default export
of the module. This means that when another module imports this module, they can import the
`Services` function directly without having to specify its name. For example, in another module, you
can import the `Services` function like this: `import Services from './Services';`. */
export default Applet;