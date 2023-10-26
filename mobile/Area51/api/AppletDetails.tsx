import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        console.error("error applet component", error);
        return null;
    }
};

export default AppletDetails;
