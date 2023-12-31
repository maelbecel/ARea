import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* The code is importing different screen components from their respective files. These screen
components are used in the `Tabs` component to define the screens for each tab in the bottom tab
navigator. Each imported screen component represents a different screen that will be displayed when
the corresponding tab is selected. */
import AppletsScreen from './screen/ExploreMyApplets';
import MyApplets from './screen/MyApplets';
import ExploreScreen from './screen/Home';
import CreateScreen from './screen/AddServices';
import ActivityScreen from './screen/Activity';
import ProfileScreen from './screen/Profile';
import InfoScreen from './screen/InfoScreen';
import EditApplet from './screen/EditApplet';

import Login from './screen/LogIn';
import SignUp from './screen/SignUp';
import Service from './screen/Service';
import SearchServices from './screen/SearchServices';
import ServiceTemplate from './screen/ServiceTemplate';
import ConnectAuth from './screen/ConnectAuth';

import SearchServicesEdit from './screen/SearchServicesEdit';
import ServiceTemplateEdit from './screen/ServiceTemplateEdit';
import ConnectAuthEdit from './screen/ConnectAuthEdit';


import MyApplet from './api/MyApplet';

/* `const Tab = createBottomTabNavigator();` creates a bottom tab navigator using the
`createBottomTabNavigator` function from the `@react-navigation/bottom-tabs` library. This bottom
tab navigator is used to display multiple screens in a tabbed interface at the bottom of the screen. */
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

/**
 * The function `getNbApplets` returns a random number between 0 and 150, or the string '99+' if the
 * random number is greater than or equal to 100.
 * @returns either a string or a number. If the randomly generated number is less than 100, it will
 * return the number. Otherwise, it will return the string '99+'.
 */
const getNbApplets = () : number | string=> {
    const [res, setRes] = React.useState(null);

    React.useEffect(() => {
      async function fetchData() {
        const applet = await MyApplet();
        if (applet.length > 0) {
          setRes(applet.length);
        }
      }
      fetchData();
    }, []);

    return res
}

/* The `Tabs` function is a React component that returns a `Tab.Navigator` component from the
`react-navigation` library. This `Tab.Navigator` component is used to create a bottom tab navigator,
which displays multiple screens in a tabbed interface at the bottom of the screen. */
function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'My Applets') {
            iconName = 'apps';
          } else if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'Create') {
            iconName = 'add';
          } else if (route.name === 'Activity') {
            iconName = 'notifications';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarIndicatorStyle: {height: 0},
        tabBarInactiveTintColor: '#A8A8A8',
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarShowLabel: false,
        backgroundColor: '#FFFFFF',
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          backgroundColor: 'transparent',
        },
      })}
      tabBarPosition="bottom"
      >
      <Tab.Screen name="My Applets" component={AppletsScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      {/* <Tab.Screen name="Activity" component={ActivityScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * The function returns a navigation container with three screens: Login, SignUp, and Area 51, each
 * with options to hide the header.
 * @returns a JSX element. The JSX element is wrapped in a NavigationContainer component from the React
 * Navigation library. Inside the NavigationContainer, there is a Stack.Navigator component with an
 * initialRouteName of "Login". Inside the Stack.Navigator, there are three Stack.Screen components:
 * "Login", "SignUp", and "Area 51". Each Stack.Screen component has a name prop and a component prop
 */
export default function App() {
  React.useEffect(() => {
    const reset = async (): Promise<void> => {
      await AsyncStorage.setItem('action', "default");
      await AsyncStorage.setItem('reaction', "[]");
    }
    reset();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ cardStyle: {backgroundColor: "#FFF"}}}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Service" component={Service} options={{ headerShown: false }} />
        <Stack.Screen name="SearchServices" component={SearchServices} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceTemplate" component={ServiceTemplate} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectAuth" component={ConnectAuth} options={{ headerShown: false }} />
        <Stack.Screen name="SearchServicesEdit" component={SearchServicesEdit} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceTemplateEdit" component={ServiceTemplateEdit} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectAuthEdit" component={ConnectAuthEdit} options={{ headerShown: false }} />
        <Stack.Screen name="Area 51" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="MyApplets" component={MyApplets} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditApplet" component={EditApplet} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
