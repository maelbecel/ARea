// --- Libraires --- //
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosAPI from "../api/UserInfos";
import ProfileForm from "../components/ProfileForm";

// --- Component --- //
import OutlinedTextBox from '../components/OutlinedTextBox';

// --- Images/Icons --- //
import SVGImg from '../assets/svg/iconProfile.svg'

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>([]);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('email', response.data.email);
        setLoading(false); // Mettez à jour l'état de chargement une fois les données disponibles
      } catch (error) {
        console.error(error);
        setLoading(false); // Mettez à jour l'état de chargement en cas d'erreur
      }
    };

    fetchData();
  }, []); // Assurez-vous de passer un tableau vide de dépendances pour exécuter l'effet uniquement après le premier rendu


  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      console.log(username, email);
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" /> // Affichez un indicateur de chargement pendant le chargement des données
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
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
          Appliquer les changements
        </Button>
        <View style={styles.separator} />
        <View style={styles.userInfo}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Comptes associés</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.subtitle}>Google</Text>
            <Text style={styles.link}>Associer un compte Google</Text>
            <Text style={styles.subtitle}>Facebook</Text>
            <Text style={styles.link}>Associer un compte Facebook</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.userInfo}>
          <View style={{marginBottom: 20, opacity: 0.5}}>
            <Text style={styles.subtitle}>Conditions et confidentialité</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
        >
            <Text style={styles.logout}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profilePicture: {
    marginTop: Dimensions.get('window').height / 50, // Marge en haut de l'avatar pour l'espace entre l'image et le texte
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
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Profile;
