import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppletInfos = async () => {
    try {
        const token = await SecureStore.getItemAsync("token_api");
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/applet/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error search applet", error);
        return null;
    }
};

export default AppletInfos;
