import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchApplet from '../components/Applets/SearchApplet';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const ExploreMyApplets = () => {
  const [token, setToken] = useState('');
  const [connected, setConnected] = useState(false);
  const navigation = useNavigation();
  useFocusEffect(() => {
    const fetchData = async () => {
        const storedToken = await SecureStore.getItemAsync('token_api');
        setToken(storedToken || '');
        if (!storedToken) {
        // Rediriger vers la page de connexion
        // Utilisez la logique de navigation de votre choix ici
            navigation.navigate('Login');
        }
    };

    fetchData();
    }); // Assurez-vous de passer un tableau vide de dépendances pour exécuter l'effet uniquement après le premier rendu

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Explore your applets</Text>
        <SearchApplet />
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
