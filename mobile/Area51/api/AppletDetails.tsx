import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppletDetails = async (slug: string) => {
    try {
        const token: string = await SecureStore.getItemAsync("token_api");
        const serverAddress: string = await AsyncStorage.getItem('serverAddress');
        const data: any = await (
            await fetch(`${serverAddress}/service/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        ).json();
        return (data?.data?.decoration?.backgroundColor);
    } catch (error) {
        console.log("error applet component", error);
        return null;
    }
};

export default AppletDetails;
