import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {Input} from '../api/ServiceInfo'
import {Dict} from '../api/Placeholders'

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

interface IngredientsProps {
    input : Input;
    placeholders : Dict;
    type : string;
    color : string;
    onSelect : (text: string) => void;
    onChangeText : (text: string) => void;
}

const IngredientButton: React.FC<IngredientsProps>  = ({input, placeholders, type, color, onSelect, onChangeText}) => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const openDropdown = () => {
      setDropdownOpen(true);
    };

    const closeDropdown = () => {
      setDropdownOpen(false);
    };

    const getPlaceHolder = (placeholder: string) => {
        for (let x in placeholders) {
            if (placeholders[x] == placeholder) {
                return x;
            }
        }
        return "";
    }

    const displayPlaceHolders = () : string[] => {
      let strings = [];
      for (let x in placeholders) {
        strings.push(placeholders[x]);
      }
      return strings;
    }
    return (
      <View key={input.name} style={{marginVertical : 10, width:"100%"}}>
        <View >
          <TextInput value={value} placeholder={input.label} multiline={true} textBreakStrategy="highQuality" placeholderTextColor={getWriteColor(color, true)} onChangeText={(text) => {onChangeText(text); setValue(text)}} style={[styles.input, { backgroundColor: getWriteColor(getWriteColor(color, true)), color: getWriteColor(color, true) }]}/>
        </View>
        {(type == "reaction") ? <View style={{alignSelf: "flex-end", marginRight : "15%"}} >
          {(!dropdownOpen) ? (
          <TouchableOpacity style={[{backgroundColor: getWriteColor(color)}, styles.ingredients]} onPress={openDropdown}>
            <Text style={[{color: color}, styles.buttoningr]}>Add Ingredients</Text>
          </TouchableOpacity>)
          : (
            <View style={[{backgroundColor: getWriteColor(color)}, styles.option]} >
                <SelectDropdown data={displayPlaceHolders()} onSelect={(text) => {onSelect(text); setValue(value + "{" + getPlaceHolder(text) + "}"); closeDropdown()}} buttonTextStyle={[{color: color}, styles.buttoningr]} buttonStyle={[{backgroundColor: 'transparent', margin: -5}]}/>
            </View>
          )}
        </View> : null}
     </View>
    )
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
        width: '50%',
        padding: 5,
        borderRadius: 10,
        marginBottom: 30,
    },
    ingredients : {
      padding: 5,
      marginVertical: 10,
      width: '50%',
      borderRadius: 10,
      marginBottom: 30,
    },
    option : {
        marginVertical: 10,
        width: 'auto',
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
      borderColor: '#D9D9D9',
      borderWidth: 1,
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


export default IngredientButton;
