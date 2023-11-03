/* The code `import * as React from 'react';` is importing the entire React library and assigning it to
the variable `React`. This allows us to use React components and functions in our code. */
import * as React from 'react';
import { Alert, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';

/**
 * The Home component is a React component that fetches and displays a list of applets, allowing the
 * user to search and filter the applets by name.
 * @param  - - `navigation`: This is a prop passed to the `Home` component that allows navigation
 * between screens in a navigation stack. It is used to navigate to the "Service" screen when a
 * `ServiceCard` component is pressed.
 * @returns The Home component is returning a JSX element that represents the structure and content of
 * the component. It includes a View component with styles.container, which contains a View component
 * with styles.input and a FormInput component for searching. It also includes a ScrollView component
 * with a height of 800, which contains a View component with styles.services. Inside the View
 * component, there is a mapping of the dispApplets array
 */
const Home = ({ navigation }) => {
  const [applets, setApplets] = useState([]); // State to store applets
  const [dispApplets, setDispApplets] = useState([]); // State to store applets

  // Fetch and set the applets when the component mounts
  useEffect(() => {
    /**
     * The function fetchApplets fetches applets from a service and sets them in state variables.
     */
    const fetchApplets = async () => {
      try {
        const services = await Services();
        setApplets(services);
        setDispApplets(services);
      } catch (error) {
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
          console.error('Error fetching applets:', error);
      }
    };

    fetchApplets();
  }, []);

  /**
   * The function `filterApplets` filters an array of applets based on a given name and updates the
   * displayed applets accordingly.
   * @param {string} name - A string representing the name of the applet to filter.
   * @returns the filtered array of applets that match the given name.
   */
  const filterApplets = (name : string) => {
    if (applets == null) return;
    let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
    setDispApplets(tmp);
  }

  /**
   * The function "displayApplets" maps over an array of applets and returns a JSX element for each
   * applet.
   * @returns The `displayApplets` function is returning an array of `ServiceCard` components.
   */
  const displayApplets = () => {
    if (dispApplets == null) return;
    return dispApplets.map((service) => (
      <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('Service', { slug: service.slug })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
    ));
  };

  /* The `return` statement is returning a JSX element that represents the structure and content of the
  Home component. */
  return (
    <View style={ styles.container}>
      <View style={ styles.input }>
        <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => {filterApplets(text)}} size='85%' />
      </View>
      <ScrollView >
        <View style={ styles.services }>
          {displayApplets()}
        </View>
      </ScrollView>
    </View>
  )
}

/* The code `const styles = StyleSheet.create({ ... })` is creating a JavaScript object called `styles`
using the `StyleSheet.create` method from the `react-native` library. This object contains multiple
style definitions for different components or elements in the `Home` component. */
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    height: '100%',
  },
  input: {
    alignContent: "center",
    alignItems: "center",
  },
  services: {
    alignContent: "center",
    alignItems: "center",
  }
});

/* `export default Home;` is exporting the `Home` component as the default export of this module. This
means that when another module imports this module, they can import the `Home` component directly
without having to specify its name. For example, in another module, we can import the `Home`
component like this: `import Home from './Home';`. */
export default Home;