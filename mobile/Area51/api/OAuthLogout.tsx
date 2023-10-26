import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenApi from '../api/ServiceToken';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';

const OAuthLogout = async (service: string) => {
    try {
        let inputs : any[] = [];
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/service/${service}/oauth2`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default OAuthLogout;