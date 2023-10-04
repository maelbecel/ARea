// --- Libraires --- //
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosAPI from "../api/UserInfos";

// --- Component --- //
import OutlinedTextBox from '../components/OutlinedTextBox';

// --- Images/Icons --- //
import SVGImg from '../assets/svg/iconProfile.svg'

const secureText = (text: string) => {
  return '•'.repeat(text.length); // Remplace chaque caractère par un astérisque (*)
};

const SecureText = ({ text }) => {
  const secureTextValue = secureText(text);

  return (
    <Text style={styles.secureText}>{secureTextValue}</Text>
  );
};

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const dataFetch = async () => {
      const serverAddress = await AsyncStorage.getItem('serverAddress');
      const token = await SecureStore.getItemAsync('token_api');

      if (!token) {
          navigation.navigate('Login');
      }
      const response = await UserInfosAPI(token, serverAddress);
      console.log(response);
      setUsername(response.data.username);
      setEmail(response.data.email);
    };
    dataFetch();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePress = async () => {
    try {
      console.log(username);
      console.log(password);
      console.log(email);

    } catch (error) {
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      >
        <View style={styles.profilePicture}>
          <SVGImg width={150} height={150} />
        </View>
        <View style={styles.userInfo}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Compte</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.subtitle}>Nom d'utilisateur</Text>
            <OutlinedTextBox
              onChangeText={handleUsernameChange}
              value={username}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.subtitle}>Mot de passe</Text>
            <View style={styles.rectangle}>
              <SecureText text={password} />
            </View>
            <Text style={styles.link}>Modifier le mot de passe</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.subtitle}>Adresse e-mail</Text>
            <OutlinedTextBox
              onChangeText={handleEmailChange}
              value={email}
            />
          </View>
        </View>
        <Button
          mode="contained"
          onPress={ handlePress }
          style={{marginVertical: 20, marginHorizontal: 30, backgroundColor: '#363841'}}
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
        <Button
          mode="text"
          onPress={ handleLogout }
          textColor="red"
        >
          Se déconnecter
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Marge à gauche et à droite de l'écran
  },
  profilePicture: {
    marginTop: Dimensions.get('window').height / 50, // Marge en haut de l'avatar pour l'espace entre l'image et le texte
    marginBottom: (Dimensions.get('window').height / 5 - 75) / 3,
    alignItems: 'center',
    justifyContent: 'center',
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
  rectangle: {
    backgroundColor: '#D9D9D9', // Couleur de la boîte
    borderRadius: 5, // Rayon des coins de la boîte
    paddingVertical: 10, // Rembourrage vertical pour l'espace interne
    paddingHorizontal: 10, // Rembourrage horizontal pour l'espace interne
    marginVertical: 10, // Marge verticale pour l'espace externe
  },
  secureText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363841',
    opacity: 0.5,
  },
  separator: {
    height: 0.5, // Hauteur de la ligne
    backgroundColor: '#6D6D6D', // Couleur de la ligne
    marginVertical: 15, // Marge verticale pour l'espace autour de la ligne
    opacity: 0.5, // Opacité de la ligne
  },
});

export default Profile;
