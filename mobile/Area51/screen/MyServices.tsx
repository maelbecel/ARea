import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

export default function MyServices() {
  return (
    <View style={styles.container}>
      <Text>My Services</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Marge à gauche et à droite de l'écran
    paddingTop: Dimensions.get('window').height / 5 - 75,
  },
});