import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const AppletDetails = async (slug: string) => {
    try {
        const token: string = await SecureStore.getItemAsync("token_api");
        const serverAddress: string = await AsyncStorage.getItem('serverAddress');
        const response: any =
            await fetch(`${serverAddress}/service/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        const data: any = await response.json();
        return (data);
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error(error);
        return null;
    }
};

export default AppletDetails;
