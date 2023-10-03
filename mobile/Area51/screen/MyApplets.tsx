import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';

const MyApplets: React.FC = () => {
  const [applets, setApplets] = useState([]);

  // Simulez l'appel à votre API ici (par exemple, avec useEffect)
  useEffect(() => {
    // Remplacez cet exemple avec l'appel réel à votre API
    const fetchData = async () => {
      try {
        // const response = await fetch('URL_DE_VOTRE_API');
        // const data = await response.json();
        const data = [
          {
            id: 1,
            title: 'Applet 1',
            color: '#FF0000',
            logoUrl: 'https://via.placeholder.com/50',
          },
          {
            id: 2,
            title: 'Applet 2',
            color: '#7289da',
            logoUrl: 'https://via.placeholder.com/50',
          }
        ];
        setApplets(data); // Mettez à jour l'état avec les données de l'API
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API', error);
      }
    };

    fetchData();
  }, []); // Assurez-vous de passer un tableau vide en tant que deuxième argument pour useEffect pour simuler componentDidMount

  return (
    <ScrollView style={styles.container}>
      <Text>Inclure la search bar ici pour rechercher les applets avec les titres</Text>
      {applets.map(applet => {
        // Vérifiez si la couleur de fond est sombre ou claire
        const isBackgroundColorDark = isColorDark(applet.color);

        // Définissez la couleur du texte en fonction de la couleur de fond
        const textColor = isBackgroundColorDark ? 'black' : 'white';

        return (
          <View key={applet.id} style={[styles.card, { backgroundColor: applet.color }]}>
            <View>
              <Image source={{ uri: applet.logoUrl }} style={styles.logo} />
            </View>
            <Text style={[styles.title, { color: textColor }]}>{applet.title}</Text>
            <TouchableOpacity style={styles.button}>
              <Text>Mon bouton</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

// Fonction pour déterminer si une couleur est sombre ou claire
const isColorDark = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return (r == 255 && g == 255 && b == 255)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: Dimensions.get('window').height / 5 - 75,
  },
  card: {
    flexDirection: 'column', // Changez la direction de la disposition des éléments en vertical
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10, // Ajoutez un espace entre le logo et le titre
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10, // Ajoutez un espace entre le titre et le bouton
  },
});

export default MyApplets;
