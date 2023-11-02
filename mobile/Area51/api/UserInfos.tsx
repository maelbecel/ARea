import { Alert } from 'react-native';


/**
 * The function `UserInfosAPI` is an asynchronous function that makes a GET request to a server
 * endpoint `/user/me` with a token and server address, and returns the response data or displays an
 * error message if there is an error.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * required to access the user's information on the server. This token is usually obtained after the
 * user has successfully logged in and authenticated with the server. It is used to authorize the
 * user's request to retrieve their information.
 * @param {string} serverAddress - The `serverAddress` parameter is a string that represents the
 * address of the server where the API request will be made. It should be in the format of a URL, such
 * as "https://example.com/api".
 * @returns The function `UserInfosAPI` returns the data fetched from the server if the request is
 * successful. If there is an error, it returns `null`.
 */
const UserInfosAPI  = async (token: string, serverAddress : string) : Promise<any> => {
    try {
        const data : any = await (
            await fetch(`${serverAddress}/user/me`, {
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
}

/* `export default UserInfosAPI;` is exporting the `UserInfosAPI` function as the default export of the
module. This means that when another module imports this module, they can import the `UserInfosAPI`
function directly without having to specify its name. For example, in another module, you can import
the `UserInfosAPI` function like this: */
export default UserInfosAPI;