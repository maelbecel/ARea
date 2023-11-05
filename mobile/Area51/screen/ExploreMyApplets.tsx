import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchApplet from '../components/Applets/SearchApplet';

/**
 * The function returns a React component that renders a page for exploring applets.
 * @returns The ExploreMyApplets component is returning a View component that contains a title and a
 * SearchApplet component.
 */
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

    /* The `const styles = StyleSheet.create({ ... })` block is creating a JavaScript object that contains
    style definitions for different components in the `ExploreMyApplets` component. Each key in the
    object represents a component, and its value is an object that contains the style properties for
that component. */
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 60,
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

/* `export default ExploreMyApplets;` is exporting the `ExploreMyApplets` component as the default
export of this module. This means that when another module imports this module, they can import the
`ExploreMyApplets` component directly without having to specify its name. For example, in another
module, you can import the `ExploreMyApplets` component like this: `import ExploreMyApplets from
'./ExploreMyApplets';` */
export default ExploreMyApplets;
