# Mobile-Screen


## [Activity.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Activity.tsx)

The Activity screen is a screen where the user can see his applet activty like :
* When does the applet ran
* If the applet has been enabled
* If the applet has been disabled

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ActivityCard from '../components/ActivityCard';
```

Then we create an activity object that can contain the following properties :
* id : the id of the applet
* type : the type of the applet

```typescript
interface Activity {
  id: string;
  type: string;
}
```

We create now the main component of the screen that take the navigation as parameter:
```typescript
const Activity = ({ navigation })
```

We create a state that will contain the list of the activities :
```typescript
const [activity, setActivity] = useState<Activity[]>([]);
```

We create a function that will fetch the activities from the API :
```typescript
useEffect(() => {
    /**
     * The function fetchApplets fetches applets from a service and sets them in state variables.
     */
    const fetchApplets = async () => {
      try {
        setActivity([{ id: '33', type: 'ran' }, { id: '46', type: 'on' }, { id: '46', type: 'off'}, { id: '46', type: 'ran'}, { id: '33', type: 'ran'}, { id: '33', type: 'ran'}, { id: '33', type: 'ran'}]);
      } catch (error) {
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
          console.error('Error fetching activity:', error);
      }
    };

    fetchApplets();
  }, []);
```

We create a function that will render the list of the activities. The function "displayApplets" maps over an array of applets and returns a JSX element for each applet.
```typescript
  const displayApplets = () => {
    if (activity == null) return;
    return activity.map((activity, index) => (
      <ActivityCard key={index} type={activity.type} id={activity.id} />
    ));
  };
```

We can now return the page with the list of the activities :

```typescript
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
```

We create the styles of the page :
```typescript
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
```

We can conclude by exporting the component :
```typescript
export default Activity;
```

For more information about this file you can check his complete code here : [Activity.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Activity.tsx)

## [AddServices.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/AddServices.tsx)

The component `AddServices` is a screen where the user can add a new service to create a new applet.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import ActionChoose from '../components/ActionChoose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AppletApi from '../api/Applet';
import Action from '../api/Action';
import Reaction from '../api/Reaction';
import ActionInfo from '../api/ActionInfo';
import ReactionInfo from '../api/ReactionInfo';
import * as Progress from 'react-native-progress';
```

Then we create the main component of the screen that take the navigation as parameter:
```typescript
const AddServices = ({navigation, route})
```

The code is using the `React.useState` hook to define and initialize state variables in the
`AddServices` component.

```typescript
const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<number>(0);
  const [loadingInfo, setLoadingInfo] = React.useState<string>("");
  let {actionInput} = (route.params != undefined ? route.params : "")
  let {reactionInput} = (route.params != undefined ? route.params : [])
```

The function `newApplet` creates a new applet by getting action and reaction inputs, calling the AppletApi function, setting default values for action and reaction, and navigating to the "My Applets" screen.
We add some setLoading() calls to display a loading bar while the applet is being created.

```typescript
  const newApplet = async () => {

    setLoading(1);
    setLoadingInfo("Getting actions")
    const actionInputs = await Action(action)
    let reactionInputs = [];

    setLoading(10);
    setLoadingInfo("Getting reactions")
    for (const input of reaction) {
      const reactionInput = await Reaction(input, action)
      reactionInputs.push(reactionInput)
    }

    setLoading(30);
    setLoadingInfo("Getting action informations")
    const actionInfo = await ActionInfo(action)
    const reactionInfo = [];

    setLoading(40);
    setLoadingInfo("Getting reaction informations")
    for (const input of reaction) {
      const reactionInf = await ReactionInfo(input)
      reactionInfo.push(reactionInf)
    }

    setLoading(60);
    setLoadingInfo("Creating title")
    let title = reactionInfo[0].name
    for (let i = 1; i < reactionInfo.length; i++) {
      title += " and " + reactionInfo[i].name
    }
    title += " if " + actionInfo.name
    if (title == undefined || action == "default" || actionInputs == undefined || reactionInputs == undefined || reaction.length == 0) {
      alert("Error")
      return
    }

    setLoading(80);
    setLoadingInfo("Creating the applet")
    const data = await AppletApi(title, action, actionInputs, actionInput, reaction, reactionInputs, reactionInput);
    if (data == false) {
      return
    } else {
      await AsyncStorage.setItem('action', "default");
      await AsyncStorage.setItem('reaction', "[]");
      navigation.navigate("MyApplets", { id: data.id});
    }
    setLoading(0);
  }
```

The `useFocusEffect` hook is a React Navigation hook that allows you to perform side effects when
the screen comes into focus. In this code, it is used to fetch data from AsyncStorage and update
the state variables `action` and `reaction` when the screen is focused.

```typescript
  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const action = await AsyncStorage.getItem('action');
        const reaction = await AsyncStorage.getItem('reaction');
        setAction((action === null) ? "default" : action);
        setReaction((reaction === null) ? [] : JSON.parse(reaction));
      } catch (error) {
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error("Error while getting info : ", error);
      }
    };
    fetchData();
  });
```

We create a function that permit to remove an item when you click on the cross:
The function `removeItem` removes an item from an array and updates the state and AsyncStorage accordingly.
In the first part we remove the current reaction input and  the second part we remove the current reaction.
```typescript
  const removeItem = async (item : number) => {
    const tmp = [...reactionInput];
    tmp.splice(item, 1);
    reactionInput = tmp;

    const rec = [...reaction]
    rec.splice(item, 1);
    setReaction(rec);
    await AsyncStorage.setItem('reaction', JSON.stringify(rec));
  };
```

We add the same function but to reset all, it's called when you click on the cross in the action input:
```typescript
   const resetAll = async () => {
    actionInput = "default";
    await AsyncStorage.setItem('action', "default");
    reactionInput = [];
    await AsyncStorage.setItem('reaction', "[]");
  }
```

We can create a function to render the reaction. The function "showReactions" returns a list of React components based on the "reaction" array, with each component containing an "ActionChoose" component.
The function resets the values of actionInput and reactionInput and saves them in AsyncStorage.
```typescript
  const showReactions = () => {
    if (reaction.length == 0) {
      return (null)
    }
    return reaction.map((item, index) => {
      return (
        <View key={index} style={{ alignItems: 'center', backgroundColor: "#FFF", width: "100%"}}>
          <ActionChoose  type="reaction" slug={item} onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : index})}  onPressCross={() => {removeItem(index)}}/>
        </View>
      )
    })
  }
```

To finish we have two case of return :
* If the loading equal 0, we return the action and the reactions.
* If the loading is different of 0, we return the loading bar.
```typescript
  return (loading == 0) ? (
      <ScrollView style={{ backgroundColor: "#FFF", height: "100%", paddingTop: 20}} contentContainerStyle={{alignItems: 'center', flex: (reaction.length > 4) ? 0 : 1, justifyContent: "center"}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} onPressCross={resetAll}/>
        {showReactions()}
        {
          (reaction.length >= 9) ? null : (
            <Icon name="add-circle" size={40} color="#363841" />
          )
        }
        {
          (reaction.length >= 9) ? null : (
            <ActionChoose type="reaction" slug="default" onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : reaction.length})} />
          )
        }
        {(action != "default" && reaction.length > 0) ?
          <SubmitButton title="Continue" onPress={newApplet} textcolor='#FFF' style={{}}/>
          : null
        }
      </ScrollView>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#363841' }}>Loading...</Text>
      <Text style={{ textAlign: 'center', fontSize: 25, color: '#363841' }}>{loadingInfo}</Text>
      <Progress.Bar progress={loading / 100.0} width={300} height={30} style={{borderRadius : 90}} color="#363841"/>
    </View>
  );
```

The line `export default AddServices;` is exporting the `AddServices` component as the default
export of the module. This allows other modules to import and use the `AddServices` component by
simply importing it without specifying a specific name for the import. For example, in another
module, you can import the `AddServices` component like this: `import AddServices from
'./AddServices';`.

```typescript
export default AddServices;
```
For more information about this file you can check his complete code here : [AddServices.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/AddServices.tsx)

## [ConnectAuth.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ConnectAuth.tsx)

The component `ConnectAuth` is a screen where the user can validate an action or reaction service into the applet creation, including the forms and the OAuth verification.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, Alert, StatusBar, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Input} from '../api/ServiceInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionApi from '../api/Action';
import ReactionApi from '../api/Reaction';
import TokenApi from '../api/ServiceToken';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import SelectDropdown from 'react-native-select-dropdown'
import PlaceHolders, {Dict} from '../api/Placeholders';
import IngredientButton from '../components/IngredientButton';
import UserInfosAPI from '../api/UserInfos';
import * as SecureStore from 'expo-secure-store';
import AppletDetails from '../api/AppletDetails';
import {Keyboard} from  'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
```

Now we create a function that will return the color use to write depending of the theme :
The `getWriteColor` function takes a color value and returns the appropriate text color (either black or white) based on the brightness of the background color.
It use a function call `getLuminance` that calculate the luminance of a given hex color by converting the color to its RGB components and applying a luminance formula. The resulting luminance value represents the brightness of the color, with higher values indicating brighter colors and lower values indicating darker colors.
The function calculates the luminance of a given hex color.
The `hexColor` parameter is a string representing a color in hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component, GG represents the green component, and BB represents the blue component of the color.

```typescript
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (attenuation) {
    if (luminance > 0.6) {
        return "#363841";
    } else {
        return "#D9D9D9";
    }
  } else {
    if (luminance > 0.6) {
      return "#000000";
    } else {
        return "#FFFFFF";
    }
  }
};
```

The above code is a TypeScript React component that renders a view for connecting to an
authentication service. It retrieves information about the service from an API and sets various
state variables based on the response. It also generates a form based on the inputs array and checks
if all form fields have been filled. If all form fields are filled, it opens an authentication
session using the WebBrowser API and navigates to a different screen based on the type of form. The
view includes a top bar with a title and icons for navigation, an image, and text components for
displaying the service name, action title, and description

```typescript
const ConnectAuth = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `color` : the color of the service
* `url` : the url of the service logo
* `name` : the name of the service
* `action` : the action slug of the service
* `reaction` : the reaction slug of the service
* `title` : the title of the action
* `oAuthStatus` : the status of the OAuth
* `error` : the error of the OAuth
* `description` : the description of the action
* `inputs` : the inputs of the action
* `placeholders` : the placeholders of the action
* `loggedIn` : the status of the user
* `useUrl` : the url of the service
* `inputsResp` : the inputs responses of the action

```typescript
const { slug, type, actionInput, reactionInput, index } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [oAuthStatus, setoAuthStatus] = React.useState<boolean>(false);
  const [error, seterror] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>("");
  const [inputs, setInput] = React.useState<Input[]>([]);
  const [placeholders, setPlaceholders] = React.useState<Dict>(null);
  const redirectUri = Linking.createURL("/oauth2/" + slug.split(".")[0]);
  const useUrl = Linking.useURL();
  const [loggedIn, setLoggedIn] = React.useState(false);
  let inputsResp = [];
```

Now we create the function `displayTextForm` returns a React component that renders an IngredientButton with specific props and handles the onChangeText and onSelect events.
The `input` parameter is an object that represents an ingredient. It likely has properties such as `name`, `quantity`, and `unit`.
The `index` parameter is a number that represents the index of the input in the array of inputs. It is used to keep track of the position of the input in the array.
It displays the form in case of a number type form.

```typescript
  const displayTextForm = (input : Input, index : number) => {
    return (<IngredientButton key={input.name}
      input={input}
      placeholders={placeholders}
      type={type}
      color={color}
      onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}}
      onSelect={(text) => {inputsResp[index] = text; isAllFormFill()}}
    />)
  }
```

The above code is defining a function called `displayNumberForm` that takes two parameters: `input` and `index`.
It displays the form in case of a number type form.

```typescript
  const displayNumberForm = (input : any, index : number) => {
    return (
      <View key={input.name} style={{marginVertical : 10, width:"100%"}}>
        <View >
          <TextInput keyboardType='numeric' placeholder={input.label} textBreakStrategy="highQuality" placeholderTextColor={getWriteColor(color, true)} onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}} style={[styles.input, { backgroundColor: getWriteColor(getWriteColor(color, true)), color: getWriteColor(color, true) }]}/>
        </View>
     </View>
    )
  }
 ```

The function `displayOther` logs an error message with the unknown type and index, and returns null.
The `input` parameter is of type `any`, which means it can accept any data type. It represents the value that needs to be displayed or processed.
The `index` parameter is a number that represents the position or index of  the element in an array or collection. It is used to identify the specific element that is being processed or accessed.
It displays the form in case of an unknown type form.
```typescript
  const displayOther = (input : any, index : number) => {
    console.error("###############")
    console.error("Unknown type : ", input.type);
    console.error("At index : ", index);
    console.error("###############")
    return null;
  }
```

The function "showForm" checks for errors and inputs, and then displays different types of forms based on the input type.
The function `showForm` returns a JSX element or an array of JSX elements.

```typescript
const showForm = () => {
    if (error == false && inputs == null) {
      Alert.alert("Authentification Error", "An error occurred while trying to connect to the API")
      navigation.goBack();
      seterror(true);
      return null;
    } else if (inputs == null) return null;
    return inputs.map((input, index) => ((input.type == "TEXT" || input.type == "URL") ? displayTextForm(input, index) : (input.type == "NUMBER") ? displayNumberForm(input, index) : (input.type == "SELECT") ? displaySelectForm(input, index) : displayOther(input, index)))
  }
```

The function `isAllFormFill` checks if all the form inputs have been filled and returns true if they have, and false if any input is null.
The function `isAllFormFill` returns a boolean value. It returns `true` if all the elements in the `inputsResp` array are not `null`, indicating that all the form fields have been filled. It returns `false` if any element in the `inputsResp` array is `null`, indicating that there are still empty form fields.

```Typescript
const isAllFormFill = () : boolean => {
    if (inputs == null) return false;
    for (let i = 0; i < inputs.length; i++) {
      if (inputsResp[i] == null || inputsResp[i] == "" || inputsResp[i] == undefined)
        return false;
    }
    return true;
  }
```

The function `isConnected` checks if a user is connected to a server and has authentication for a specific service.
The `slug` parameter is a string that represents a unique identifier for a specific service or API. It is used to check if the user is connected to that service or API.
The function `isConnected` returns a Promise that resolves to a boolean value. It returns `true` if the user is connected to the service or API, and `false` if the user is not connected to the service or API.

We begin by checking if the user is connected to a server and has a token. If the user is not connected to a server or does not have a token, the function navigates to the Login screen and returns `false`.


```typescript
const isConnected = async (slug : string) : Promise<boolean> => {
    const serverAddress = await AsyncStorage.getItem('serverAddress');
    const token = await SecureStore.getItemAsync('token_api');


    if (!token || !serverAddress) {
      navigation.navigate('Login');
      return false;
    }

    const response = await UserInfosAPI(token, serverAddress);
    const services = response.data.connectedServices;
    const hasAuth = (await AppletDetails(slug.split('.')[0])).data.hasAuthentification

    if (services.includes(slug) || !hasAuth) {
      setoAuthStatus(true);
      return true;
    } else {
      if (await _openAuthSessionAsync() ){
        setoAuthStatus(true);
        return true;
      }
      Alert.alert("Authentification Error", "An error occurred while trying to connect to the API")
      navigation.goBack();
      return false;
    }
  }
```

The function `_openAuthSessionAsync` is an asynchronous function that opens an authentication session using a server address, token, and redirect URI.
The function `_openAuthSessionAsync` returns a boolean value. If the `result.type` is "success", it returns `true`, otherwise it returns `false`.

```typescript
  const _openAuthSessionAsync = async () => {
    try {
      const serverAddress = await AsyncStorage.getItem('serverAddress');
      const token = await TokenApi(slug.split(".")[0])
      let result = await WebBrowser.openAuthSessionAsync(
        `${serverAddress}/service/${slug.split(".")[0]}/oauth2?authToken=${token}&redirecturi=${redirectUri}`
      );
      if (result.type == "success") {
        return true;
      } else
        return false;
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `useUrl` variable changes.
If thr useUrl include the slug, we set the loggedIn to true.

```Typescript
React.useEffect(() => {
    if (useUrl && useUrl.includes(slug.split(".")[0])) {
      setLoggedIn(true);
    }
  }, [useUrl]);
```
The above code is a React useEffect hook that is used to perform side effects in a functional
component. It is called when the component mounts for the first time (empty dependency array []).
The function checks if the type is "reaction" and the actionSlug is "default", and if so, it navigates to the "Create" screen, otherwise it calls the isConnected function.
The function `callingAction` returns nothing (undefined).

```Typescript
React.useEffect(() => {
    const callingAction = async () => {
      const actionSlug = await AsyncStorage.getItem("action");
      if (type == "reaction" && actionSlug == "default") {
        navigation.removeListener
        navigation.navigate("Create");
        return;
      } else {
        await isConnected(slug.split(".")[0])
      }
    }

    callingAction();
  }, []);
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the component is mounted (since the dependency array `[]` is
empty). The function fetchServiceInfo retrieves information from an API and sets various state variables based on the response.
The function `fetchServiceInfo` returns nothing (i.e., `undefined`).

```typescript
React.useEffect(() => {
const fetchServiceInfo = async () => {
const info = await ServiceInfo(slug.split(".")[0])
const actionSlug = await AsyncStorage.getItem("action");
const infoInput = (type == "action") ? await ActionApi(slug) : await ReactionApi(slug, actionSlug);
const placeHolders = (type == "action") ? null : await PlaceHolders(slug, actionSlug)

      if (info == null) {
        return;
      }
      setInput(infoInput);
      setColor(info.decoration.backgroundColor);
      setUrl(info.decoration.logoUrl);
      setName(info.name);
      setAction(info.actions);
      setReaction(info.reactions);
      setPlaceholders(placeHolders);
      for (let i = 0; i < info.actions.length; i++) {
        inputsResp[i] = null;
      }
      isAllFormFill();
    }
    fetchServiceInfo();
}, [oAuthStatus]);
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `action` or `reaction` variables change.
The function `findAction` searches for an action or reaction with a matching slug and sets the title and description accordingly, or logs the number of actions and reactions and a message if no match is found.
The function `findAction` returns nothing.

```typescript
React.useEffect(() => {
    const findAction = () => {
      for (let i = 0; i < action.length; i++) {
        if (action[i].slug == slug) {
          setTitle(action[i].name);
          setDescription(action[i].description);
          return;
        }
      }
      for (let i = 0; i < reaction.length; i++) {
        if (reaction[i].slug == slug) {
          setTitle(reaction[i].name);
          setDescription(reaction[i].description);
          return;
        }
      }
    }
    findAction();
  }, [action, reaction]);
```

The function `redirection` checks if all form fields are filled, opens an authentication session, sets an item in AsyncStorage, and navigates to a different screen based on the type of form.
It's use when the authentication is done.

```Typescript
const redirection = async () => {
    if (isAllFormFill()) {
      console.log('Type is ', type)
      if (type == "action")
        await AsyncStorage.setItem(type, slug);
      else {
        let tmp : Array<any> = JSON.parse(await AsyncStorage.getItem(type));
        tmp[index] = slug;
        await AsyncStorage.setItem(type, JSON.stringify(tmp));
      }
      if (type == "action"){
        console.log("navigation to page ", "Create ", {actionInput: inputsResp, reactionInput: reactionInput});
        navigation.navigate("Create", {actionInput: inputsResp, reactionInput: reactionInput});
      } else {
        let res : Array<any> = (reactionInput != undefined) ? reactionInput : [];
        res[index] = inputsResp;
        navigation.navigate("Create", {actionInput: actionInput, reactionInput: res});
      }
    }
  }
```

The above code is a TypeScript React component that renders a view with a top bar, an image, and
some text. It checks if the variable "name" is not empty, and if it is not empty, it renders the
view. The view has a background color based on the "color" variable, and it contains a top bar
with a title, a left arrow icon, and a right close icon. It also displays an image with a source
URL, and a text component with the value of the "name" variable.

There is then two case of return :
* If the loggedIn is true, we return the form.
```Typescript
  return (
      <View style={{backgroundColor: color, height : "100%", paddingTop: 30}}>
        <TopBar title="Create" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='close' onPressRight={() => navigation.navigate("Create")} />
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 16 }}
          extraScrollHeight={200}
        >
          <ScrollView style={{width : "100%"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={[{ backgroundColor: color }]}>
              <Image source={{ uri: url, cache: 'force-cache'}} style={styles.logo} />
              <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
            </View>
            <View style={[{ backgroundColor: color },styles.action]}>
              <Text style={[styles.name, { color: getWriteColor(color) }]}>{title}</Text>
              <Text style={[styles.desc, { color: getWriteColor(color) }]}>{description}</Text>
                {oAuthStatus && showForm()}
                <TouchableOpacity style={[{backgroundColor: getWriteColor(color)}, styles.button]} onPress={redirection}>
                  <Text style={[{color: color}, styles.buttonText]}>Connection</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
```
* If the loggedIn is false, we return the charging circle.
```Typescript
    return (
        <View style={{backgroundColor: color, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={getWriteColor(color)} />
        </View>
    )
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.

```Typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  button : {
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    padding: 10,
    borderRadius: 90,
    marginTop: 20,
  },
  ingredients : {
    marginVertical: 10,
    width: '50%',
    padding: 5,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttoningr: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  container: {
    paddingTop: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  desc: {
    fontSize: 20,
    alignSelf: 'center',
    width: '70%',
    textAlign: 'center',
    marginBottom: 40,
  },
  select: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 20,
    alignSelf: 'center',
    width: '70%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    flexWrap: 'wrap',
  },
  action: {
    paddingTop: 50,
    alignContent: "center",
    alignItems: "center",
    height: "100%",
  }
});
```

The line `export default ConnectAuth;` is exporting the `ConnectAuth` component as the default
export of the module. This means that when another module imports this module, it can access the
`ConnectAuth` component using the default import syntax, like `import ConnectAuth from
'./ConnectAuth';`.

```typescript
export default ConnectAuth;
```

For more information about this file you can check his complete code here : [ConnectAuth.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ConnectAuth.tsx)

## [ConnectAuthEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ConnectAuthEdit.tsx)

The component `ConnectAuthEdit` is a screen where the user can validate an action or reaction service into the applet edition, including the forms and the OAuth verification.

We start by importing the required modules and components :
```typescript
  import * as React from 'react';
import { Text, View, Alert, StatusBar, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Input} from '../api/ServiceInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionApi from '../api/Action';
import ReactionApi from '../api/Reaction';
import TokenApi from '../api/ServiceToken';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import SelectDropdown from 'react-native-select-dropdown'
import PlaceHolders, {Dict} from '../api/Placeholders';
import IngredientButton from '../components/IngredientButton';
import UserInfosAPI from '../api/UserInfos';
import * as SecureStore from 'expo-secure-store';
import AppletDetails from '../api/AppletDetails';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
```

Now we create a function that will return the color use to write depending of the theme :
The `getWriteColor` function takes a color value and returns the appropriate text color (either black or white) based on the brightness of the background color.
It use a function call `getLuminance` that calculate the luminance of a given hex color by converting the color to its RGB components and applying a luminance formula. The resulting luminance value represents the brightness of the color, with higher values indicating brighter colors and lower values indicating darker colors.
The function calculates the luminance of a given hex color.
The `hexColor` parameter is a string representing a color in hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component, GG represents the green component, and BB represents the blue component of the color.

```typescript
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (attenuation) {
    if (luminance > 0.6) {
        return "#363841";
    } else {
        return "#D9D9D9";
    }
  } else {
    if (luminance > 0.6) {
      return "#000000";
    } else {
        return "#FFFFFF";
    }
  }
};
```

The above code is a TypeScript React component that renders a view for connecting to an
authentication service. It retrieves information about the service from an API and sets various
state variables based on the response. It also generates a form based on the inputs array and checks
if all form fields have been filled. If all form fields are filled, it opens an authentication
session using the WebBrowser API and navigates to a different screen based on the type of form. The
view includes a top bar with a title and icons for navigation, an image, and text components for
displaying the service name, action title, and description.

```typescript
const ConnectAuthEdit = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `color` : the color of the service
* `url` : the url of the service logo
* `name` : the name of the service
* `action` : the action slug of the service
* `reaction` : the reaction slug of the service
* `title` : the title of the action
* `oAuthStatus` : the status of the OAuth
* `error` : the error of the OAuth
* `description` : the description of the action
* `inputs` : the inputs of the action
* `placeholders` : the placeholders of the action
* `redirectUri` : the redirect uri of the service
* `useUrl` : the url of the service
* `loggedIn` : the status of the user
* `inputsResp` : the inputs responses of the action

```typescript
const {id, slug, type, actionInput, reactionInput, index } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [oAuthStatus, setoAuthStatus] = React.useState<boolean>(false);
  const [error, seterror] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>("");
  const [inputs, setInput] = React.useState<Input[]>([]);
  const [placeholders, setPlaceholders] = React.useState<Dict>(null);
  const redirectUri = Linking.createURL("/oauth2/" + slug.split(".")[0]);
  const useUrl = Linking.useURL();
  const [loggedIn, setLoggedIn] = React.useState(false);
  let inputsResp = [];
```

Now we create the function `displayTextForm` returns a React component that renders an IngredientButton with specific props and handles the onChangeText and onSelect events.
The `input` parameter is an object that represents an ingredient. It likely has properties such as `name`, `quantity`, and `unit`.
The `index` parameter is a number that represents the index of the input in the array of inputs. It is used to keep track of the position of the input in the array.
It displays the form in case of a number type form.

```typescript
  const displayTextForm = (input : Input, index : number) => {
    return (<IngredientButton key={input.name}
      input={input}
      placeholders={placeholders}
      type={type}
      color={color}
      onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}}
      onSelect={(text) => {inputsResp[index] = text; isAllFormFill()}}
    />)
  }
```

The above code is defining a function called `displayNumberForm` that takes two parameters: `input` and `index`.
It displays the form in case of a number type form.

```typescript
  const displayNumberForm = (input : any, index : number) => {
    return (
      <View key={input.name} style={{marginVertical : 10, width:"100%"}}>
        <View >
          <TextInput keyboardType='numeric' placeholder={input.label} textBreakStrategy="highQuality" placeholderTextColor={getWriteColor(color, true)} onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}} style={[styles.input, { backgroundColor: getWriteColor(getWriteColor(color, true)), color: getWriteColor(color, true) }]}/>
        </View>
     </View>
    )
  }
 ```

The function `displayOther` logs an error message with the unknown type and index, and returns null.
The `input` parameter is of type `any`, which means it can accept any data type. It represents the value that needs to be displayed or processed.
The `index` parameter is a number that represents the position or index of  the element in an array or collection. It is used to identify the specific element that is being processed or accessed.
It displays the form in case of an unknown type form.
```typescript
  const displayOther = (input : any, index : number) => {
    console.error("###############")
    console.error("Unknown type : ", input.type);
    console.error("At index : ", index);
    console.error("###############")
    return null;
  }
```

The function "showForm" checks for errors and inputs, and then displays different types of forms based on the input type.
The function `showForm` returns a JSX element or an array of JSX elements.

```typescript
const showForm = () => {
    if (error == false && inputs == null) {
      Alert.alert("Authentification Error", "An error occurred while trying to connect to the API")
      navigation.goBack();
      seterror(true);
      return null;
    } else if (inputs == null) return null;
    return inputs.map((input, index) => ((input.type == "TEXT" || input.type == "URL") ? displayTextForm(input, index) : (input.type == "NUMBER") ? displayNumberForm(input, index) : (input.type == "SELECT") ? displaySelectForm(input, index) : displayOther(input, index)))
  }
```

The function `isAllFormFill` checks if all the form inputs have been filled and returns true if they have, and false if any input is null.
The function `isAllFormFill` returns a boolean value. It returns `true` if all the elements in the `inputsResp` array are not `null`, indicating that all the form fields have been filled. It returns `false` if any element in the `inputsResp` array is `null`, indicating that there are still empty form fields.

```Typescript
const isAllFormFill = () : boolean => {
    if (inputs == null) return false;
    for (let i = 0; i < inputs.length; i++) {
      if (inputsResp[i] == null || inputsResp[i] == "" || inputsResp[i] == undefined)
        return false;
    }
    return true;
  }
```

The function `isConnected` checks if a user is connected to a server and has authentication for a specific service.
The `slug` parameter is a string that represents a unique identifier for a specific service or API. It is used to check if the user is connected to that service or API.
The function `isConnected` returns a Promise that resolves to a boolean value. It returns `true` if the user is connected to the service or API, and `false` if the user is not connected to the service or API.

We begin by checking if the user is connected to a server and has a token. If the user is not connected to a server or does not have a token, the function navigates to the Login screen and returns `false`.


```typescript
const isConnected = async (slug : string) : Promise<boolean> => {
    const serverAddress = await AsyncStorage.getItem('serverAddress');
    const token = await SecureStore.getItemAsync('token_api');


    if (!token || !serverAddress) {
      navigation.navigate('Login');
      return false;
    }

    const response = await UserInfosAPI(token, serverAddress);
    const services = response.data.connectedServices;
    const hasAuth = (await AppletDetails(slug.split('.')[0])).data.hasAuthentification

    if (services.includes(slug) || !hasAuth) {
      setoAuthStatus(true);
      return true;
    } else {
      if (await _openAuthSessionAsync() ){
        setoAuthStatus(true);
        return true;
      }
      Alert.alert("Authentification Error", "An error occurred while trying to connect to the API")
      navigation.goBack();
      return false;
    }
  }
```

The function `_openAuthSessionAsync` is an asynchronous function that opens an authentication session using a server address, token, and redirect URI.
The function `_openAuthSessionAsync` returns a boolean value. If the `result.type` is "success", it returns `true`, otherwise it returns `false`.

```typescript
  const _openAuthSessionAsync = async () => {
    try {
      const serverAddress = await AsyncStorage.getItem('serverAddress');
      const token = await TokenApi(slug.split(".")[0])
      let result = await WebBrowser.openAuthSessionAsync(
        `${serverAddress}/service/${slug.split(".")[0]}/oauth2?authToken=${token}&redirecturi=${redirectUri}`
      );
      if (result.type == "success") {
        return true;
      } else
        return false;
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `useUrl` variable changes.
If thr useUrl include the slug, we set the loggedIn to true.

```Typescript
React.useEffect(() => {
    if (useUrl && useUrl.includes(slug.split(".")[0])) {
      setLoggedIn(true);
    }
  }, [useUrl]);
```
The above code is a React useEffect hook that is used to perform side effects in a functional
component. It is called when the component mounts for the first time (empty dependency array []).
The function checks if the type is "reaction" and the actionSlug is "default", and if so, it navigates to the "Create" screen, otherwise it calls the isConnected function.
The function `callingAction` returns nothing (undefined).

```Typescript
React.useEffect(() => {
    const callingAction = async () => {
      const actionSlug = await AsyncStorage.getItem("action");
      if (type == "reaction" && actionSlug == "default") {
        navigation.removeListener
        navigation.navigate("Create");
        return;
      } else {
        await isConnected(slug.split(".")[0])
      }
    }

    callingAction();
  }, []);
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the component is mounted (since the dependency array `[]` is
empty). The function fetchServiceInfo retrieves information from an API and sets various state variables based on the response.
The function `fetchServiceInfo` returns nothing (i.e., `undefined`).

```typescript
React.useEffect(() => {
const fetchServiceInfo = async () => {
const info = await ServiceInfo(slug.split(".")[0])
const actionSlug = await AsyncStorage.getItem("action");
const infoInput = (type == "action") ? await ActionApi(slug) : await ReactionApi(slug, actionSlug);
const placeHolders = (type == "action") ? null : await PlaceHolders(slug, actionSlug)

      if (info == null) {
        return;
      }
      setInput(infoInput);
      setColor(info.decoration.backgroundColor);
      setUrl(info.decoration.logoUrl);
      setName(info.name);
      setAction(info.actions);
      setReaction(info.reactions);
      setPlaceholders(placeHolders);
      for (let i = 0; i < info.actions.length; i++) {
        inputsResp[i] = null;
      }
      isAllFormFill();
    }
    fetchServiceInfo();
}, [oAuthStatus]);
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `action` or `reaction` variables change.
The function `findAction` searches for an action or reaction with a matching slug and sets the title and description accordingly, or logs the number of actions and reactions and a message if no match is found.
The function `findAction` returns nothing.

```typescript
React.useEffect(() => {
    const findAction = () => {
      for (let i = 0; i < action.length; i++) {
        if (action[i].slug == slug) {
          setTitle(action[i].name);
          setDescription(action[i].description);
          return;
        }
      }
      for (let i = 0; i < reaction.length; i++) {
        if (reaction[i].slug == slug) {
          setTitle(reaction[i].name);
          setDescription(reaction[i].description);
          return;
        }
      }
    }
    findAction();
  }, [action, reaction]);
```

The function `redirection` checks if all form fields are filled, opens an authentication session, sets an item in AsyncStorage, and navigates to a different screen based on the type of form.
It's use when the authentication is done.

```Typescript
const redirection = async () => {
    if (isAllFormFill()) {
      console.log('Type is ', type)
      if (type == "action")
        await AsyncStorage.setItem(type, slug);
      else {
        let tmp : Array<any> = JSON.parse(await AsyncStorage.getItem(type));
        tmp[index] = slug;
        await AsyncStorage.setItem(type, JSON.stringify(tmp));
      }
      if (type == "action"){
        console.log("navigation to page ", "Create ", {actionInput: inputsResp, reactionInput: reactionInput});
        navigation.navigate("Create", {actionInput: inputsResp, reactionInput: reactionInput});
      } else {
        let res : Array<any> = (reactionInput != undefined) ? reactionInput : [];
        res[index] = inputsResp;
        navigation.navigate("Create", {actionInput: actionInput, reactionInput: res});
      }
    }
  }
```

The above code is a TypeScript React component that renders a view with a top bar, an image, and
some text. It checks if the variable "name" is not empty, and if it is not empty, it renders the
view. The view has a background color based on the "color" variable, and it contains a top bar
with a title, a left arrow icon, and a right close icon. It also displays an image with a source
URL, and a text component with the value of the "name" variable.
Here we have two cases of return :
* If the name is defined, we return the form.
```Typescript
  return (
      <View style={{backgroundColor: color, height : "100%", paddingTop: 30}}>
        <TopBar title="Create" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='close' onPressRight={() => navigation.navigate("Edit", {id : id})} />
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 16 }}
          extraScrollHeight={200}
        >
        <ScrollView style={{width : "100%"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: color }]}>
            <Image source={{ uri: url, cache: 'force-cache' }} style={styles.logo} />
            <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
          </View>
          <View style={[{ backgroundColor: color },styles.action]}>
            <Text style={[styles.name, { color: getWriteColor(color) }]}>{title}</Text>
            <Text style={[styles.desc, { color: getWriteColor(color) }]}>{description}</Text>
              {oAuthStatus && showForm()}
              <TouchableOpacity style={[{backgroundColor: getWriteColor(color)}, styles.button]} onPress={redirection}>
                <Text style={[{color: color}, styles.buttonText]}>Connection</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
```
* If the name is not defined, we return the charging circle.
```Typescript
    return (
        <View style={{backgroundColor: color, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={getWriteColor(color)} />
        </View>
    )
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.


```Typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  button : {
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    padding: 10,
    borderRadius: 90,
    marginTop: 20,
  },
  ingredients : {
    marginVertical: 10,
    width: '50%',
    padding: 5,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttoningr: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  container: {
    paddingTop: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  desc: {
    fontSize: 20,
    alignSelf: 'center',
    width: '70%',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    fontSize: 20,
    alignSelf: 'center',
    width: '70%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    flexWrap: 'wrap',
  },
  action: {
    paddingTop: 50,
    alignContent: "center",
    alignItems: "center",
    height: "100%",
  }
});
```

The above code is exporting a component called "ConnectAuthEdit" as the default export. It is
written in TypeScript and is specifically for a React application.

```Typescript
export default ConnectAuthEdit;
```

For more information about this file you can check his complete code here : [ConnectAuthEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ConnectAuthEdit.tsx)


## [EditApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/EditApplet.tsx)

The component `EditApplet` is a screen where the user can edit an applet.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import ActionChoose from '../components/ActionChoose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Action from '../api/Action';
import Reaction from '../api/Reaction';
import ActionInfo from '../api/ActionInfo';
import ReactionInfo from '../api/ReactionInfo';
import AppletID from '../api/AppletID';
import TopBar from '../components/TopBar';
import AppletPatch from '../api/AppletPatch';
import * as Progress from 'react-native-progress';
```

Now we create the `EditApplet` page :
```typescript
const EditApplet = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `action` : the action slug of the service
* `reaction` : the reaction slug of the service
* `actionInput` : the inputs of the action
* `reactionInput` : the inputs of the reaction
* `title` : the title of the action
* `loading` : the loading percentage of the page
* `isloading` : the loading status of the page
* `loadingInfo` : the loading information of the page
* `id` : the id of the applet

```typescript
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState<string[]>([]);
  const [actionInput, setActionInput] = React.useState(route.params != undefined ? route.params : [])
  const [reactionInput, setReactionInput] = React.useState(route.params != undefined ? route.params : [])
  const [title, setTitle] = React.useState("")
  const [loading, setLoading] = React.useState<number>(0);
  const [isloading, setisLoading] = React.useState<boolean>(true);
  const [loadingInfo, setLoadingInfo] = React.useState<string>("");
  const {id} = route.params
```

The `React.useEffect` hook is used to perform side effects in functional components. In this case,
it is used to fetch data from the server and update the component's state.
The above function fetches data from an API and sets various states based on the received data.
The function `fetchData` returns a Promise that resolves to `null` if the `data` variable is `null`. Otherwise, it does not explicitly return anything.

```Typescript
React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AppletID(id);
        if (data == null) return null;
        setTitle(data.name);
        setAction(data.actionSlug);
        await AsyncStorage.setItem('action', data.actionSlug);
        let ac : string[] = []
        for (let i = 0; i < data.actionData.length; i++)
          ac[i] = data.actionData[i].value;
        setActionInput(ac);

        let reactionSlugs : string[] = []
        let rea : any[][] = []
        for (let i = 0; i < data.reactions.length; i++) {
          reactionSlugs[i] = data.reactions[i].reactionSlug;
          let tmp : any[] = [];
          for (let x = 0; x < data.reactions[i].reactionData.length; x++)
            tmp.push(data.reactions[i].reactionData[x].value)
          rea[i] = tmp;
        }
        setReactionInput(rea);
        setReaction(reactionSlugs);
        await AsyncStorage.setItem('reaction', JSON.stringify(reactionSlugs));
      } catch (error) {
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error("Error while getting info : ", error);
      }
    };
    fetchData();
    setisLoading(false);
  }, []);
```

The function `newApplet` is an asynchronous function that creates a new applet by fetching actions and reactions, getting their information, and then creating the applet with the provided data.
The function return nothing (undefined) if the condition `data == false` is true. Otherwise, it is navigating to the "MyApplets" screen with the `id` parameter set to `data.id`.

```Typescript
const newApplet = async ()
```

Firstly the function is setting the loading state to 1 and displaying the loading information as "Getting
actions". Then, it is calling the `Action` function with the `action` parameter to fetch the
action inputs. After that, it initializes an empty array called `reactionInputs`.

```Typescript
setLoading(1);
    setLoadingInfo("Getting actions")
    const actionInputs = await Action(action)
    let reactionInputs = [];
```

Then, the code is setting the loading state to 10 and displaying the loading information as "Getting
reactions". Then, it is iterating over the `reaction` array and calling the `Reaction` function
with each reaction and action as parameters. The result of each function call is pushed into the
`reactionInputs` array. After each iteration, the loading state is updated by adding `(i *
(20/reaction.length))` to the current loading state. This is done to show the progress of
fetching reactions.

```Typescript
    setLoading(10);
    setLoadingInfo("Getting reactions")
    for (let i = 0; i < reaction.length; i++) {
      const reactionInput = await Reaction(reaction[i], action)
      reactionInputs.push(reactionInput)
      setLoading(10 + (i * (20/reaction.length)));
    }
```

The code is setting the loading state to 30 and displaying the loading information as "Getting
action information". Then, it is calling the `ActionInfo` function with the `action` parameter
to fetch information about the action. After that, it initializes an empty array called
`reactionInfo`.

```Typescript
    setLoading(30);
    setLoadingInfo("Getting action information")
    const actionInfo = await ActionInfo(action)
    const reactionInfo = [];
```

The code is setting the loading state to 40 and displaying the loading information as "Getting
reaction informations". Then, it is iterating over the `reaction` array and calling the
`ReactionInfo` function with each reaction as a parameter. The result of each function call is
pushed into the `reactionInfo` array. After each iteration, the loading state is updated by
adding `(i * (30/reaction.length))` to the current loading state. This is done to show the
progress of fetching reaction information.

```Typescript
    setLoading(40);
    setLoadingInfo("Getting reaction informations")
    for (let i = 0; i < reaction.length; i++) {
      const reactionInf = await ReactionInfo(reaction[i])
      reactionInfo.push(reactionInf)
      setLoading(40 + (i * (30/reaction.length)));
    }
```

Finally, the following code block is responsible for creating a new applet.

```Typescript
    setLoading(70);
    setLoadingInfo("Creating the applet")
    const data = await AppletPatch(title, action, actionInputs, actionInput, reaction, reactionInputs, reactionInput, id);
    setLoading(0);
    if (data == false) {
      return
    } else {
      await AsyncStorage.setItem('action', "default");
      await AsyncStorage.setItem('reaction', "[]");
      navigation.navigate("MyApplets", { id: data.id});
    }
```

We create a new function, the function removes an item from an array and updates the state and AsyncStorage accordingly.
he `item` parameter is a number that represents the index of the item to
be removed from the `reactionInput` and `reaction` arrays.

```Typescript
const removeItem = async (item : number) => {
    const tmp = [...reactionInput];
    tmp.splice(item, 1);
    setReactionInput(tmp);
    const rec = [...reaction]
    rec.splice(item, 1);
    setReaction(rec);
    await AsyncStorage.setItem('reaction', JSON.stringify(rec));
  };
```


The function "showReactions" returns a list of React components based on the "reaction" array, with each component containing an "ActionChoose" component.
The function `showReactions` returns a JSX element.

```typescript
const showReactions = () => {
    if (reaction.length == 0) {
      return (null)
    }
    return reaction.map((item, index) => {
      return (
        <View key={index} style={{ alignItems: 'center', backgroundColor: "#FFF", width: "100%"}}>
          <ActionChoose  type="reaction" slug={item} onPress={() => (action === "default") ? null : navigation.navigate('SearchServicesEdit', {id : id, type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : index})}  onPressCross={() => {removeItem(index)}}/>
        </View>
      )
    })
  }
```

The function "resetAll" resets the action and reaction inputs and saves the default values in AsyncStorage.

```typescript
const resetAll = async () => {
    setActionInput("default");
    await AsyncStorage.setItem('action', "default");
    setReactionInput([]);
    await AsyncStorage.setItem('reaction', "[]");
  }
```

We can check if the loading is finished, if it is, we return the form.
```typescript
if (isloading) {
    return (
      <View>
        <View style={{backgroundColor: "#FFF", paddingTop: 50}}>
          <TopBar title="Edit"  iconLeft='arrow-back' onPressLeft={() => (navigation.goBack(), resetAll())} color={"#363841"} />
        </View>
      </View>
    )
  }
```

Otherwise, we have two choice :
* If the loading status is 0 we return the form.
```typescript
return (

    <View>
      <View style={{backgroundColor: "#FFF", paddingTop: 50}}>
        <TopBar title="Edit"  iconLeft='arrow-back' onPressLeft={() => (navigation.goBack(), resetAll())} color={"#363841"} />
      </View>
      <ScrollView style={{ backgroundColor: "#FFF", height: "80%", paddingTop: 0, marginTop: 0}} contentContainerStyle={{alignItems: 'center', flex: 0, justifyContent: "center"}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} onPressCross={resetAll}/>
        {showReactions()}
        {
          (reaction.length >= 9) ? null : (
            <Icon name="add-circle" size={40} color="#363841" />
          )
        }
        {
          (reaction.length >= 9) ? null : (
            <ActionChoose type="reaction" slug="default" onPress={() => (action === "default") ? null : navigation.navigate('SearchServicesEdit', {id : id, type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : reaction.length})} />
          )
        }
        {(action != "default" && reaction.length > 0) ?
          <SubmitButton title="Continue" onPress={newApplet} textcolor='#FFF' style={{}}/>
          : null
        }
      </ScrollView>
      </View>
  )
```
* If the loading status is not 0 we return the progress bar.
```typescript
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#363841' }}>Loading...</Text>
      <Text style={{ textAlign: 'center', fontSize: 25, color: '#363841' }}>{loadingInfo}</Text>
      <Progress.Bar progress={loading / 100.0} width={300} height={30} style={{borderRadius : 90}} color="#363841"/>
    </View>
  )
```

The line `export default EditApplet;` is exporting the `EditApplet` component as the default export
of the file. This means that when another file imports this file, they can import the `EditApplet`
component directly without having to specify its name. For example, in another file, you can write
`import EditApplet from './EditApplet';` to import the `EditApplet` component.

```typescript
export default EditApplet;
```

For more information about this file you can check his complete code here : [EditApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/EditApplet.tsx)

## [ExploreMyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ExploreMyApplets.tsx)

The component `ExploreMyApplets` is a screen where the user can explore his applets.

We start by importing the required modules and components :
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchApplet from '../components/Applets/SearchApplet';
```

Now we create the `ExploreMyApplets` page :
```typescript
const ExploreMyApplets = ()
```

The function returns a React component that renders a page for exploring applets.
The ExploreMyApplets component is returning a View component that contains a title and a SearchApplet component.

```Typescript
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
```

The `const styles = StyleSheet.create({ ... })` block is creating a JavaScript object that contains
style definitions for different components in the `ExploreMyApplets` component. Each key in the
object represents a component, and its value is an object that contains the style properties for that.

```Typescript
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 100,
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
```

`export default ExploreMyApplets;` is exporting the `ExploreMyApplets` component as the default
export of this module. This means that when another module imports this module, they can import the
`ExploreMyApplets` component directly without having to specify its name. For example, in another
module, you can import the `ExploreMyApplets` component like this: `import ExploreMyApplets from
'./ExploreMyApplets';`

```Typescript
    export default ExploreMyApplets;
```

For more information about this file you can check his complete code here : [ExploreMyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ExploreMyApplets.tsx)

## [Home.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Home.tsx)

The component `Home` is a screen where the user can see all the services.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Alert, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
```

Now we create the `Home` page :
The Home component is a React component that fetches and displays a list of applets, allowing the user to search and filter the applets by name.
`navigation` is a prop passed to the `Home` component that allows navigation between screens in a navigation stack. It is used to navigate to the "Service" screen when a `ServiceCard` component is pressed.
The Home component is returning a JSX element that represents the structure and content of the component. It includes a View component with styles.container, which contains a View component with styles.input and a FormInput component for searching. It also includes a ScrollView component with a height of 800, which contains a View component with styles.services. Inside the View  component, there is a mapping of the dispApplets array.
```typescript
const Home = ({ navigation})
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `applets` : the applets of the user
* `dispApplets` : the applets to display

```typescript
const [applets, setApplets] = useState([]);
const [dispApplets, setDispApplets] = useState([]);
```

Then we fetch and set the applets when the component mounts using a useEffect hook.
```typescript
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
```

We create also the function `filterApplets` that filters an array of applets based on a given name and updates the displayed applets accordingly.
It used `name` as parameter, it's a string representing the name of the applet to filter, and return the filtered array of applets that match the given name.
```typescript
const filterApplets = (name : string) => {
    if (applets == null) return;
    let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
    setDispApplets(tmp);
  }
```
The function "displayApplets" maps over an array of applets and returns a JSX element for each applet.
```typescript
const displayApplets = () => {
    if (dispApplets == null) return;
    return dispApplets.map((service) => (
      <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('Service', { slug: service.slug })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
    ));
  };
```

The `return` statement is returning a JSX element that represents the structure and content of the
Home component.

```typescript
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
```

The code `const styles = StyleSheet.create({ ... })` is creating a JavaScript object called `styles`
using the `StyleSheet.create` method from the `react-native` library. This object contains multiple
style definitions for different components or elements in the `Home` component.

```typescript
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
```

`export default Home;` is exporting the `Home` component as the default export of this module. This
means that when another module imports this module, they can import the `Home` component directly
without having to specify its name. For example, in another module, we can import the `Home`
component like this: `import Home from './Home';`.
```typescript
export default Home;
```

For more information about this file you can check his complete code here : [Home.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Home.tsx)

## [InfoScreen.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/InfoScreen.tsx)

The component `InfoScreen` is a screen where the user can see the information of a service.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import {Alert, Text, View, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction} from '../api/ServiceInfo';
import * as WebBrowser from 'expo-web-browser';
```

The `InfoService` function is a React component that displays information about a service. It takes
two props, `navigation` and `route`, which are provided by React Navigation.
Now we create the `InfoScreen` page :
```typescript
const InfoScreen = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `slug`: the slug of the service
* `color`: the color of the service
* `url`: the url of the service logo
* `name`: the name of the service
* `link`: the link of the service
* `desc` : the description of the service

```typescript
  const { slug } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
```

Now we can create the function `openPage`, this is an asynchronous function that tries to open a browser using the
`WebBrowser.openBrowserAsync` method and displays an error message if it fails.

```typescript
  const openPage = async () => {
    try {
      await WebBrowser.openBrowserAsync(link);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `slug` variable changes.
The function fetchData fetches data from a service and sets various state variables based on the fetched data.

```typescript
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const service = await ServiceInfo(slug);
        (service.decoration.backgroundColor) ? setColor(service.decoration.backgroundColor) : null;
        (service.decoration.logoUrl != "") ? setUrl(service.decoration.logoUrl) : null;
        setName(service.name);
        setDesc(service.decoration.description);
        setLink(service.decoration.websiteUrl);
      } catch (error) {
        console.error("Erreur lors de l'appel de ServiceInfo:", error);
      }
    };

    fetchData();
  }, [slug]);
```

The `return` statement in the `InfoService` component is returning a JSX (JavaScript XML)
expression that represents the structure and content of the component's rendered output.

```typescript
return (
    <View>
      <View style={[{ backgroundColor: color }, styles.container]}>
        <TopBar title="Explore" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} />
        <Image source={{ uri: url, cache: 'force-cache' }} style={styles.logo} />
        <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
        <View style={styles.info}>
            <Text style={[styles.desc, { color: getWriteColor(color) }]}>{desc}</Text>
            <TouchableOpacity style={[{backgroundColor: getWriteColor(color)}, styles.button]} onPress={openPage}>
                <Text style={[{color: color}, styles.buttonText]}>Visit {name}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.

```typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: '15%',
    width: 100,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 30,
    height: '100%',
    shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  button : {
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    padding: 10,
    borderRadius: 90,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    alignItems: 'center',
  },
  desc: {
    width: '70%',
    justifyContent: 'center',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 40,
  },
  action: {
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 250,
  }
});
```

The line `export default InfoService;` is exporting the `InfoService` component as the default
export of the module. This allows other modules to import and use the `InfoService` component by
using the `import InfoService from './InfoService';

```typescript
export default InfoScreen;
```

For more information about this file you can check his complete code here : [InfoScreen.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/InfoScreen.tsx)


## [Login.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Login.tsx)

The component `Login` is a screen where the user can log in.
The code is defining a functional component called `Login` that takes a parameter `navigation`. The
`navigation` parameter is likely being passed from a parent component and is used for navigating
between screens in a React Native application.

We start by importing the required modules and components :
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import ServerModal from '../components/ServerModal';
import LoginAPI from '../api/Login';
import AutoLoginAPI from '../api/AutoLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from '../api/LoginService';
```

Now we create the `Login` page :
```typescript
const Login = ({ navigation })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `email` : the email of the user
* `password` : the password of the user

The `useEffect` hook in React is used to perform side effects in functional components. In this
code, the `useEffect` hook is used to automatically log in a user if they have already been
authenticated.

```typescript
useEffect(() => {

        const clearStorage = async () => {
          await AsyncStorage.setItem('action', "default");
          await AsyncStorage.setItem('reaction', "[]");
        }

        clearStorage();
        /**
         * The function `autoLogin` checks if the response from the `AutoLoginAPI` is true and
         * navigates to the 'Area 51' page if it is.
         */
        const autoLogin = async () => {
            const response = await AutoLoginAPI();
            if (response == true) {
                navigation.navigate('Area 51');
            }
          }
          autoLogin();
    }, [])
```

We can create a function `connect` now.
The function `connect` logs in a user using the LoginAPI, displays an alert if there is an error, navigates to the 'Area 51' page if the login is successful, and displays an alert with the response message if the login is unsuccessful.

```typescript
    const connect = async () => {
        const response = await LoginAPI(email, password);
        if (response == null) {
            alert("An Error occcur");
        } else if (response.status == 200) {
            navigation.navigate('Area 51');
        } else {
            alert("Error " + response.status + "\n" + response.message);
        }
    }
```

The `return` statement in the code is returning a JSX element that represents the UI of the
`Login` component. It is a composition of various React Native components such as `View`,
`Text`, `FormInput`, and `SubmitButton`.

```typescript
return (
        /* The code is returning a JSX element that contains other JSX elements. */
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <ServerModal />
          </View>
          <View style={{marginVertical: 20}}/>
          <View style={styles.form}>
            <Text style={styles.login}>Log in</Text>
            <FormInput title="Email" icon={{ name: "mail", width: 27, height: 27 }} onChangeText={setEmail} />
            <FormInput title="Password" secure={true} icon={{ name: "lock", width: 27, height: 27 }} onChangeText={setPassword} />
            <SubmitButton title="Log in" onPress={connect} />
            <View style={{marginVertical: 5, flexDirection: 'row'}}>
              <Text style={styles.sub} onPress={() => navigation.navigate('SignUp')} >No account ? </Text>
              <Text style={[styles.sub, { textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('SignUp')} >Sign up here</Text>
            </View>
            <Text style={styles.or}>or</Text>
            <SubmitButton title="Log in with Google" icon={{ uri: require('../assets/icon/google.png'), width: 27, height: 27 }} onPress={async () => (await LoginService("google")) ? navigation.navigate("Area 51") : null}/>
          </View>
        </View>
    )
```

The `const styles = StyleSheet.create({ ... })` block is creating a JavaScript object that contains
style definitions for different components in the `Login` component. Each key in the object
represents a component, and its value is an object that contains the style properties for that
component.

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  form : {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  forgot : {
    color: '#363841',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: "700",
  },
  or : {
    color: '#363841',
    fontSize: 30,
    fontStyle: 'normal',
    marginVertical: 30,
    fontWeight: "700",
  },
  login : {
    color: '#363841',
    marginTop: 50,
    marginBottom: 30,
    fontSize: 54,
    fontStyle: 'normal',
    fontWeight: "700",
  },
  sub : {
    color: '#363841',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "700",
  },
});
```

The line `export default Login;` is exporting the `Login` component as the default export of the
module. This allows other modules to import and use the `Login` component by using the `import
Login from './Login';` statement.

```typescript
export default Login;
```

For more information about this file you can check his complete code here : [Login.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Login.tsx)

## [MyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/MyApplets.tsx)

The component `MyApplets` is a screen where the user can see his applets.

We start by importing the required modules and components :
```typescript
import React, { useEffect, useState, useCallback } from "react";
import { View, StatusBar, StyleSheet, RefreshControl } from "react-native";
import AppletInfoContainer from "../components/Applets/AppletInfoContainer";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";
import { getWriteColor } from "../components/ActionCard";
import AppletInfos from "../api/AppletInfos";
import ServiceInfo from "../api/ServiceInfo";
```

The code defines a functional component called `MyApplet`. It takes two props, `navigation` and
`route`, which are provided by the React Navigation library.
Now we create the `MyApplets` page :
```typescript
const MyApplets = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `bgColor` : the background color of the service
* `dataApplet` : the data of the applet
* `id` : the id of the applet
* `statusBarHeight` : the height of the status bar
* `refreshing` : the refreshing state of the page

```typescript
const [bgColor, setBgColor] = useState('');
const [dataApplet, setDataApplet] = useState(null);
const { id } = route.params;
const [statusBarHeight, setStatusBarHeight] = useState(0);
const [refreshing, setRefreshing] = useState<boolean>(false); // State to store refreshing state
```

The `onRefresh` function is a callback function that is used as the `onRefresh` prop for the
`RefreshControl` component in the `ScrollView`. It is called when the user pulls down on the
screen to refresh the page. It fetches the applet data and sets the `dataApplet` state variable
with the fetched data.

```typescript
    const onRefresh = useCallback(async () => {
		setRefreshing(true);
        setDataApplet(null);
		await dataFetch();
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	}, []);
```

The `useEffect` hook is used to perform side effects in a functional component. In this case,
the `useEffect` hook is used to add a listener to the navigation focus event and to get the
status bar height.

```typescript
    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            dataFetch();
        });
      const getStatusbarHeight = () => {
        setStatusBarHeight(StatusBar.currentHeight + 20 || 0);
      };

      getStatusbarHeight();
    }, []);
```

The function `dataFetch` is an asynchronous function that fetches data using the `AppletInfos`
function and sets the fetched data to the `dataApplet` state variable.

```typescript
    const dataFetch = async () => {
        try {
            const data = await AppletInfos(id);
            setDataApplet(data);
        } catch (error) {
            console.error(error);
        }
    };
```

The `useEffect` hook is used to perform side effects in a functional component. In this case,
the `useEffect` hook is used to call the `dataFetch` function whenever the `id` dependency
changes.

```typescript
useEffect(() => {
    dataFetch();
}, [id]);
```

The `useEffect` hook is used to perform side effects in a functional component. In this case,
the `useEffect` hook is used to fetch data from the `ServiceInfo` API and set the background
color based on the fetched data.

```typescript
useEffect(() => {
        if (dataApplet) {
            const dataFetch = async (slug : string) => {
                try {
                    const data = await ServiceInfo(slug);
                    setBgColor(data?.decoration?.backgroundColor);
                } catch (error) {
                    console.error(error);
                }
            };
            dataFetch(dataApplet?.data?.actionSlug.split('.')[0]);
        }
    }, [dataApplet]);
```

The `useEffect` hook is used to perform side effects in a functional component. In this case,
the `useEffect` hook is used to check if the `bgColor` state variable is `undefined`. If it is
`undefined`, the function returns early and does not perform any further actions. This can be
useful for handling certain conditions or preventing unnecessary code execution.

```typescript
useEffect(() => {
    if (bgColor === undefined)
        return;
}, [bgColor]);
```

The code is returning a JSX (JavaScript XML) structure that represents the UI of the `MyApplet`
component.

```typescript
    return (
        <ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		  }>
            <View style={{ ...styles.container, backgroundColor: bgColor.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : bgColor, paddingTop: statusBarHeight }}>
                <TopBar title=""  iconLeft='arrow-back' onPressLeft={() => navigation.goBack()} color={getWriteColor(bgColor)} iconRight='settings' onPressRight={() => navigation.navigate("EditApplet", {id : id})} />
            </View>
            <View>
                {dataApplet &&
                    <AppletInfoContainer
                        name={dataApplet?.data?.name}
                        color={bgColor}
                        actionSlug={dataApplet?.data?.actionSlug}
                        reactionsList={dataApplet?.data?.reactions}
                        user={dataApplet?.data?.user?.username}
                        enabled={dataApplet?.data?.enabled}
                        createdAt={dataApplet?.data?.createdAt}
                        id={dataApplet?.data?.id}
                        notif={dataApplet?.data?.notifUser}
                    />
                }
            </View>
        </ScrollView>
    );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.

```typescript
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
        paddingRight: 10,
      },
});
```

The line `export default MyApplets;` is exporting the `MyApplets` component as the default export
of the module. This allows other modules to import and use the `MyApplets` component by using the
`import MyApplets from './MyApplets';` statement.

```typescript
export default MyApplets;
```

For more information about this file you can check his complete code here : [MyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/MyApplets.tsx)


## [Profile.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Profile.tsx)

The component `Profile` is a screen where the user can see his profile.

We start by importing the required modules and components :
```typescript
import React, { useState, useEffect } from "react";
import { Text, Alert, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosAPI from "../api/UserInfos";
import ProfileForm from "../components/ProfileForm";
import SVGImg from '../assets/svg/iconProfile.svg'
import PatchUser from "../api/PatchUser";
import ServiceLogo from "../components/ServiceLogo";
import Services, {Applet} from "../api/Services";
import OAuthLogin from "../api/OAuth";
import OAuthLogout from "../api/OAuthLogout";
import DeleteUser from "../api/DeleteUser";
import DeleteAccount from "../components/DeleteAccount";
```

We can create the `Profile` page :
The above code is a TypeScript React component called "Profile". It is responsible for rendering a
user profile screen.

```typescript
const Profile = ({ navigation })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `data` : the data of the user
* `username` : the username of the user
* `email` : the email of the user
* `loading` : the loading state of the page
* `reload` : the reload state of the page
* `services` : the services of the user
* `servicesCon` : the services connected of the user

```typescript
  const [data, setData] = useState<any>([]);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [services, setServices] = useState<string[]>([]);
  const [servicesCon, setServicesCon] = useState<string[]>([]);
```

The function `orderByFirstConnected` takes two arrays, `connected` and `allserv`, and returns a
new array that contains the elements from `connected` followed by the elements from `allserv` that
are not already in `connected`. The `connected` parameter is an array of strings representing the services that are currently connected.
The `allserv` parameter is an array of all available servers.
The function `orderByFirstConnected` returns an array of strings.

```typescript
const orderByFirstConnected = (connected : string[], allserv : string[]) => {
    let tmp : string[] = [];
    for (let i = 0; i < connected.length; i++) {
      if (allserv.includes(connected[i])) {
        tmp.push(connected[i]);
      }
    }
    for (let i = 0; i < allserv.length; i++) {
      if (!tmp.includes(allserv[i])) {
        tmp.push(allserv[i]);
      }
    }
    return tmp;
  }
```

The `useEffect` hook in this code is used to fetch user information from an API and update the
component's state with the retrieved data.
The function fetchData is an asynchronous function that retrieves user information from an API using a token and server address stored in AsyncStorage, and updates the state with the retrieved data.
In this code, the function `fetchData` is being defined as an asynchronous function. It
tries to fetch the server address and token from AsyncStorage using `await
AsyncStorage.getItem()`. If either the token or server address is missing, it navigates to the
'Login' screen and returns.

```typescript
useEffect(() => {
    const fetchData = async () => {
      try {
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const token = await SecureStore.getItemAsync('token_api');

        if (!token || !serverAddress) {
          navigation.navigate('Login');
          return;
        }
        const response = await UserInfosAPI(token, serverAddress);
        setData(response.data);
        const serv : Applet[] = await Services();
        let tmp : string[] = [];
        for (let i = 0; i < serv.length; i++) {
          if (serv[i].hasAuthentification)
            tmp.push(serv[i].slug);
        }
        setServicesCon(response.data.connectedServices);
        setServices(orderByFirstConnected(response.data.connectedServices, tmp));
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('email', response.data.email);
        setLoading(false); // Mettez à jour l'état de chargement une fois les données disponibles
        setReload(false);
      } catch (error) {
        console.error(error);
        setLoading(false); // Mettez à jour l'état de chargement en cas d'erreur
      }
    };

    fetchData();
  }, [reload]);
```

The function `handleLogout` deletes the 'token_api' item from SecureStore and navigates to the 'Login' screen.
```typescript
const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
```

The function `handleDelete` deletes a user, removes a token from SecureStore, and navigates to the Login screen in a React Native app.
```typescript
  const handleDelete = async () => {
    try {
      await DeleteUser();
      await SecureStore.deleteItemAsync('token_api');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
```

The function handles a button press event, retrieves user data from AsyncStorage, updates the
user's profile using an API call, stores the API token in SecureStore, and displays success or
error messages.

```typescript
const handlePress = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      const res = await PatchUser(email, null, null, username);
      await SecureStore.setItemAsync('token_api', res.data);
      if (!res) {
        Alert.alert('Error', 'An error occurred while updating your profile.');
      }
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      Alert.alert('Success', 'Your profile has been updated.');
    } catch (error) {
      console.error(error);
    }
  };
```

The function `displayServices` maps over an array of services and returns a JSX element for each
service, either with an `onPress` function that logs out of the service if it is included in
`servicesCon`, or with an `onPress` function that logs into the service if it is not included in
`servicesCon`. The function `displayServices` returns an array of JSX elements.
```typescript
const displayServices = () => {
    if (services == undefined || services == null) return;
    return services.map((service) => ((servicesCon.includes(service)) ?
      <ServiceLogo key={service} slug={service} onPress={ async () =>  {await OAuthLogout(service); setReload(true)}} />
      : <ServiceLogo key={service} slug={service} onPress={async () => {await OAuthLogin(service); setReload(true)}} disabled={true}/>
    ));
  };
```

The `return` statement in the code is rendering the JSX elements that make up the Profile
component.
```typescript
return (
    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" /> // Affichez un indicateur de chargement pendant le chargement des données
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        style={{height: Dimensions.get('window').height - 100, width: Dimensions.get('window').width, paddingHorizontal: 30}}
      >
        <View style={styles.profilePicture}>
          <SVGImg width={150} height={150} />
        </View>
          <ProfileForm data={data} />
        <Button
          mode="contained"
          onPress={ handlePress }
          style={[
            styles.button,
            username === data.username && email === data.email && styles.disabledButton,
          ]}
          disabled={username === data.username && email === data.email}
        >
          Apply changes
        </Button>
        <View style={styles.separator} />
        <View style={styles.userInfo}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Connected accounts</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {displayServices()}
          </ScrollView>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
        >
            <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <DeleteAccount />
      </ScrollView>
    )}
    </View>
  );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from
React Native. Each key in the object represents a style name, and its value is an object that
defines the specific style properties for that name.
```typescript
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  profilePicture: {
    marginTop: Dimensions.get('window').height / 20, // Marge en haut de l'avatar pour l'espace entre l'image et le texte
    marginBottom: (Dimensions.get('window').height / 5 - 75) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: '#363841',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  userInfo: {
    marginHorizontal: 10, // Marge à gauche de l'avatar pour l'espace entre l'image et le texte
  },
  title: {
    fontSize: 20, // Taille de la police pour le titre
    fontWeight: 'bold', // Texte en gras pour le titre
    color: '#363841',
  },
  subtitle: {
    fontSize: 16, // Taille de la police pour le nom d'utilisateur
    fontWeight: 'bold', // Texte en gras pour le nom d'utilisateur
    color: '#363841',
  },
  link: {
    color: '#00C2FF',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 0.5, // Hauteur de la ligne
    backgroundColor: '#6D6D6D', // Couleur de la ligne
    marginVertical: 15, // Marge verticale pour l'espace autour de la ligne
    opacity: 0.5, // Opacité de la ligne
  },
  logout: {
    color: '#363841',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
```

The line `export default Profile;` is exporting the `Profile` component as the default export of
the module. This allows other modules to import and use the `Profile` component by using the
`import Profile from './Profile';` statement.

```typescript
export default Profile;
```

For more information about this file you can check his complete code here : [Profile.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Profile.tsx)

## [SearchServices.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SearchServices.tsx)

The component `SearchServices` is a screen where the user can search services.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import TopBar from '../components/TopBar';
```

The code defines a functional component called `SearchServices`. It takes in two props, `navigation`
and `route`, which are provided by React Navigation.
Now we create the `SearchServices` page :
```typescript
const SearchServices = ({ navigation })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `applets` : the applets of the user
* `dispApplets` : the applets displayed of the user

```typescript
  const [applets, setApplets] = useState([]); // State to store applets
  const [dispApplets, setDispApplets] = useState([]); // State to store applets
  const { type, actionInput, reactionInput, index }  = route.params;
```

The `useEffect` hook is used to perform side effects in functional components. In this case, the
`useEffect` hook is used to fetch applets from a service and set them in state. The function fetchApplets fetches applets from a service and sets them in state.
```typescript
    useEffect(() => {
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
```

The function `filterApplets` filters an array of applets based on a given name and updates the
displayed applets accordingly. The `name` parameter is a string representing the name of the applet to filter.
```typescript
  const filterApplets = (name : string) => {
    if (applets == null) return;
    let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
    setDispApplets(tmp);
  }
```

The code is creating a new constant variable called `filteredApplets`. It checks if the
`dispApplets` variable is null or undefined. If it is, then `filteredApplets` is set to null.
Otherwise, it filters the `dispApplets` array based on the conditions inside the `filter`
function.

```typescript
const filteredApplets = (dispApplets == null) ? null : dispApplets.filter((service) => {
    if (type === "action") return service.action === true;
    if (type === "reaction") return service.reaction === true;
    return true; // Include all applets if type is not specified
  });
```

This code block is rendering the JSX elements that make up the UI of the `SearchServices`
component.

```typescript
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
```

The `const styles` variable is an object that contains style definitions for different components in
the `SearchServices` component. Each key in the object represents a component, and its value is
another object that contains the specific styles for that component.

```Typescript
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
```

The line `export default SearchServices;` is exporting the `SearchServices` component as the
default export of the module. This allows other modules to import and use the `SearchServices`
component by using the `import SearchServices from './SearchServices';` statement.

```typescript
export default SearchServices;
```

For more information about this file you can check his complete code here : [SearchServices.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SearchServices.tsx)

## [SearchServicesEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SearchServicesEdit.tsx)

The component `SearchServices` is a screen where the user can search services.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import TopBar from '../components/TopBar';
```

The code defines a functional component called `SearchServices`. It takes in two props, `navigation`
and `route`, which are provided by React Navigation.
Now we create the `SearchServices` page :
```typescript
const SearchServices = ({ navigation })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `applets` : the applets of the user
* `dispApplets` : the applets displayed of the user

```typescript
  const [applets, setApplets] = useState([]); // State to store applets
  const [dispApplets, setDispApplets] = useState([]); // State to store applets
  const { id, type, actionInput, reactionInput, index }  = route.params;
```

The `useEffect` hook is used to perform side effects in functional components. In this case, the
`useEffect` hook is used to fetch applets from a service and set them in state. The function fetchApplets fetches applets from a service and sets them in state.
```typescript
    useEffect(() => {
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
```

The function `filterApplets` filters an array of applets based on a given name and updates the
displayed applets accordingly. The `name` parameter is a string representing the name of the applet to filter.
```typescript
  const filterApplets = (name : string) => {
    if (applets == null) return;
    let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
    setDispApplets(tmp);
  }
```

The code is creating a new constant variable called `filteredApplets`. It checks if the
`dispApplets` variable is null or undefined. If it is, then `filteredApplets` is set to null.
Otherwise, it filters the `dispApplets` array based on the conditions inside the `filter`
function.

```typescript
const filteredApplets = (dispApplets == null) ? null : dispApplets.filter((service) => {
    if (type === "action") return service.action === true;
    if (type === "reaction") return service.reaction === true;
    return true; // Include all applets if type is not specified
  });
```

This code block is rendering the JSX elements that make up the UI of the `SearchServices`
component.

```typescript
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
                <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('ServiceTemplateEdit', {id: id, slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
```

The `const styles` variable is an object that contains style definitions for different components in
the `SearchServices` component. Each key in the object represents a component, and its value is
another object that contains the specific styles for that component.

```Typescript
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
```

The line `export default SearchServices;` is exporting the `SearchServices` component as the
default export of the module. This allows other modules to import and use the `SearchServices`
component by using the `import SearchServices from './SearchServices';` statement.

```typescript
export default SearchServices;
```

For more information about this file you can check his complete code here : [SearchServicesEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SearchServicesEdit.tsx)

## [Service.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Service.tsx)

The component `Service` is a screen where the user can see the service information.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import {Alert, Text, View, StatusBar, Image, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';
```

Now we create a function that will return the color use to write depending of the theme :
The `getWriteColor` function takes a color value and returns the appropriate text color (either black or white) based on the brightness of the background color.
It use a function call `getLuminance` that calculate the luminance of a given hex color by converting the color to its RGB components and applying a luminance formula. The resulting luminance value represents the brightness of the color, with higher values indicating brighter colors and lower values indicating darker colors.
The function calculates the luminance of a given hex color.
The `hexColor` parameter is a string representing a color in hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component, GG represents the green component, and BB represents the blue component of the color.

```typescript
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (attenuation) {
    if (luminance > 0.6) {
        return "#363841";
    } else {
        return "#D9D9D9";
    }
  } else {
    if (luminance > 0.6) {
      return "#000000";
    } else {
        return "#FFFFFF";
    }
  }
};
```

The `Service` component is a functional component that represents a screen in a React Native app. It
receives two props, `navigation` and `route`, from the React Navigation library.
Now we create the `Service` page :

```typescript
const Service = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `color` : the color of the service
* `url` : the url of the service logo
* `name` : the name of the service
* `action` : the actions of the service
* `reaction` : the reactions of the service

```typescript
  const { slug } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
```

The function `displayActions` returns an array of `ActionCard` components based on the `action` array, with each component having a unique key, name, description, color, and an `onPress` event
that navigates to the 'ConnectAuth' screen with specific parameters. The `displayActions` function is returning an array of `ActionCard` components.

```typescript
const displayActions = () => {
    return action.map((service) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('Create')}/>
    ));
  };
```

The function `displayReactions` maps over an array of `reaction` objects and returns an array of `ActionCard` components with specific props.
The `displayReactions` function is returning an array of `ActionCard` components. Each `ActionCard` component has a `key` prop set to the `slug` property of the `service` object, and also has `name`, `description`, `color`, and `onPress` props set based on the properties of the `service` object.

```typescript
  const displayReactions = () => {
    return reaction.map((service) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('Create')}/>
    ));
  }
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the effect is triggered when the `slug` variable changes. The function fetchData fetches data from a service and sets various state variables based on the fetched data.

```typescript
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const service = await ServiceInfo(slug);
        (service.decoration.backgroundColor) ? setColor(service.decoration.backgroundColor) : null;
        (service.decoration.logoUrl != "") ? setUrl(service.decoration.logoUrl) : null;
        setName(service.name);
        setAction(service.actions);
        setReaction(service.reactions);
      } catch (error) {
        console.error("Erreur lors de l'appel de ServiceInfo:", error);
      }
    };

    fetchData();
  }, [slug]);
```

The `return` statement in the `Service` component is returning a JSX expression that represents
the structure and content of the component's rendered output.

```typescript
  return (
    <View>
      {/* <StatusBar backgroundColor={color} /> */}
      <View style={[{ backgroundColor: color }, styles.container]}>
        <TopBar title="Explore" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='info' onPressRight={() => navigation.navigate("Info", {slug : slug})} />
        <Image source={{ uri: url, cache: 'force-cache' }} style={styles.logo} />
        <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.action}>
          {displayActions()}
          {displayReactions()}
        </View>
      </ScrollView>
    </View>
  );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.
```typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 30,
    shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  action: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingBottom: 250,
  }
});
```

The line `export default Service;` is exporting the `Service` component as the default export of
the module. This allows other modules to import and use the `Service` component by using the
`import Service from './Service';` statement.

```typescript
export default Service;
```

For more information about this file you can check his complete code here : [Service.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/Service.tsx)

## [ServiceTemplate.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ServiceTemplate.tsx)

The component `ServiceTemplate` is a screen where the user can select the action/Reaction from the service.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Service} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';
```

Now we create a function that will return the color use to write depending of the theme :
The `getWriteColor` function takes a color value and returns the appropriate text color (either black or white) based on the brightness of the background color.
It use a function call `getLuminance` that calculate the luminance of a given hex color by converting the color to its RGB components and applying a luminance formula. The resulting luminance value represents the brightness of the color, with higher values indicating brighter colors and lower values indicating darker colors.
The function calculates the luminance of a given hex color.
The `hexColor` parameter is a string representing a color in hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component, GG represents the green component, and BB represents the blue component of the color.

```typescript
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (attenuation) {
    if (luminance > 0.6) {
        return "#363841";
    } else {
        return "#D9D9D9";
    }
  } else {
    if (luminance > 0.6) {
      return "#000000";
    } else {
        return "#FFFFFF";
    }
  }
};
```

The `ServiceTemplate` function is a React component that renders a view for a specific service
template. It takes in `navigation` and `route` as props, which are provided by React Navigation. The
`route` prop contains the parameters passed to the component.
We start by creating the `ServiceTemplate` page :

```typescript
const ServiceTemplate = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `color` : the color of the service
* `url` : the url of the service logo
* `name` : the name of the service
* `action` : the actions of the service
* `reaction` : the reactions of the service

```typescript
  const { slug, type, actionInput, reactionInput, index } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
```

The function `displayActions` maps over an array of actions and returns an array of `ActionCard` components with specific props. The `displayActions` function is returning an array of `ActionCard` components.

```typescript
  const displayActions = () => {
    return action.map((service: any) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuth', { slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index})}/>
    ));
  };
```

The function `displayReactions` maps over an array of `reaction` objects and returns an array of `ActionCard` components with specific props. The `displayReactions` function is returning an array of `ActionCard` components.

```typescript
  const displayReactions = () => {
    return reaction.map((service: any) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuth', { slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index })}/>
    ));
  }
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the `useEffect` hook is used to fetch data from a service and update the state variables
based on the fetched data. The function fetchData fetches data from a service and sets various state variables based on the fetched data.

```typescript
React.useEffect(() => {
    const fetchData = async () => {
      try {
        const service = await ServiceInfo(slug);
        setColor(service.decoration.backgroundColor);
        (service.decoration.logoUrl != "") ? setUrl(service.decoration.logoUrl) : null;
        setName(service.name);
        setAction(service.actions);
        setReaction(service.reactions);
      } catch (error) {
        console.error("Erreur lors de l'appel de ServiceInfo:", error);
      }
    };

    fetchData();
  }, [slug]);
```

The code block is rendering a view that contains a top bar, an image, and a text component. It
also includes a scroll view that contains a view with action cards.

```typescript
return (
    <View>
      {/* <StatusBar backgroundColor={color} /> */}
      <View style={[{ backgroundColor: color }, styles.container]}>
        <TopBar title="Create" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='close' onPressRight={() => navigation.navigate("Create")} />
        <Image source={{ uri: url, cache: 'force-cache' }} style={styles.logo} />
        <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
      </View>
      <ScrollView >
        <View style={styles.action}>
          {(type === "action") ? displayActions() : displayReactions()}
        </View>
      </ScrollView>
    </View>
  );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.

```typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 30,
    shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  action: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingBottom: 250,

  }
});
```

The line `export default ServiceTemplate;` is exporting the `ServiceTemplate` component as the
default export of the module. This allows other modules to import and use the `ServiceTemplate`
component by using the `import ServiceTemplate from './ServiceTemplate';` statement.

```typescript
export default ServiceTemplate;
```

For more information about this file you can check his complete code here : [ServiceTemplate.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ServiceTemplate.tsx)

## [ServiceTemplateEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ServiceTemplateEdit.tsx)

The component `ServiceTemplate` is a screen where the user can select the action/Reaction from the service.

We start by importing the required modules and components :
```typescript
import * as React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Service} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';
```

Now we create a function that will return the color use to write depending of the theme :
The `getWriteColor` function takes a color value and returns the appropriate text color (either black or white) based on the brightness of the background color.
It use a function call `getLuminance` that calculate the luminance of a given hex color by converting the color to its RGB components and applying a luminance formula. The resulting luminance value represents the brightness of the color, with higher values indicating brighter colors and lower values indicating darker colors.
The function calculates the luminance of a given hex color.
The `hexColor` parameter is a string representing a color in hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component, GG represents the green component, and BB represents the blue component of the color.

```typescript
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (attenuation) {
    if (luminance > 0.6) {
        return "#363841";
    } else {
        return "#D9D9D9";
    }
  } else {
    if (luminance > 0.6) {
      return "#000000";
    } else {
        return "#FFFFFF";
    }
  }
};
```

The `ServiceTemplate` function is a React component that renders a view for a specific service
template. It takes in `navigation` and `route` as props, which are provided by React Navigation. The
`route` prop contains the parameters passed to the component.
We start by creating the `ServiceTemplate` page :

```typescript
const ServiceTemplate = ({ navigation, route })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `color` : the color of the service
* `url` : the url of the service logo
* `name` : the name of the service
* `action` : the actions of the service
* `reaction` : the reactions of the service

```typescript
  const {id, slug, type, actionInput, reactionInput, index } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
```

The function `displayActions` maps over an array of actions and returns an array of `ActionCard` components with specific props. The `displayActions` function is returning an array of `ActionCard` components.

```typescript
  const displayActions = () => {
    return action.map((service: any) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuthEdit', { id: id, slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index})}/>
    ));
  };
```

The function `displayReactions` maps over an array of `reaction` objects and returns an array of `ActionCard` components with specific props. The `displayReactions` function is returning an array of `ActionCard` components.

```typescript
  const displayReactions = () => {
    return reaction.map((service: any) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuthEdit', {id: id,  slug: service.slug, type: type, actionInput : actionInput, reactionInput : reactionInput, index : index })}/>
    ));
  }
```

The `React.useEffect` hook is used to perform side effects in a functional component. In this
case, the `useEffect` hook is used to fetch data from a service and update the state variables
based on the fetched data. The function fetchData fetches data from a service and sets various state variables based on the fetched data.

```typescript
React.useEffect(() => {
    const fetchData = async () => {
      try {
        const service = await ServiceInfo(slug);
        setColor(service.decoration.backgroundColor);
        (service.decoration.logoUrl != "") ? setUrl(service.decoration.logoUrl) : null;
        setName(service.name);
        setAction(service.actions);
        setReaction(service.reactions);
      } catch (error) {
        console.error("Erreur lors de l'appel de ServiceInfo:", error);
      }
    };

    fetchData();
  }, [slug]);
```

The code block is rendering a view that contains a top bar, an image, and a text component. It
also includes a scroll view that contains a view with action cards.

```typescript
return (
    <View>
      {/* <StatusBar backgroundColor={color} /> */}
      <View style={[{ backgroundColor: color }, styles.container]}>
        <TopBar title="Create" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='close' onPressRight={() => navigation.navigate("Create")} />
        <Image source={{ uri: url, cache: 'force-cache' }} style={styles.logo} />
        <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
      </View>
      <ScrollView >
        <View style={styles.action}>
          {(type === "action") ? displayActions() : displayReactions()}
        </View>
      </ScrollView>
    </View>
  );
```

The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule.

```typescript
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 30,
    shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  action: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingBottom: 250,

  }
});
```

The line `export default ServiceTemplate;` is exporting the `ServiceTemplate` component as the
default export of the module. This allows other modules to import and use the `ServiceTemplate`
component by using the `import ServiceTemplate from './ServiceTemplate';` statement.

```typescript
export default ServiceTemplate;
```

For more information about this file you can check his complete code here : [ServiceTemplateEdit.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/ServiceTemplateEdit.tsx)


## [SignUp.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SignUp.tsx)

The component `SignUp` is a screen where the user can create an account.

We start by importing the required modules and components :
```typescript
import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import RegisterAPI from '../api/Register';
import ServerModal from '../components/ServerModal';
import LoginService from '../api/LoginService';
```

The code is defining a functional component called `Signup` that takes a parameter `navigation`. The
`navigation` parameter is likely being passed from a parent component and is used for navigating
between screens in a React Native application.
We can now create the `Signup` page :

```typescript
const Signup = ({ navigation })
```

The code is using the `React.useState` hook to define and initialize state variables.
Here is what is the state variables are used for :
* `email` : the email of the user
* `password` : the password of the user
* `username` : the username of the user

```typescript
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [username, setUsername] = React.useState('');
```

We can add the function `connect` that is an asynchronous function that makes a registration API call and handles the response accordingly.

```typescript
const connect = async () => {
      const response = await RegisterAPI(email, password, username);
      if (response == null) {
        alert("An Error occcur");
      } else if (response.status == 200) {
        navigation.navigate('Area 51');
      } else {
        alert(response.message);
      }
  }
```

The `return` statement in the `Signup` component is returning a JSX expression that represents
the structure and content of the component's rendered output.

```typescript
return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <ServerModal />
          </View>
          <View style={{marginVertical: 20}}/>
          <View style={styles.form}>
            <Text style={styles.login}>Sign up</Text>
            <FormInput title="Email" icon={{ name: "mail", width: 27, height: 27 }} onChangeText={setEmail} />
            <FormInput title="Username" icon={{ name: "person", width: 27, height: 27 }} onChangeText={setUsername} />
            <FormInput title="Password" secure={true} icon={{ name: "lock", width: 27, height: 27 }} onChangeText={setPassword} />
            <SubmitButton title="Sign up" onPress={connect} />
            <View style={{marginVertical: 5, flexDirection: 'row'}}>
              <Text style={styles.sub} onPress={() => navigation.navigate('Login')} >Already have an account? </Text>
              <Text style={[styles.sub, { textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('Login')} >Sign in</Text>
            </View>
            <Text style={styles.or}>or</Text>
            <SubmitButton title="Sign up with Google" icon={{ uri: require('../assets/icon/google.png'), width: 27, height: 27}} onPress={async () => (await LoginService("google")) ? navigation.navigate("Area 51") : null }/>
          </View>
        </View>
    )
```

The code is defining a JavaScript object called `styles` using the `StyleSheet.create()` method from
the React Native library. This object contains two properties: `container` and `login`.

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  or : {
    color: '#363841',
    fontSize: 30,
    fontStyle: 'normal',
    marginVertical: 30,
    fontWeight: "700",
  },
  login : {
    color: '#363841',
    marginBottom: 30,
    fontSize: 54,
    fontStyle: 'normal',
    fontWeight: "700",
  },
  form : {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  sub : {
    color: '#363841',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "700",
  },
});
```

The line `export default Signup;` is exporting the `Signup` component as the default export of
the module. This allows other modules to import and use the `Signup` component by using the
`import Signup from './Signup';` statement.

```typescript
export default Signup;
```

For more information about this file you can check his complete code here : [SignUp.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/screen/SignUp.tsx)

