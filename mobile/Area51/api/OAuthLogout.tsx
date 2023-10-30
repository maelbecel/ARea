import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const OAuthLogout = async (service: string) => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        await fetch(`${serverAddress}/service/${service}/oauth2`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return true;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        return false;
    }
}

export default OAuthLogout;