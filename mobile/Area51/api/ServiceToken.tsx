
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.log(`/service/${slug} :`, response.status);
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

export default ServiceToken;
