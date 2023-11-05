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
package fr.zertus.area.app.area51;

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
Several things to note:
- You can define the list of actions and reactions
- You can set the name of your app
- You can define its decoration

We'll come back to actions and reactions but first let's talk about AppDecoration.

In order to allow rapid addition of actions, reactions and apps, mobile and web do not store the list of apps and retrieve it dynamically from the server.
AppDecoration is a class defining graphical aspects of the service. You can define its logo, its (background) color, its description as well as a link to a website.

Example AppDecoration for Area51 app:
```Java
@Override
public AppDecoration getDecoration() {
   return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/area51/image", "#363841",
       "Area51 is a service that allows you to create applets that will be triggered by actions.", "http://etipech.me/");
}
```
As you can see, the color must be defined via its hexa code. 

### Action
How to create action ?

First of all, you must be aware of what a FormInput is. If not you can look [here, at server section](User-Documentation.md).

There is a tool class, [FormInputUtils](https://github.com/maelbecel/ARea/blob/master/server/src/main/java/fr/zertus/area/utils/FormInputUtils.java), allowing to easily manipulate FormInput.

You then need to think about how your action will be triggered. There are two main ways:
- The action service will come and trigger a webhook that you must set up
- It is up to the action to check every X time if it must be triggered.

We will first approach the first case by creating a first class: MyServiceWebhookAction
```Java
public class MyServiceWebhookAction extends Action {

    public MyServiceWebhookAction(String appName) {
        super(appName, "Action title", "Action description");

        this.inputs.add(FormInput.createSelectInput("inout", "inout", null)); // Inputs
        // The inputs are the fields requested from the user to allow the configuration
        // of the action. For example, you can request a text field

        this.placeholders.put("applet_name", "Applet name"); // You can add placeholders
        // Placeholders are information that you can retrieve with the action and
        // that you want the user to be able to use in their reactions.
    }

    @Override
    public List<FormInput> getInputs(User user) {
        // This method is called when a user needs to fill in the fields
        // of your action. Here you can redefine them according to each user.
        
        // This method is for example used to load github repositories depending on the user
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        // Here you can perform all the configuration essential for the
        // operation of the action. You can also check user fields.
        // This method is called when creating an Applet. If you return an
        // error here the user will receive it and he will not be able to create his applet
    }
    
    /**
     * Check if the action is triggered
     * @param user the user that triggered the action
     * @param inputs the inputs of the action
     * @param values values given when the action was triggered (can be all you want)
     * @return true if the action is triggered, false otherwise
     */
    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        // In this method you must check if the action should be triggered
        // according to the different parameters given
    }

}
```

For the second case you also need to implement the ManualTrigger interface
```Java
public class MyServiceWebhookAction extends Action implements ManualTrigger {

    public MyServiceWebhookAction(String appName) {
        super(appName, "Action title", "Action description");

        this.inputs.add(FormInput.createSelectInput("inout", "inout", null)); // Inputs
        // The inputs are the fields requested from the user to allow the configuration
        // of the action. For example, you can request a text field

        this.placeholders.put("applet_name", "Applet name"); // You can add placeholders
        // Placeholders are information that you can retrieve with the action and
        // that you want the user to be able to use in their reactions.
    }

    @Override
    public List<FormInput> getInputs(User user) {
        // This method is called when a user needs to fill in the fields
        // of your action. Here you can redefine them according to each user.
        
        // This method is for example used to load github repositories depending on the user
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        // Here you need to add a hidden field called trigger with the
        // time in seconds between each call to the manualTrigger function
        
        inputs.add(FormInput.createHiddenInput("trigger", "Trigger", "180"));
    }
    
    /**
     * Check if the action is triggered
     * @param user the user that triggered the action
     * @param inputs the inputs of the action
     * @param values values given when the action was triggered (can be all you want)
     * @return true if the action is triggered, false otherwise
     */
    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        // Here, always return true in this case
        return true;
    }
    
    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        // Here your management to check if the action should be trigger
        // Must return a list of maps corresponds to a list of placeholders
        // (if you have for example several things to return such as emails)
    }

}
```
Finally, you must add your action to the action list of your class main (Area51App in this case)

### Reaction
How to create a reaction ?

First, create your Reaction class, for example, MyServiceMyReactionReaction
```Java
public class MyServiceMyReactionReaction extends Reaction {

    public MyServiceMyReactionReaction(String app) {
        super(app, "Reaction title", "Reaction description");

        this.inputs.add(FormInput.createSelectInput("inout", "inout", null)); // As for the action, you can ask the user for inputs
    }

    @Override
    public List<FormInput> getInputs(User user) {
        // Here see the same function as action
    }
    
    /**
     * Trigger the reaction
     * @param user the user that triggered the reaction
     * @param inputs the inputs of the reaction
     * @param parameters the placeholders values <placeholder, value>
     * @return true if the reaction was triggered, false otherwise
     * @throws ReactionTriggerException
     */
    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        // This function is called when the reaction is triggered. Here you will find all the information you need to carry out your reaction.
    }

}
```
Next, like action, add this reaction to reactions list of app and it's done !


# Web

The web part is divided into 4 principal sections:
* [Pages/](Web-Pages1.md) is the folder where all the application screens are located. Since it's Next.JS, the pages are organized to correspond to their respective URL addresses.
* [Api/](Web-Api.md) is the folder that contains all components requiring API requests. All API requests are extracted from the pages and reside within this folder.
* [Components/](Web-Components1.md) is the folder that houses all components used within the screens, such as search bars or form inputs.

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
