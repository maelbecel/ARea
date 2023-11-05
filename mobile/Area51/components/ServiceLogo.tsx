import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import React from 'react';
import ServiceInfo from '../api/ServiceInfo';

/* The `interface CardProps` is defining the props that can be passed to the `ServiceLogo` component.
It extends the `TouchableOpacityProps` interface, which includes all the props that can be passed to
the `TouchableOpacity` component from the `react-native` library. */
interface CardProps extends TouchableOpacityProps {
    slug    : string;
    onPress : () => void;
    disabled ?: boolean;
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


const ServiceLogo: React.FC<CardProps> = ({ slug , onPress, disabled = false}) => {

    const [color, setColor] = React.useState<string>("EEEEEE");
    const [logo, setLogo] = React.useState<string>("https://via.placeholder.com/50");
    const [loading, setLoading] = React.useState<boolean>(true);

    /* The `React.useEffect` hook is used to perform side effects in functional components. In this
    case, it is used to fetch information about a service and update the state variables `color`,
    `logo`, and `loading` based on the fetched data. */
    React.useEffect(() => {
        const fetchInfos = async () => {
            const res = await ServiceInfo(slug);
            setColor(res.decoration.backgroundColor);
            setLogo(res.decoration.logoUrl);
            setLoading(false);
        }
        fetchInfos();
    }, []);

    if (!loading) {
        if (!disabled) {
            return (
                <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.container]}>
                    <View>
                        <Image source={{ uri: logo, cache: 'force-cache' }} style={styles.logopti}/>
                        <Text style={{color : getWriteColor(color), fontWeight : 'bold', fontSize : 9.9, alignSelf : 'center'}}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.container]}>
                    <View>
                        <Image source={{ uri: logo, cache: 'force-cache' }} style={[styles.logopti]}/>
                        <Text style={{color : getWriteColor(color), fontWeight : 'bold', fontSize : 13, alignSelf : 'center'}}>Log In</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}


/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. This method ensures that the styles are optimized for performance. */
const styles = StyleSheet.create({
    container: {
      height: 80,
      width: 80,
      marginVertical: 15,
      marginRight: 15,
      paddingHorizontal: 20,
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
        height: 50,
        width: 50,
        marginVertical: 15,
        alignSelf: 'center',
    },
    logopti: {
        height: 30,
        width: 30,
        marginVertical: 15,
        alignSelf: 'center',
    }
  });

export default ServiceLogo;