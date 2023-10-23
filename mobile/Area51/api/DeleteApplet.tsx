import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DeleteApplet  = async (id: number) => {
    try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');
        const response = await fetch(`${serverAddress}/applet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default DeleteApplet;