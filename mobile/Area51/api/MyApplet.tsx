import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const MyApplets  = async () : Promise<any> => {
    try {
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const token : string = await SecureStore.getItemAsync('token_api');
        const response : Response = await fetch(`${serverAddress}/applet/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json : any = await response.json();
        if (json == null) return null;
        return json.data;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        return null;
    }
}

export default MyApplets;