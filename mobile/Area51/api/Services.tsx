
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The above type represents an applet with properties such as slug, name, and decoration.
 * @property {string} slug - A unique identifier for the applet. It is typically a string that is used
 * to identify and reference the applet in code or database queries.
 * @property {string} name - The name property is a string that represents the name of the applet.
 * @property decoration - The `decoration` property is an object that contains two properties:
 */
type Applet = {
    slug: string;
    name: string;
    action : boolean;
    reaction: boolean;
    decoration: {
        backgroundColor: string;
        logoUrl: string;
    }
}


/**
 * The function `Services` is an asynchronous function that retrieves a list of applets from a server
 * and returns them as an array of `Applet` objects.
 * @returns The function `Services` returns a Promise that resolves to an array of `Applet` objects.
 */
const Services = async (): Promise<Applet[]> => {
    try {
        let applets: Applet[] = [];
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/service`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response.status);
        const json = await response.json();
        if (json.data == undefined) return null;
        for (let i = 0; i < json.data.length; i++) {
            let action : boolean = (json.data[i].actions.length > 0);
            let reaction : boolean = (json.data[i].reactions.length > 0);
            let tmp : Applet = {slug : json.data[i].slug, name : json.data[i].name, action : action, reaction : reaction, decoration : {backgroundColor : json.data[i].decoration.backgroundColor, logoUrl : json.data[i].decoration.logoUrl}};
            applets.push(tmp);
        }
        return applets;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* The statement `export default Services;` is exporting the `Services` function as the default export
of the module. This means that when another module imports this module, they can import the
`Services` function directly without having to specify its name. For example, in another module, you
can import the `Services` function like this: `import Services from './Services';`. */
export default Services;