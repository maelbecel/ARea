
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from  './ServiceInfo'


const Action = async (slug : string): Promise<Input[]> => {
    try {
        let inputs : Input[] = [];
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/action/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response.status);
        const json = await response.json();
        if (json.data == undefined) return null;
        for (let i = 0; i < json.data.inputs.length; i++)
        {
            let tmp : Input = {name : json.data.inputs[i].name, label : json.data.inputs[i].label, type : json.data.inputs[i].type};
            inputs.push(tmp);
        }
        return inputs;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* The statement `export default Services;` is exporting the `Services` function as the default export
of the module. This means that when another module imports this module, they can import the
`Services` function directly without having to specify its name. For example, in another module, you
can import the `Services` function like this: `import Services from './Services';`. */
export default Action;