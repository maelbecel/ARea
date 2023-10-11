/* The code is importing necessary components and hooks from the React and React Native libraries. */
import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* The `interface InputProps` is defining a new interface that extends the `TouchableOpacityProps`
interface. This means that `InputProps` will inherit all the properties and methods from
`TouchableOpacityProps`. Additionally, the `InputProps` interface adds a new property called
`onChangeText` which is a function that takes a `text` parameter of type string and returns void.
This allows the `SearchBar` component to receive an `onChangeText` prop that is a function to handle
text input changes. */
interface InputProps extends TouchableOpacityProps {
    onChangeText : (text: string) => void;
}

/**
 * The SearchBar component is a functional component in TypeScript React that renders a TextInput
 * element with a placeholder and allows the user to enter and update search text.
 * @param  - The above code defines a functional component called `SearchBar` which takes in a single
 * prop called `onChangeText`.
 * @returns The SearchBar component is returning a View component containing a TextInput component.
 */
const SearchBar: React.FC<InputProps> = ({onChangeText}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={ styles.container } >
         <Icon name={"search"} size={24} color="#00000080" />
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={onChangeText}
        style={ styles.text }
      />
    </View>
  );
}

/* The `const styles = StyleSheet.create({ ... })` block is defining a JavaScript object called
`styles` that contains CSS-like styles for the components in the `SearchBar` component. */
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default SearchBar;
