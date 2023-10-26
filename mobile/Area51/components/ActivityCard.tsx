/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ServiceInfo from '../api/ServiceInfo';
import AppletID from '../api/AppletID';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


/* The `interface CardProps` is defining a new interface called `CardProps` that extends the
`TouchableOpacityProps` interface. It specifies the expected props for the `ActionCard` component. */
interface CardProps extends TouchableOpacityProps {
    type: string,
    id: string,
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
export const getWriteColor = (color: string): string => {
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

const displayType = (type: string) => {
    if (type == "ran") {
        return (
            <View style={{flex: 1, flexDirection: "row"}}>
                    <Icon name="check-circle" size={30} color={'#363841'} style={styles.icon} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#363841', paddingTop: 5}}>Applet ran</Text>
            </View>
        )
    } else if (type == "on") {
        return (
            <View style={{flex: 1, flexDirection: "row"}}>
                    <Icon name="power-settings-new" size={30} color={'#33cc00'} style={styles.icon} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#363841', paddingTop: 5}}>Applet turned on</Text>
            </View>
        )
    } else if (type == "off") {
        return (
            <View style={{flex: 1, flexDirection: "row"}}>
                    <Icon name="power-settings-new" size={30} color={'#e60000'} style={styles.icon} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#363841', paddingTop: 5}}>Applet turned off</Text>
            </View>
        )
    }
}

/* The code `const ActionCard: React.FC<CardProps> = ({ title, color, slug, onPress, logo }) => { ...
}` is defining a functional component called `ActionCard`. */
const ActionCard: React.FC<CardProps> = ({ type, id }) => {
    const [load, setload] = React.useState<boolean>(false);
    const [color, setcolor] = React.useState<string>("#FFFFFF");
    const [logo, setlogo] = React.useState<string>("");
    const [name, setname] = React.useState<string>("");
    const navigation: any = useNavigation();

    React.useEffect(() => {
        const getApplet = async () => {
            try {
                const applet = await AppletID(id);
                setname(applet.name);
                const data = await ServiceInfo(applet.actionSlug.split(".")[0]);
                setcolor(data.decoration.backgroundColor);
                setlogo(data.decoration.logoUrl);
                setload(true);
            } catch (error) {
                console.error("error search applet", error);
            }
        }
        getApplet();
    }, []);

    if (!load) return null;
    return (
    <View style={[styles.box]}>
        {displayType(type)}
        <TouchableOpacity onPress={() => {navigation.navigate('MyApplets', { id: id })}} style={[{backgroundColor: color, alignSelf: 'flex-end'}, styles.container]} >
            <View style={{flex: 1, flexDirection: "row", paddingVertical: 20, marginHorizontal: 10, marginRight: 60}}>
                <Image source={{ uri: logo }} style={styles.logo}/>
                <Text style={[styles.desc, {color: getWriteColor(color)}]}>{name}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}

/* The `const styles = StyleSheet.create({ ... })` block is defining a JavaScript object called
`styles` that contains various style properties for the `ActionCard` component. Each property in
the `styles` object represents a different style rule, such as `container`, `logo`, and `name`.
These style rules define the visual appearance of the `ActionCard` component. */
const styles = StyleSheet.create({
    container: {
      width: '90%',
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
    box: {
        marginBottom: 50,
        paddingHorizontal: 20,
        width: '95%',
      },
    logo: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        marginRight: 5
    },
    icon: {
        height: 50,
        width: 50,
    },
    name: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 2,
      marginBottom: 20,
    },
    desc: {
        fontSize: 20,
        alignSelf: 'center',
    }
  });

/* The line `export default ActionCard;` is exporting the `ActionCard` component as the default
export of the module. This means that when another file imports this module, it can import the
`ActionCard` component using the default import syntax, like `import ActionCard from
'./ActionCard'`. */
export default ActionCard;