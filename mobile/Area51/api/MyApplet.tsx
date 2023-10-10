import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyApplets  = async () => {
    try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');
        const response = await fetch(`${serverAddress}/applet/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await response.json();
        if (json == null) return null;
        return json.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default MyApplets;