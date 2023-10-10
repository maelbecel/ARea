import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Input} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionApi from '../api/Action';
import ReactionApi from '../api/Reaction';
import TokenApi from '../api/ServiceToken'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

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
const getWriteColor = (color: string): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  /**
   * The function calculates the luminance of a given hex color.
   * @param {string} hexColor - The `hexColor` parameter is a string representing a color in
   * hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component,
   * GG represents the green component, and BB represents the blue component of the color.
   * @returns The function `getLuminance` returns a number, which represents the luminance value of
   * the given hex color.
   */
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
  if (luminance > 0.6) {
      return "#000000";
  } else {
      return "#FFFFFF";
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
  const { slug, type, actionInput, reactionInput } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [inputs, setInput] = React.useState<Input[]>([]);
  const redirectUri = Linking.createURL("/oauth2/" + slug.split(".")[0]);
  const useUrl = Linking.useURL();
  const [loggedIn, setLoggedIn] = React.useState(false);
  let inputsResp = [];

  /* The `showForm` function is a helper function that generates a form based on the `inputs` array. */
  const showForm = () => {
   return inputs.map((input, index) => (
     <View key={input.name} style={{width:"100%"}}>
       <TextInput placeholder={input.label} onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}} style={[styles.input, { backgroundColor: getWriteColor(color) }]}/>
     </View>
   ));
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
    for (let i = 0; i < inputs.length; i++) {
      console.log("Form ", i, " : ", inputsResp[i])
      if (inputsResp[i] == null)
        return false;
    }
    console.log("All form fill")
    return true;
  }

  /**
   * The function `_openAuthSessionAsync` is an asynchronous function that retrieves a server address
   * and token from AsyncStorage, and then opens an authentication session using the WebBrowser API.
   */
  const _openAuthSessionAsync = async () => {
    try {
      const serverAddress = await AsyncStorage.getItem('serverAddress');
      const token = await TokenApi(slug.split(".")[0])
      let result = await WebBrowser.openAuthSessionAsync(
        `${serverAddress}/service/${slug.split(".")[0]}/oauth2?authToken=${token}&redirecturi=${redirectUri}`
      );
      console.log(result);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
  case, the effect is triggered when the `useUrl` variable changes. */
  React.useEffect(() => {
    if (useUrl && useUrl.includes(slug.split(".")[0])) {
      setLoggedIn(true);
    }
  }, [useUrl]);

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
      const actionSlug = await AsyncStorage.getItem("action");
      const infoInput = (type == "action") ? await ActionApi(slug) : await ReactionApi(slug, actionSlug);
      if (info == null) return;
      setInput(infoInput);
      setColor(info.decoration.backgroundColor);
      setUrl(info.decoration.logoUrl);
      setName(info.name);
      setAction(info.actions);
      setReaction(info.reactions);
      for (let i = 0; i < info.actions.length; i++) {
        inputsResp[i] = null;
      }
      isAllFormFill();
    }
    fetchServiceInfo();
  }, []);

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
      console.log( action.length, " Actions")
      console.log( reaction.length, " Reactions")
      console.log("Nothing look like this : ", slug)
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
      await _openAuthSessionAsync();
      await AsyncStorage.setItem(type, slug);
      if (type == "action")
        navigation.navigate("Create", {actionInput: inputsResp, reactionInput: reactionInput});
      else
        navigation.navigate("Create", {actionInput: actionInput, reactionInput: inputsResp});
    }
  }


  /* The above code is a TypeScript React component that renders a view with a top bar, an image, and
  some text. It checks if the variable "name" is not empty, and if it is not empty, it renders the
  view. The view has a background color based on the "color" variable, and it contains a top bar
  with a title, a left arrow icon, and a right close icon. It also displays an image with a source
  URL, and a text component with the value of the "name" variable. */
  if (name != "") {
    return (
      <View>
        <View style={[{ backgroundColor: color }, styles.container]}>
          <TopBar title="Create" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='close' onPressRight={() => navigation.navigate("Create")} />
          <Image source={{ uri: url }} style={styles.logo} />
          <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
        </View>
        <View style={[{ backgroundColor: color },styles.action]}>
          <Text style={[styles.name, { color: getWriteColor(color) }]}>{title}</Text>
          <Text style={[styles.desc, { color: getWriteColor(color) }]}>{description}</Text>
          {showForm()}
          <TouchableOpacity style={[{backgroundColor: getWriteColor(color)}, styles.button]} onPress={redirection}>
            <Text style={[{color: color}, styles.buttonText]}>Connection</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    width: '60%',
    padding: 10,
    borderRadius: 90,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
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
    textAlign: 'center',
    marginBottom: 40,
  },
  action: {
    paddingTop: 50,
    alignContent: "center",
    alignItems: "center",
    height: 1000,
  }
});


/* The line `export default ConnectAuth;` is exporting the `ConnectAuth` component as the default
export of the module. This means that when another module imports this module, it can access the
`ConnectAuth` component using the default import syntax, like `import ConnectAuth from
'./ConnectAuth';`. */
export default ConnectAuth;
