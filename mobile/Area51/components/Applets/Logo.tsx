import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import React from 'react';
import ServiceInfo from '../../api/ServiceInfo';

/* The `interface CardProps` is defining the props that can be passed to the `LogoApplet` component. It
extends the `TouchableOpacityProps` interface, which includes all the props that can be passed to
the `TouchableOpacity` component from React Native. */
interface CardProps extends TouchableOpacityProps {
    slug    : string;
    onPress ?: () => void;
    color   ?: string;
}

/* The code defines a functional component called `LogoApplet` which takes in props of type
`CardProps`. The component renders a `TouchableOpacity` or `View` depending on whether the `onPress`
prop is defined or not. */
const LogoApplet: React.FC<CardProps> = ({ slug , onPress, color = "#ffffff"}) => {
    const [bgColor, setColor] = React.useState<string>("EEEEEE");
    const [logo, setLogo] = React.useState<string>("https://via.placeholder.com/50");
    const [loading, setLoading] = React.useState<boolean>(true);

    /* The `React.useEffect` hook is used to perform side effects in functional components. In this
    case, it is used to fetch information from the `ServiceInfo` API and update the component's
    state. */
    React.useEffect(() => {
        const fetchInfos = async () => {
            const res = await ServiceInfo(slug);
            setColor(res.decoration.backgroundColor);
            setLogo(res.decoration.logoUrl);
            setLoading(false);
        }
        fetchInfos();
    }, []);

    /**
     * The function checks if a given color is light or not.
     * @param {string} color - The `color` parameter is a string representing a color.
     * @returns a boolean value. It returns true if the color is considered light, and false if it is
     * not.
     */
    const isLight = (color: string) => {
        if (color.charAt(0) === '#') {
            color = color.substr(1);
        }
        if (color.length === 3) {
            color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
        }
        if (color.toLocaleLowerCase() === 'ffffff') {
            return false;
        }
        return true;
    }

    /* The code block is checking if the `loading` state is `false`. If it is `false`, it means that
    the data has been fetched and the component is ready to render. */
    if (!loading) {
        return (
            onPress ? ( // Vérifiez si onPress est défini
                <TouchableOpacity onPress={onPress} style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
                    <Image source={{ uri: logo, cache: 'force-cache'}} style={[styles.logopti]} />
                </TouchableOpacity>
            ) : (
                <View style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
                    <Image source={{ uri: logo, cache: 'force-cache' }} style={[styles.logopti]} />
                </View>
            )
        );
    }
}


/* The `const styles` variable is an object that contains style definitions for the `LogoApplet`
component. It uses the `StyleSheet.create` method from React Native to create a stylesheet object. */
const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    logopti: {
        height: 40,
        width: 40,
        alignSelf: 'center',
    }
  });

export default LogoApplet;