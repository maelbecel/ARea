/* The code `import * as React from 'react';` is importing the entire React library and assigning it to
the variable `React`. This allows us to use React components and functions in our code. */
import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';

const Home = ({ navigation }) => {
  const [applets, setApplets] = useState([]); // State to store applets

  // Fetch and set the applets when the component mounts
  useEffect(() => {
    const fetchApplets = async () => {
      try {
        const services = await Services();
        console.log(services);
        setApplets(services);
      } catch (error) {
          console.log('Error fetching applets:', error);
      }
    };

    fetchApplets();
  }, []);

  /**
   * The function "displayApplets" maps over an array of applets and returns a JSX element for each
   * applet.
   * @returns The `displayApplets` function is returning an array of `ServiceCard` components.
   */
  const displayApplets = () => {
    return applets.map((service) => (
      <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('Service', { slug: service.slug })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
    ));
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.input }>
        <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => {console.log(text)}} size='85%' />
      </View>
      <ScrollView style={{ marginBottom: 50}}>
        <View style={ styles.services }>
          {displayApplets()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 100,
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