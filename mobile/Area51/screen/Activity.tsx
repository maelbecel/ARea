/* The code `import * as React from 'react';` is importing the entire React library and assigning it to
the variable `React`. This allows us to use React components and functions in our code. */
import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ActivityCard from '../components/ActivityCard';

type Activity = {
  id: string,
  type: string,
}

const Activity = ({ navigation }) => {
  const [activity, setActivity] = useState<Activity[]>([]); // State to store applets

  // Fetch and set the applets when the component mounts
  useEffect(() => {
    /**
     * The function fetchApplets fetches applets from a service and sets them in state variables.
     */
    const fetchApplets = async () => {
      try {
        setActivity([{ id: '33', type: 'ran' }, { id: '46', type: 'on' }, { id: '46', type: 'off'}, { id: '46', type: 'ran'}, { id: '33', type: 'ran'}, { id: '33', type: 'ran'}, { id: '33', type: 'ran'}]);
      } catch (error) {
          console.log('Error fetching activity:', error);
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
    if (activity == null) return;
    return activity.map((activity, index) => (
      <ActivityCard key={index} type={activity.type} id={activity.id} />
    ));
  };

  /* The `return` statement is returning a JSX element that represents the structure and content of the
  Home component. */
  return (
    <View style={ styles.container}>
      <ScrollView style={{ paddingBottom : 50, height: "100%"}}>
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
    paddingBottom: 0,
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
export default Activity;