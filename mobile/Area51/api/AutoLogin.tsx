/* The line `import * as SecureStore from 'expo-secure-store';` is importing the `SecureStore` module
from the `expo-secure-store` package. This module provides a secure storage API that allows you to
securely store sensitive data, such as user authentication tokens or API keys, on the device. It
provides methods for storing, retrieving, and deleting data from the secure storage. */
import * as SecureStore from 'expo-secure-store';


/**
 * The function `AutoLoginAPI` is an asynchronous function that attempts to verify a user's token by
 * making a POST request to a specified API endpoint and returns a boolean value indicating whether the
 * verification was successful or not.
 * @returns The function `AutoLoginAPI` returns a Promise that resolves to a boolean value. The boolean
 * value indicates whether the API call was successful (true) or not (false).
 */
const AutoLoginAPI  = async (): Promise<boolean> => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const response = await fetch(`http://zertus.fr:8001/user/verify?token=` + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.status);
        if (response.status == 204) {
            return true;
        } else
            console.log('Verify return ' + response.status)
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default AutoLoginAPI;