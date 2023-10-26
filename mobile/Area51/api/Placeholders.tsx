
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Dict = {[key: string]: string}

const createDictionary = (placeholders : any) : Dict => {
    let dict : Dict = {};
    for (let key in placeholders) {
        dict[key] = placeholders[key]
    }
    return dict;
}

const PlaceHolders = async (slug : string, actionSlug : string): Promise<Dict> => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/reaction/${slug}/${actionSlug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await response.json();
        if (json.data == undefined) return null;
        return createDictionary(json.data.placeholders);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default PlaceHolders;