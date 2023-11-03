import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';


const LoginService  = async (slug : string) : Promise<any> => {
    try {
        const redirectUri : string = Linking.createURL("/oauth2/" + slug);
        const serverAddress : string = await AsyncStorage.getItem('serverAddress');
        const result : any = await WebBrowser.openAuthSessionAsync(
                    `${serverAddress}/user/login/${slug}?redirecturi=${redirectUri}`
                );
        if (result.type == "success") {
            await SecureStore.setItemAsync('token_api', result.url.split("token=")[1]);
            return true;
        }
        Alert.alert('Error', 'Failed to use your ' + slug + ' account');
        return false;
    } catch (error) {
        if (error == 'TypeError: Network request failed') {
            Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error(error);
        return false;
    }
}

/* The statement `export default DeleteUser;` is exporting the `DeleteUser` function as the default
export of the module. This means that when another module imports this module, they can import the
`DeleteUser` function directly without having to specify its name. For example, in another module,
you can import the `DeleteUser` function like this: `import DeleteUser from './DeleteUser';`. */
export default LoginService;