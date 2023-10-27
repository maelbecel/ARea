import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenApi from '../api/ServiceToken';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const OAuthLogin = async (service: string) => {
    const redirectUri = Linking.createURL("/oauth2/" + service);
    /**
   * The function `_openAuthSessionAsync` is an asynchronous function that retrieves a server address
   * and token from AsyncStorage, and then opens an authentication session using the WebBrowser API.
   */
    const _openAuthSessionAsync = async () => {
        try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await TokenApi(service)
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

