# Technical Documentation

# Mobile

The mobile part is divide in 3 principal parts :
* [Screen/](Mobile-Screen.md) is the folder where all screens of the application are.
* [Api/](Mobile-API.md) is the folder that contain all components thar required `API` requests. All `API` requests are extract from the screens and are inside this folder.
* [Components/](Mobile-Components.md) is the folder that required all components used in the screens like search bars or form inputs.

### [App.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/App.tsx)
The App.tsx is the begining of the project.

At the top of the file there is all native inputs for external components:
```typescript
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
```

Then there is all imports for screen, if you need to add a screen, you can import it here. These screen
components are used in the `Tabs` component to define the screens for each tab in the bottom tab
navigator. Each imported screen component represents a different screen that will be displayed when
the corresponding tab is selected.
``` typescript
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
```

We add two navigators, **Tab** contain all the screens contains in the bottom tab bar and **Stack** contain all the others screens.
`const Tab = createMaterialTopTabNavigator();` creates a bottom tab navigator using the
`createBottomTabNavigator` function from the `@react-navigation/bottom-tabs` library. This bottom
tab navigator is used to display multiple screens in a tabbed interface at the bottom of the screen.
```typescript
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
```
The `Tabs` function is a React component that returns a `Tab.Navigator` component from the
`react-navigation` library. This `Tab.Navigator` component is used to create a bottom tab navigator,
which displays multiple screens in a tabbed interface at the bottom of the screen.
```typescript
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
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

To end the file, we export the App by returning a NavigationContainer that contain the bottom bar and all the other screens.The function returns a navigation container with three screens: Login, SignUp, and Area 51, each with options to hide the header. It returns a JSX element. The JSX element is wrapped in a NavigationContainer component from the React Navigation library. Inside the NavigationContainer, there is a Stack.Navigator component with an initialRouteName of "Login". Each Stack.Screen component has a name prop and a component prop. If you want to add a screen you need to import it and put it into the Stack Navigator.
```typescript
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ cardStyle: {backgroundColor: "#FFF"}}}>
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
```
# Server

In this documentation, we will see how the server works. We will also learn how to add applications, actions and reactions

### How does it work?

First, you should know that the server consists of two main parts:
- API - This part handle all api call from other applications and also web & mobile calls
- Actions & reactions system - This part manages all action detection and carrying out reactions
\
The server was designed to be able to add actions & reactions without needing to touch the API part of the project.\
It was created in Java, with the Spring Boot framework. To be able to edit the server, you must therefore have a good foundation in these two aspects

### Setting up the development environment

To get started, you need to install **Java 17**. If you use a lower version of Java you may experience problems compiling or using the server.

You must also have **Maven** installed.

Install these tools on Debian/Ubuntu:
```Bash
sudo apt install openjdk-17-jre maven
```
Install these tools on Fedora/Centos:
```Bash
sudo dnf install openjdk-17-jre maven
```
On Windows, use the IntellJ IDE (IDEA) which automatically downloads what is needed for this project.

Once this is done, follow step of installation [server of user documentation](Server-Launch-Server.md) to launch server.

Each time you edit the server code, you must restart it with the command:
```Bash
docker compose up --build server
```

### App

An app is the first part of actions/reactions. It defines a service, for example discord, and it is in this that we will list all the actions & reactions linked to this app.

How to create an app?

The project is structured so that the apps are found in the **fr.zertus.area.app** folder. Each app has its own folder.\
Let’s take an example of an app called Area51. To create it, you must create a folder named **Area51**.

You must then create the main class, **Area51App**, which extends the App class
```Java
public class Area51App extends App {

    @Override
    public String getName() {
        return "Area51";
    }

    @Override
    public List<Action> getActions() {
        return List.of();
    }

    @Override
    public List<Reaction> getReactions() {
        return List.of();
    }

    @Override
    public AppDecoration getDecoration() {
        return null;
    }
    
}
```




# Web

The web part is divided into 4 principal sections:
* [Pages/](https://github.com/maelbecel/ARea/blob/master/web/pages) is the folder where all the application screens are located. Since it's Next.JS, the pages are organized to correspond to their respective URL addresses.
* [Api/](https://github.com/maelbecel/ARea/wiki/Web-Api) is the folder that contains all components requiring API requests. All API requests are extracted from the pages and reside within this folder.
* [Components/](https://github.com/maelbecel/ARea/blob/master/web/components) is the folder that houses all components used within the screens, such as search bars or form inputs.

### [_app.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/_app.tsx) {id="app-tsx_1"}
The _app.tsx is the beginning of the project.

At the top of the file, you'll find all the Next.JS imports for external components:
```typescript
// --- Type --- //
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
```

Next, there are imports for secure storage values (providers). If you need to add new providers, you can import them here. These provider components are utilized in the MyApp main function to define the providers (value, setter) for each page of the application. Each imported provider component represents a different value that can be used when necessary on a page.
```typescript
// --- Providers --- //
import { SessionProvider } from "next-auth/react"
import { UserProviders } from '../utils/api/user/Providers/UserProvider'
import { TokenProviders } from '../utils/api/user/Providers/TokenProvider'
import { ServiceProviders } from '../utils/api/service/Providers/ServiceProvider'
```

To conclude the file, we export the App by returning a SessionProvider that encompasses all the pages using different providers. It returns a JSX element. The JSX element is wrapped in a SessionProvider component from the Next Auth library.
The <Component {...pageProps} /> represents the current page.
```typescript
function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <TokenProviders>
        <UserProviders>
          <ServiceProviders>
            <Component {...pageProps} />
          </ServiceProviders>
        </UserProviders>
      </TokenProviders>
    </SessionProvider>
  )
}
```
