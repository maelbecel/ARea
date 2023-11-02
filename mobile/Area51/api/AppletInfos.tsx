import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const AppletInfos = async (id: number) => {
    try {
        const token = await SecureStore.getItemAsync("token_api");
        if (id === undefined) {
            console.log("something went wrong");
            return;
        }
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const data = await (
            await fetch(`${serverAddress}/applet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        ).json();
        return data;
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

export default AppletInfos;