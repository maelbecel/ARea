import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchApplet from '../components/Applets/SearchApplet';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const ExploreMyApplets = () => {
  const [token, setToken] = useState('');
  const [connected, setConnected] = useState(false);
    const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
        const storedToken = await SecureStore.getItemAsync('token_api');
        console.log('token -> ', storedToken);
        setToken(storedToken || '');
        if (storedToken) {
            console.log('token -> ', storedToken);
        } else {
        // Rediriger vers la page de connexion
        // Utilisez la logique de navigation de votre choix ici
            navigation.navigate('Login');
        }
    };

    fetchData();
    }, []); // Assurez-vous de passer un tableau vide de dépendances pour exécuter l'effet uniquement après le premier rendu

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Explore your applets</Text>
        <SearchApplet />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Couleur de fond de l'écran
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#363841',
    marginBottom: 20,
  },
});

export default ExploreMyApplets;
