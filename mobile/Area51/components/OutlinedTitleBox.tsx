import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWriteColor } from './ActionCard';
import { UpdateAppletTitleWithID } from '../api/UpdateApplet';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* The `interface OutlinedTitleBoxProps` defines the props that can be passed to the `OutlinedTitleBox`
component. */
interface OutlinedTitleBoxProps {
  onChangeText : (text: string) => void;
  value: string;
  bgColor: string;
  author?: string;
}

/**
 * The above code defines a React functional component called OutlinedTitleBox that renders a text input
 * field with an outline, and updates its focus state based on user interaction.
 * @param  - - `onChangeText`: A function that will be called when the text input value changes. It
 * takes the new value as a parameter.
 * @returns The `OutlinedTitleBox` component is being returned.
 */
const OutlinedTitleBox: React.FC<OutlinedTitleBoxProps> = ({onChangeText, value, bgColor, author}) => {
  const [isFocused, setIsFocused] = useState(false);

  /**
   * The handleFocus function sets the state variable isFocused to true.
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * The handleBlur function sets the isFocused state to false.
   */
  const handleBlur = async () => {
    setIsFocused(false);
    const appletID = await AsyncStorage.getItem('appletID');
    await UpdateAppletTitleWithID(appletID, value);
  };

  /**
   * The function `titleLen` returns the length of a given value as a string, followed by "/140", or an
   * empty string if the value is undefined.
   * 
   * @return The function `titleLen` returns a string that represents the length of a value. If the
   * length of the value is greater than or equal to 0, it returns the length followed by "/140".
   * Otherwise, it returns an empty string.
   */
  const titleLen = () => {
      if (value.length >= 0) {
          return `${value.length}/140`;
      }
      return "";
  };


  /* The `return` statement in the `OutlinedTitleBox` component is rendering the JSX code that will be
  displayed on the screen. */
  return (
    isFocused ? (
    <View>
        <View style={[styles.container, styles.focused]}>
            <TextInput
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[styles.textInput, styles.focused, { color: getWriteColor(bgColor)}]} // Si isFocused est vrai, on ne met pas de style, sinon on met le style [styles.focused
                value={value}
                multiline={true}
            />
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: getWriteColor(bgColor), marginBottom: 15 }}>{titleLen()}</Text>
    {/* The user who created the applet and the button to edit the title */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: getWriteColor(bgColor) }}>by {author}</Text>
            <TouchableOpacity onPress={handleBlur}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: getWriteColor(bgColor) }}>Save modification</Text>
            </TouchableOpacity>
        </View>
    </View>
    ) : (
    <View>
        <Text style={ [styles.textInput, {color: getWriteColor(bgColor) }]}>{value}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: getWriteColor(bgColor) }}>by {author}</Text>
            <TouchableOpacity onPress={handleFocus}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: getWriteColor(bgColor) }}>Edit title</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  );
};

/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. These styles are then used to style the components in the `OutlinedTitleBox`
component. */
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
    fontSize: 28, // Taille de la police
    fontWeight: 'bold', // Texte en gras
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    marginBottom: '2%',
  },
  focused: {
    borderColor: '#D9D9D9', // Couleur de la bordure
  },
});

/* The line `export default OutlinedTitleBox;` is exporting the `OutlinedTitleBox` component as the
default export of the file. This means that when another file imports this module, it can import the
`OutlinedTitleBox` component using any name of its choice. For example, in another file, you can
import the `OutlinedTitleBox` component like this: */
export default OutlinedTitleBox;
