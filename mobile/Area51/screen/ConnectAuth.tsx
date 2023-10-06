import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction, Input} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionApi from '../api/Action';
import ReactionApi from '../api/Reaction';

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
  let inputsResp = [];

  const showForm = () => {
   return inputs.map((input, index) => (
     <View key={input.name} style={{width:"100%"}}>
       <TextInput placeholder={input.label} onChangeText={(text) => {inputsResp[index] = text; isAllFormFill()}} style={[styles.input, { backgroundColor: getWriteColor(color) }]}/>
     </View>
   ));
  }

  const isAllFormFill = () : boolean => {
    for (let i = 0; i < inputs.length; i++) {
      console.log("Form ", i, " : ", inputsResp[i])
      if (inputsResp[i] == null)
        return false;
    }
    console.log("All form fill")
    return true;
  }


  React.useEffect(() => {
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
      console.log( action.length, " Actions")
      console.log( reaction.length, " Reactions")
      console.log("Nothing look like this : ", slug)
    }
    findAction();
  }
  , [action, reaction]);

  const redirection = async () => {
    if (isAllFormFill()) {
      await AsyncStorage.setItem(type, slug);
      if (type == "action")
        navigation.navigate("Create", {actionInput: inputsResp, reactionInput: reactionInput});
      else
        navigation.navigate("Create", {actionInput: actionInput, reactionInput: inputsResp});
    }
  }


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


export default ConnectAuth;
