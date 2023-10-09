import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

import Login from './screen/LogIn';
import SignUp from './screen/SignUp';
import Service from './screen/Service';
import SearchServices from './screen/SearchServices';
import ServiceTemplate from './screen/ServiceTemplate';
import ConnectAuth from './screen/ConnectAuth';

/* `const Tab = createBottomTabNavigator();` creates a bottom tab navigator using the
`createBottomTabNavigator` function from the `@react-navigation/bottom-tabs` library. This bottom
tab navigator is used to display multiple screens in a tabbed interface at the bottom of the screen. */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * The function `getNbApplets` returns a random number between 0 and 150, or the string '99+' if the
 * random number is greater than or equal to 100.
 * @returns either a string or a number. If the randomly generated number is less than 100, it will
 * return the number. Otherwise, it will return the string '99+'.
 */
function getNbApplets(): string | number {
  let ret = Math.floor(Math.random() * 150);

  return ret < 100 ? ret : '99+';
}

/* The `Tabs` function is a React component that returns a `Tab.Navigator` component from the
`react-navigation` library. This `Tab.Navigator` component is used to create a bottom tab navigator,
which displays multiple screens in a tabbed interface at the bottom of the screen. */
function Tabs() {
  return (
    <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'My Applets') {
              iconName = focused ? 'apps' : 'apps'; // Icon name for "My Applets"
            } else if (route.name === 'Explore') {
              iconName = focused ? 'explore' : 'explore'; // Icon name for "Explore"
            } else if (route.name === 'Create') {
              iconName = focused ? 'add' : 'add'; // Icon name for "Create"
            } else if (route.name === 'Activity') {
              iconName = focused ? 'notifications' : 'notifications'; // Icon name for "Activity"
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person'; // Icon name for "Profile"
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#A8A8A8',
          tabBarActiveBackgroundColor: '#FFFFFF',
          tabBarInactiveBackgroundColor: '#FFFFFF',
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        })}
    >
      <Tab.Screen name="My Applets" component={AppletsScreen} options={{ headerShown: false, tabBarBadge: getNbApplets() }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Create" component={CreateScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Service" component={Service} options={{ headerShown: false }} />
        <Stack.Screen name="SearchServices" component={SearchServices} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceTemplate" component={ServiceTemplate} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectAuth" component={ConnectAuth} options={{ headerShown: false }} />
        <Stack.Screen name="Area 51" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="MyApplets" component={MyApplets} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
