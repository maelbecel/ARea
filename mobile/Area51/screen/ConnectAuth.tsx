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
/**
 * The `getWriteColor` function takes a color value and returns the appropriate text color (either
 * black or white) based on the brightness of the background color.
 * @param {string} color - The `color` parameter is a string representing a color. It can be in any
 * valid CSS color format, such as hexadecimal (`#RRGGBB`), RGB (`rgb(r, g, b)`), or color names
 * (`red`, `blue`, etc.).
 * @returns The function `getWriteColor` returns a string representing the appropriate text color based
 * on the luminance of the background color. If the luminance is greater than 0.5, it returns "#000000"
 * (black), indicating that the text color should be dark. Otherwise, it returns "#FFFFFF" (white),
 * indicating that the text color should be light.
 */
const getWriteColor = (color: string, attenuation : boolean = false): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor : string = color.startsWith("#") ? color : `#${color}`;

  /**
   * The function calculates the luminance of a given hex color.
   * @param {string} hexColor - The `hexColor` parameter is a string representing a color in
   * hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component,
   * GG represents the green component, and BB represents the blue component of the color.
   * @returns The function `getLuminance` returns a number, which represents the luminance value of
   * the given hex color.
   */
  const getLuminance = (hexColor: string): number => {
      const r : number = parseInt(hexColor.slice(1, 3), 16);
      const g : number = parseInt(hexColor.slice(3, 5), 16);
      const b : number = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance : number = getLuminance(hexColor);

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

/* The above code is a TypeScript React component that renders a view for connecting to an
authentication service. It retrieves information about the service from an API and sets various
state variables based on the response. It also generates a form based on the inputs array and checks
if all form fields have been filled. If all form fields are filled, it opens an authentication
session using the WebBrowser API and navigates to a different screen based on the type of form. The
view includes a top bar with a title and icons for navigation, an image, and text components for
displaying the service name, action title, and description */
const ConnectAuth = ({ navigation, route }) => {
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

  /**
   * The function `displayTextForm` returns a React component that renders an IngredientButton with
   * specific props and handles the onChangeText and onSelect events.
   * @param {Input} input - The `input` parameter is an object that represents an ingredient. It likely
   * has properties such as `name`, `quantity`, and `unit`.
   * @param {number} index - The `index` parameter is a number that represents the index of the input
   * in the array of inputs. It is used to keep track of the position of the input in the array.
   * @returns a JSX element.
   */
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

  /* The above code is defining a function called `displayNumberForm` that takes two parameters:
  `input` and `index`. */
  const displayNumberForm = (input : any, index : number) => {
    return (
      <View key={input.name} style={{marginVertical : 10, width:"100%"}}>
        <View >
          <TextInput keyboardType='numeric' placeholder={input.label} textBreakStrategy="highQuality" placeholderTextColor={getWriteColor(color, true)} onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}} style={[styles.input, { backgroundColor: getWriteColor(getWriteColor(color, true)), color: getWriteColor(color, true) }]}/>
        </View>
     </View>
    )
  }

  /**
   * The function `displayOther` logs an error message with the unknown type and index, and returns
   * null.
   * @param {any} input - The `input` parameter is of type `any`, which means it can accept any data
   * type. It represents the value that needs to be displayed or processed.
   * @param {number} index - The `index` parameter is a number that represents the position or index of
   * the element in an array or collection. It is used to identify the specific element that is being
   * processed or accessed.
   * @returns The function `displayOther` is returning `null`.
   */
  const displayOther = (input : any, index : number) => {
    console.error("###############")
    console.error("Unknown type : ", input.type);
    console.error("At index : ", index);
    console.error("###############")
    return null;
  }

  /* The above code is a function called `displaySelectForm` that takes in two parameters: `input` and
  `index`. It is written in TypeScript and React. */
  const displaySelectForm = (input : any, index : number) => {
    if (!input.options) {
      return null;
    }
    inputsResp[index] = input.options[0];
    return (
      <View key={input.name} style={{marginVertical : 10, width:"100%"}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[styles.select, { color: getWriteColor(color), width: "30%" }]}>{input.label}:</Text>
          <SelectDropdown defaultValue={input.options[0]} data={input.options.sort((a : string, b : string) => a.toLowerCase().localeCompare(b.toLowerCase()))} searchPlaceHolder={input.label} onSelect={(text) => {inputsResp[index] = text; isAllFormFill()}} rowStyle={[{ backgroundColor: getWriteColor(color, true)}]} buttonStyle={{ borderRadius : 15, alignSelf: 'center', marginBottom : 10}}/>
        </View>
     </View>
    )
  }

  /**
   * The function "showForm" checks for errors and inputs, and then displays different types of forms
   * based on the input type.
   * @returns The function `showForm` returns a JSX element or an array of JSX elements.
   */
  const showForm = () => {
    if (error == false && inputs == null) {
      Alert.alert("Authentification Error", "An error occurred while trying to connect to the API")
      navigation.goBack();
      seterror(true);
      return null;
    } else if (inputs == null) return null;
    return inputs.map((input, index) => ((input.type == "TEXT" || input.type == "URL") ? displayTextForm(input, index) : (input.type == "NUMBER") ? displayNumberForm(input, index) : (input.type == "SELECT") ? displaySelectForm(input, index) : displayOther(input, index)))
  }

  /**
   * The function `isAllFormFill` checks if all the form inputs have been filled and returns true if
   * they have, and false if any input is null.
   * @returns The function `isAllFormFill` returns a boolean value. It returns `true` if all the
   * elements in the `inputsResp` array are not `null`, indicating that all the form fields have been
   * filled. It returns `false` if any element in the `inputsResp` array is `null`, indicating that
   * there are still empty form fields.
   */
  const isAllFormFill = () : boolean => {
    if (inputs == null) return false;
    for (let i : number = 0; i < inputs.length; i++) {
      if (inputsResp[i] == null || inputsResp[i] == "" || inputsResp[i] == undefined)
        return false;
    }
    return true;
  }

  /**
   * The function `isConnected` checks if a user is connected to a server and has authentication for a
   * specific service.
   * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a
   * specific service or API. It is used to check if the user is connected to that service or API.
   * @returns The function `isConnected` returns a Promise that resolves to a boolean value.
   */
  const isConnected = async (slug : string) : Promise<boolean> => {
    const serverAddress : string = await AsyncStorage.getItem('serverAddress');
    const token : string = await SecureStore.getItemAsync('token_api');


    if (!token || !serverAddress) {
      navigation.navigate('Login');
      return;
    }

    const response : any= await UserInfosAPI(token, serverAddress);
    const services : any[] = response.data.connectedServices;
    const hasAuth : boolean = (await AppletDetails(slug.split('.')[0])).data.hasAuthentification

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

  /**
   * The function `_openAuthSessionAsync` is an asynchronous function that opens an authentication
   * session using a server address, token, and redirect URI.
   * @returns The function `_openAuthSessionAsync` returns a boolean value. If the `result.type` is
   * "success", it returns `true`, otherwise it returns `false`.
   */
  const _openAuthSessionAsync = async () => {
    try {
      const serverAddress : string = await AsyncStorage.getItem('serverAddress');
      const token : string = await TokenApi(slug.split(".")[0])
      let result : WebBrowser.WebBrowserAuthSessionResult = await WebBrowser.openAuthSessionAsync(
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

  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
  case, the effect is triggered when the `useUrl` variable changes. */
  React.useEffect(() => {
    if (useUrl && useUrl.includes(slug.split(".")[0])) {
      setLoggedIn(true);
    }
  }, [useUrl]);

  /* The above code is a React useEffect hook that is used to perform side effects in a functional
  component. It is called when the component mounts for the first time (empty dependency array []). */
  React.useEffect(() => {
    /**
     * The function checks if the type is "reaction" and the actionSlug is "default", and if so, it
     * navigates to the "Create" screen, otherwise it calls the isConnected function.
     * @returns The function `callingAction` returns nothing (undefined).
     */
    const callingAction = async () => {
      const actionSlug : string = await AsyncStorage.getItem("action");
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

  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
  case, the effect is triggered when the component is mounted (since the dependency array `[]` is
  empty). */
  React.useEffect(() => {
    /**
     * The function fetchServiceInfo retrieves information from an API and sets various state variables
     * based on the response.
     * @returns The function `fetchServiceInfo` returns nothing (i.e., `undefined`).
     */
    const fetchServiceInfo = async () => {
      const info = await ServiceInfo(slug.split(".")[0])
      const actionSlug : string = await AsyncStorage.getItem("action");
      const infoInput : any[] = (type == "action") ? await ActionApi(slug) : await ReactionApi(slug, actionSlug);
      const placeHolders : Dict = (type == "action") ? null : await PlaceHolders(slug, actionSlug)

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
      for (let i : number = 0; i < info.actions.length; i++) {
        inputsResp[i] = null;
      }
      isAllFormFill();
    }
    fetchServiceInfo();
  }, [oAuthStatus]);

  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
  case, the effect is triggered when the `action` or `reaction` variables change. */
  React.useEffect(() => {
    /**
     * The function `findAction` searches for an action or reaction with a matching slug and sets the
     * title and description accordingly, or logs the number of actions and reactions and a message if
     * no match is found.
     * @returns The function `findAction` returns nothing.
     */
    const findAction = () => {
      for (let i : number = 0; i < action.length; i++) {
        if (action[i].slug == slug) {
          setTitle(action[i].name);
          setDescription(action[i].description);
          return;
        }
      }
      for (let i : number = 0; i < reaction.length; i++) {
        if (reaction[i].slug == slug) {
          setTitle(reaction[i].name);
          setDescription(reaction[i].description);
          return;
        }
      }
    }
    findAction();
  }
  , [action, reaction]);

  /**
   * The function `redirection` checks if all form fields are filled, opens an authentication session,
   * sets an item in AsyncStorage, and navigates to a different screen based on the type of form.
   */
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


  /* The above code is a TypeScript React component that renders a view with a top bar, an image, and
  some text. It checks if the variable "name" is not empty, and if it is not empty, it renders the
  view. The view has a background color based on the "color" variable, and it contains a top bar
  with a title, a left arrow icon, and a right close icon. It also displays an image with a source
  URL, and a text component with the value of the "name" variable. */
  if (name != "") {
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
else {
  return (
    <View style={{backgroundColor: color, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={getWriteColor(color)} />
    </View>
  )
}
};

/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule. */
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


/* The line `export default ConnectAuth;` is exporting the `ConnectAuth` component as the default
export of the module. This means that when another module imports this module, it can access the
`ConnectAuth` component using the default import syntax, like `import ConnectAuth from
'./ConnectAuth';`. */
export default ConnectAuth;
