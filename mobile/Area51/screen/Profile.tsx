// --- Libraires --- //
import React, { useState, useEffect } from "react";
import { Text, Alert, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosAPI from "../api/UserInfos";
import ProfileForm from "../components/ProfileForm";
import SVGImg from '../assets/svg/iconProfile.svg'
import PatchUser from "../api/PatchUser";
import ServiceLogo from "../components/ServiceLogo";
import Services, {Applet} from "../api/Services";
import OAuthLogin from "../api/OAuth";
import OAuthLogout from "../api/OAuthLogout";
import DeleteUser from "../api/DeleteUser";
import DeleteAccount from "../components/DeleteAccount";

/* The above code is a TypeScript React component called "Profile". It is responsible for rendering a
user profile screen. */
const Profile = ({navigation}) => {

  const [data, setData] = useState<any>([]);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [services, setServices] = useState<string[]>([]);
  const [servicesCon, setServicesCon] = useState<string[]>([]);

  /**
   * The function `orderByFirstConnected` takes two arrays, `connected` and `allserv`, and returns a
   * new array that contains the elements from `connected` followed by the elements from `allserv` that
   * are not already in `connected`.
   * @param {string[]} connected - An array of strings representing the services that are currently
   * connected.
   * @param {string[]} allserv - An array of all available servers.
   * @returns The function `orderByFirstConnected` returns an array of strings.
   */
  const orderByFirstConnected = (connected : string[], allserv : string[]) => {
    let tmp : string[] = [];
    for (let i = 0; i < connected.length; i++) {
      if (allserv.includes(connected[i])) {
        tmp.push(connected[i]);
      }
    }
    for (let i = 0; i < allserv.length; i++) {
      if (!tmp.includes(allserv[i])) {
        tmp.push(allserv[i]);
      }
    }
    return tmp;
  }

  /* The `useEffect` hook in this code is used to fetch user information from an API and update the
  component's state with the retrieved data. */
  useEffect(() => {
    /**
     * The function fetchData is an asynchronous function that retrieves user information from an API
     * using a token and server address stored in AsyncStorage, and updates the state with the
     * retrieved data.
     * @returns In this code, the function `fetchData` is being defined as an asynchronous function. It
     * tries to fetch the server address and token from AsyncStorage using `await
     * AsyncStorage.getItem()`. If either the token or server address is missing, it navigates to the
     * 'Login' screen and returns.
     */
    const fetchData = async () => {
      try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');

        if (!token || !serverAddress) {
          navigation.navigate('Login');
          return;
        }
        const response = await UserInfosAPI(token, serverAddress);
        setData(response.data);
        const serv : Applet[] = await Services();
        let tmp : string[] = [];
        for (let i = 0; i < serv.length; i++) {
          if (serv[i].hasAuthentification)
            tmp.push(serv[i].slug);
        }
        setServicesCon(response.data.connectedServices);
        setServices(orderByFirstConnected(response.data.connectedServices, tmp));
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('email', response.data.email);
        setLoading(false); // Mettez à jour l'état de chargement une fois les données disponibles
        setReload(false);
      } catch (error) {
        console.error(error);
        setLoading(false); // Mettez à jour l'état de chargement en cas d'erreur
      }
    };

    fetchData();
  }, [reload]); // Assurez-vous de passer un tableau vide de dépendances pour exécuter l'effet uniquement après le premier rendu


  /**
   * The function `handleLogout` deletes the 'token_api' item from SecureStore and navigates to the
   * 'Login' screen.
   */
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * The function `handleDelete` deletes a user, removes a token from SecureStore, and navigates to the
   * Login screen in a React Native app.
   */
  const handleDelete = async () => {
    try {
      await DeleteUser();
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };


 /**
  * The function handles a button press event, retrieves user data from AsyncStorage, updates the
  * user's profile using an API call, stores the API token in SecureStore, and displays success or
  * error messages.
  */
  const handlePress = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      const res = await PatchUser(email, null, null, username);
      await SecureStore.setItemAsync('token_api', res.data);
      if (!res) {
        Alert.alert('Error', 'An error occurred while updating your profile.');
      }
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      Alert.alert('Success', 'Your profile has been updated.');
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * The function `displayServices` maps over an array of services and returns a JSX element for each
   * service, either with an `onPress` function that logs out of the service if it is included in
   * `servicesCon`, or with an `onPress` function that logs into the service if it is not included in
   * `servicesCon`.
   * @returns The function `displayServices` returns an array of JSX elements.
   */
  const displayServices = () => {
    if (services == undefined || services == null) return;
    return services.map((service) => ((servicesCon.includes(service)) ?
      <ServiceLogo key={service} slug={service} onPress={ async () =>  {await OAuthLogout(service); setReload(true)}} />
      : <ServiceLogo key={service} slug={service} onPress={async () => {await OAuthLogin(service); setReload(true)}} disabled={true}/>
    ));
  };

  /* The `return` statement in the code is rendering the JSX elements that make up the Profile
  component. */
  return (
    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" /> // Affichez un indicateur de chargement pendant le chargement des données
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        style={{height: Dimensions.get('window').height - 100, width: Dimensions.get('window').width, paddingHorizontal: 30}}
      >
        <View style={styles.profilePicture}>
          <SVGImg width={150} height={150} />
        </View>
          <ProfileForm data={data} />
        <Button
          mode="contained"
          onPress={ handlePress }
          style={[
            styles.button,
            username === data.username && email === data.email && styles.disabledButton,
          ]}
          disabled={username === data.username && email === data.email}
        >
          Apply changes
        </Button>
        <View style={styles.separator} />
        <View style={styles.userInfo}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Connected accounts</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {displayServices()}
          </ScrollView>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
        >
            <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <DeleteAccount />
      </ScrollView>
    )}
    </View>
  );
};

/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from
React Native. Each key in the object represents a style name, and its value is an object that
defines the specific style properties for that name. */
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  profilePicture: {
    marginTop: Dimensions.get('window').height / 20, // Marge en haut de l'avatar pour l'espace entre l'image et le texte
    marginBottom: (Dimensions.get('window').height / 5 - 75) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: '#363841',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  userInfo: {
    marginHorizontal: 10, // Marge à gauche de l'avatar pour l'espace entre l'image et le texte
  },
  title: {
    fontSize: 20, // Taille de la police pour le titre
    fontWeight: 'bold', // Texte en gras pour le titre
    color: '#363841',
  },
  subtitle: {
    fontSize: 16, // Taille de la police pour le nom d'utilisateur
    fontWeight: 'bold', // Texte en gras pour le nom d'utilisateur
    color: '#363841',
  },
  link: {
    color: '#00C2FF',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 0.5, // Hauteur de la ligne
    backgroundColor: '#6D6D6D', // Couleur de la ligne
    marginVertical: 15, // Marge verticale pour l'espace autour de la ligne
    opacity: 0.5, // Opacité de la ligne
  },
  logout: {
    color: '#363841',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Profile;
