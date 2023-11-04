/* These import statements are importing various modules and libraries that are needed for the
functionality of the `OAuthLogin` function. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenApi from '../api/ServiceToken';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

/**
 * The function `OAuthLogin` is an asynchronous function that opens an authentication session using the
 * WebBrowser API for a specified service.
 * @param {string} service - The `service` parameter is a string that represents the name or identifier
 * of the OAuth service you want to authenticate with. It could be something like "Google", "Facebook",
 * "Twitter", etc.
 * @returns a boolean value of `true`.
 */
const OAuthLogin = async (service: string) => {
    const redirectUri : string = Linking.createURL("/oauth2/" + service);
    /**
   * The function `_openAuthSessionAsync` is an asynchronous function that retrieves a server address
   * and token from AsyncStorage, and then opens an authentication session using the WebBrowser API.
   */
    const _openAuthSessionAsync = async () : Promise<void> => {
        try {
            const serverAddress : string = await AsyncStorage.getItem('serverAddress');
            const token : string = await TokenApi(service)
            await WebBrowser.openAuthSessionAsync(
                `${serverAddress}/service/${service}/oauth2?authToken=${token}&redirecturi=${redirectUri}`
            );
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };
    _openAuthSessionAsync();
    return true;
}

export default OAuthLogin;

