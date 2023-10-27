/* The code is importing various modules and components from different files. */
import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import TopBar from '../components/TopBar';

/* The code defines a functional component called `SearchServices`. It takes in two props, `navigation`
and `route`, which are provided by React Navigation. */
const SearchServices = ({ navigation, route }) => {
  const [applets, setApplets] = useState([]); // State to store applets
  const [dispApplets, setDispApplets] = useState([]); // State to store applets

  const { type, actionInput, reactionInput, index }  = route.params;

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
  `useEffect` hook is used to fetch applets from a service and set them in state. */
  useEffect(() => {
    /**
     * The function fetchApplets fetches applets from a service and sets them in state.
     */
    const fetchApplets = async () => {
      try {
        const services = await Services();
        setApplets(services);
        setDispApplets(services);
      } catch (error) {
        console.error('Error fetching applets:', error);
      }
    };

    fetchApplets();
  }, [type]);

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

  /* The code is creating a new constant variable called `filteredApplets`. It checks if the
  `dispApplets` variable is null or undefined. If it is, then `filteredApplets` is set to null.
  Otherwise, it filters the `dispApplets` array based on the conditions inside the `filter`
  function. */
  const filteredApplets = (dispApplets == null) ? null : dispApplets.filter((service) => {
    if (type === "action") return service.action === true;
    if (type === "reaction") return service.reaction === true;
    return true; // Include all applets if type is not specified
  });

  /* This code block is rendering the JSX elements that make up the UI of the `SearchServices`
  component. */
  if (applets != undefined && applets != null) {
    return (
      <View style={styles.container}>
        <TopBar title="Create" iconLeft='arrow-back' color="#000" onPressLeft={() => navigation.goBack()} />
        <View style={styles.input}>
          <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => { filterApplets(text) }} size='85%' />
        </View>
        <ScrollView style={{ marginBottom: 50 }}>
          <View style={styles.services}>
            {filteredApplets == null || filteredApplets.length === 0 ? <Text>No result</Text> : (
              filteredApplets.map((service) => (
                <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('ServiceTemplate', { slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

/* The `const styles` variable is an object that contains style definitions for different components in
the `SearchServices` component. Each key in the object represents a component, and its value is
another object that contains the specific styles for that component. */
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
  },
});

export default SearchServices;
