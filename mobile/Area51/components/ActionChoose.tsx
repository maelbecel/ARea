/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import ServiceInfo, {Service, Action, Reaction} from '../api/ServiceInfo';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* The `interface CardProps` is defining a new interface called `CardProps` that extends the
`TouchableOpacityProps` interface. It specifies the expected props for the `ActionCard` component. */
interface CardProps extends TouchableOpacityProps {
    slug    : string;
    type    : string;
    onPress : () => void;
    onPressCross ?: () => void;
}

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

/**
 * The function `getServiceFromSlug` takes a slug as input and returns the service name by splitting
 * the slug at the first occurrence of a period.
 * @param {string} slug - A string representing a slug.
 * @returns the service name extracted from the given slug.
 */
const getServiceFromSlug = (slug: string): string => {
    const service = slug.split(".")[0];
    return service;
}

/**
 * The function `getActionName` takes in a `Service` object and a `slug` string, and returns the name
 * of the action or reaction that matches the given slug.
 * @param {Service} info - The `info` parameter is of type `Service`, which likely represents some
 * information about a service or platform. It could contain properties like `actions` and `reactions`,
 * which are arrays of objects representing different actions and reactions available in the service.
 * @param {string} slug - The `slug` parameter is a string that represents the unique identifier of an
 * action or reaction.
 * @returns The function `getActionName` returns a string.
 */
const getActionName = (info : Service, slug: string): string => {
    let i : number = 0;
    if (info == null)
        return "";
    while (info.actions[i]) {
        if (info.actions[i].slug === slug) {
            return info.actions[i].name;
        }
        i++;
    }
    i = 0;
    while (info.reactions[i]) {
        if (info.reactions[i].slug === slug) {
            return info.reactions[i].name;
        }
        i++;
    }
    return "";
}

/**
 * The function `ActionCard` returns a React component that renders a TouchableOpacity with a
 * background color based on the name prop, and a Text component with a color based on the background
 * color.
 * @param {string} name - The name parameter is a string that represents the name of the action card.
 * It could be any text that you want to display on the action card.
 * @param {any} onPress - The `onPress` parameter is a function that will be called when the
 * `TouchableOpacity` component is pressed. It is typically used to handle the action or event that
 * should occur when the component is pressed.
 * @returns a TouchableOpacity component with a View and Text component inside. The TouchableOpacity
 * component has an onPress event handler and a style prop that sets the background color based on the
 * value of the name parameter. The Text component has a style prop that sets the color based on the
 * result of the getWriteColor function. The Text component displays the value of the name parameter.
 */
const ActionCard = (name : string, onPress : any) => {
    if (name === "Action") {
        var color = "#D9D9D9"
    } else {
        var color = "#363841"
    }
    return (
        <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.container]}>
            <View>
                <Text style={[styles.area, {color: getWriteColor(color)}]}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

/* The `ActionChoose` function is a React functional component that renders an action card based on the
provided `type`, `slug`, and `onPress` props. */
const ActionChoose: React.FC<CardProps> = ({ type, slug , onPress, onPressCross=null }) => {
    const [info, setInfo] = React.useState<any>(null);
    const [action, setAction] = React.useState<string>("");

    /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
    case, the `useEffect` hook is being used to fetch data and update the component's state based on
    the `type` and `slug` props. */
    React.useEffect(() => {
      if (type !== 'action' && type !== 'reaction' && slug === "default") {
        return;
      }
      const fetchData = async () => {
        if (slug === "default") {
            return;
        }
        try {
          const serviceInfo = await ServiceInfo(getServiceFromSlug(slug));
          setInfo(serviceInfo);
          setAction(getActionName(serviceInfo, slug));
        } catch (error) {
          console.error("Error while getting info : ", error);
        }
      };

      fetchData();
    }, [type, slug]);

    /* The code block is checking if the `type` prop is equal to `'action'` and the `slug` prop is
    equal to `"default"`. If this condition is true, it returns an `ActionCard` component with the
    name `'Action'` and the `onPress` prop. */
    if (type === 'action' && slug === "default") {
      return ActionCard('Action', onPress);
    } else if (type === 'reaction' && slug === "default") {
      return ActionCard('Reaction', onPress);
    }

    /* The line `const width = (type == "action") ? '70%' : '60%'` is assigning a value to the `width`
    variable based on the condition `(type == "action")`. */
    const width = (type == "action") ? '70%' : '60%'


    /* The code block is conditionally rendering a `TouchableOpacity` component with a specific style
    and content based on the value of the `info` variable. */
    if (info) {
        return (
            <TouchableOpacity onPress={onPress} style={[{ backgroundColor: info.decoration.backgroundColor }, styles.container]}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={[styles.ifthen, { color: getWriteColor(info.decoration.backgroundColor) }]}>{(type === "action") ? "If" : "Then"}</Text>
                    <View style={{flexDirection: 'row', alignItems: "center"}}>
                        <Image source={{ uri: info.decoration.logoUrl, cache: 'force-cache' }} style={styles.logo} />
                        <Text style={[styles.desc, { color: getWriteColor(info.decoration.backgroundColor) }]}>{action}</Text>
                    </View>
                    <Icon name="close" size={30} color={getWriteColor(info.decoration.backgroundColor)} onPress={onPressCross} />
                </View>
            </TouchableOpacity>

        );
    }
}

/* The `const styles = StyleSheet.create({ ... })` block is defining a JavaScript object called
`styles` that contains various style properties for the `ActionCard` component. Each property in
the `styles` object represents a different style rule, such as `container`, `logo`, and `name`.
These style rules define the visual appearance of the `ActionCard` component. */
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginVertical: 15,
      width: '85%',
      height: 85,
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        height: 40,
        width: 40,
        marginVertical: 10,
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    area: {
        paddingTop: 5,
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 2,
        marginBottom: 20,
      },
    ifthen: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    name: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 2,
      marginBottom: 20,
    },
    desc: {
        flexWrap: 'wrap',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
      }
  });

export default ActionChoose;