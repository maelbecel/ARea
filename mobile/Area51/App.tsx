import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppletsScreen from './screen/MyServices';
import ExploreScreen from './screen/Home';
import CreateScreen from './screen/AddServices';
import ActivityScreen from './screen/Activity';
import ProfileScreen from './screen/Profile';

import Login from './screen/LogIn';
import SignUp from './screen/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getNbApplets(): string | number {
  let ret = Math.floor(Math.random() * 150);

  return ret < 100 ? ret : '99+';
}

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Area 51" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
