import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// --- Interface --- //
interface OutlinedTextBoxProps {
  onChangeText : (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
}

const OutlinedTextBox: React.FC<OutlinedTextBoxProps> = ({onChangeText, value, secureTextEntry}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused ? null : styles.focused]}>
      <TextInput
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.textInput, isFocused ? null : styles.focused]} // Si isFocused est vrai, on ne met pas de style, sinon on met le style [styles.focused
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3, // Largeur de la bordure
    borderColor: '#363841', // Couleur de la bordure
    borderRadius: 5, // Rayon des coins de la boîte
    paddingVertical: 10, // Rembourrage vertical pour l'espace interne
    paddingHorizontal: 10, // Rembourrage horizontal pour l'espace interne
    marginVertical: 10, // Marge verticale pour l'espace externe
  },
  textInput: {
    width: '100%', // Largeur de la boîte
    fontSize: 18, // Taille de la police
    fontWeight: 'bold', // Texte en gras
    color: '#363841', // Couleur du texte
  },
  focused: {
    borderColor: '#D9D9D9', // Couleur de la bordure
    color: '#363841', // Couleur du texte
    opacity: 0.5, // Opacité du texte
  },
});

export default OutlinedTextBox;
