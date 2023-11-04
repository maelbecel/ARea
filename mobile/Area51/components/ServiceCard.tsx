/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';


/* The `interface CardProps` is defining a new interface called `CardProps` that extends the
`TouchableOpacityProps` interface. It specifies the expected props for the `ServiceCard` component. */
interface CardProps extends TouchableOpacityProps {
    title   : string;
    logo    : string;
    color   : string;
    slug    : string;
    onPress: () => void;
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

/* The code `const ServiceCard: React.FC<CardProps> = ({ title, color, slug, onPress, logo }) => { ...
}` is defining a functional component called `ServiceCard`. */
const ServiceCard: React.FC<CardProps> = ({ title, color, slug, onPress, logo }) => {
    if (color == "") {
        color = "#EEEEEE";
    }
    if (logo == "") {
        logo = "https://via.placeholder.com/70";
    }
    return (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.container]}>
        <View>
            <Image source={{ uri: logo, cache: 'force-cache' }} style={styles.logo}/>
            <Text style={[styles.name, {color: getWriteColor(color)}]}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}

/* The `const styles = StyleSheet.create({ ... })` block is defining a JavaScript object called
`styles` that contains various style properties for the `ServiceCard` component. Each property in
the `styles` object represents a different style rule, such as `container`, `logo`, and `name`.
These style rules define the visual appearance of the `ServiceCard` component. */
const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
      marginVertical: 15,
      width: '85%',
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
        height: 70,
        width: 70,
        marginVertical: 10,
        alignSelf: 'center',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 5,
      marginBottom: 20,
    },
  });

/* The line `export default ServiceCard;` is exporting the `ServiceCard` component as the default
export of the module. This means that when another file imports this module, it can import the
`ServiceCard` component using the default import syntax, like `import ServiceCard from
'./ServiceCard'`. */
export default ServiceCard;