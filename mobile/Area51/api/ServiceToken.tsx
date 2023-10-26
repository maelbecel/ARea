
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The function `ServiceToken` is an asynchronous function that retrieves a service token from an API
 * endpoint using a provided slug.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a
 * service. It is used to construct the API endpoint URL for retrieving an OAuth2 token for that
 * service.
 * @returns The function `ServiceToken` returns a Promise that resolves to a string.
 */
const ServiceToken = async (slug : string): Promise<string> => {
    if (slug === "") {
        return null;
    }
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/service/${slug}/oauth2/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.status != 200) {
            return null;
        }
        const json = await response.json();
        if (json.data == undefined) return null;
        else return json.data;
    } catch (error) {
        console.error("An error occur : ", error);
        return null;
    }
}

/* The statement `export default ServiceToken;` is exporting the `ServiceToken` function as the default
export of the module. This means that when another module imports this module using the `import`
statement, they can choose to import the default export without specifying a name. For example,
another module can import the `ServiceToken` function like this: `import ServiceToken from
'./ServiceToken';`. */
export default ServiceToken;
