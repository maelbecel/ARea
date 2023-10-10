import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchApplet from '../components/Applets/SearchApplet';

const ExploreMyApplets = () => {
  return (
    <View style={styles.container}>
      {/* Titre de la page */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Explore your applets</Text>
      </View>
      <SearchApplet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#363841',
  },
});

export default ExploreMyApplets;
