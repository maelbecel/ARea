import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import ServiceInfo from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import AppletDetails from "../../api/AppletDetails";
import ToggleSwitch from "./Switch";
import { getWriteColor } from "../ActionCard";

/* The `ReactionListProps` interface is defining the structure of an object that represents a list of
reactions for an applet. It has two properties: */
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}

/* The `ReactionProps` interface is defining the structure of an object that represents the props
passed to the `ReactionLogo` component. It has two properties: */
interface ReactionProps {
    reaction: ReactionListProps;
    bgColor: string;
}

/* The `AppletProps` interface is defining the structure of an object that represents the props passed
to the `AppletComponent` component. It has the following properties: */
interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionsList: ReactionListProps[];
    enabled: boolean;
    author: string;
}

/**
 * The `ReactionLogo` component renders a logo based on the given reaction and background color.
 * @param  - - `reaction`: This is an object that contains information about a reaction. It likely has
 * properties such as `reactionSlug` which is a string representing the slug of the reaction.
 * @returns The `ReactionLogo` component is returning a `LogoApplet` component with the `slug` prop set
 * to the first part of the `reactionSlug` string (obtained by splitting it at the dot) and the `color`
 * prop set to the value of the `bgColor` prop.
 */
const ReactionLogo: React.FC<ReactionProps> = ({ reaction, bgColor }) => {
    return (
        <LogoApplet
            slug={reaction.reactionSlug.split(".")[0]}
            color={bgColor}
        />
    );
};

const AppletComponent: React.FC<AppletProps> = ({ id, name, actionSlug, reactionsList, enabled, author }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * The function `dataFetch` is an asynchronous function that fetches data using the `AppletDetails`
     * function and sets the background color based on the fetched data.
     * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for
     * a specific item or resource. It is used as a parameter in the `dataFetch` function to fetch data
     * related to that specific slug.
     */
    const dataFetch = async (slug : string) => {
        try {
            const data = await AppletDetails(slug);
            setBgColor(data?.data?.decoration?.backgroundColor);
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
    is used to fetch data and set the background color based on the fetched data. */
    useEffect(() => {
        dataFetch(actionSlug);
    }, [navigation]);

    /* The `return` statement in the code is rendering the JSX elements based on the value of the
    `loading` state. */
    return (
        loading ? (
        <TouchableOpacity style={{ ...styles.container, backgroundColor: bgColor} } onPress={() => navigation.navigate('MyApplets', { id: id })}>
            <View style={[ styles.card, {marginBottom: 10, flexWrap: "wrap" }]}>
                    {actionSlug && (
                        <LogoApplet
                        slug={actionSlug}
                        color={bgColor}
                        />
                    )}
                    {/* Loop through reactionsList */}
                    {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index} style={{  }}>
                            <ReactionLogo
                                reaction={reaction}
                                bgColor={bgColor}
                            />
                        </View>
                    ))}
            </View>
            <View style={ { ...styles.card, marginBottom: 10 } }>
                <Text style={ [ styles.title, { color: getWriteColor(bgColor) }] }>
                {name}
                </Text>
            </View>
            <Text style={ styles.author }>
                by {author}
            </Text>
            <View style={[ styles.card, { marginTop: '3%'}] }>
                <ToggleSwitch
                    isChecked={enabled}
                    isDisabled={false}
                    yesLabel="Enabled"
                    noLabel="Disabled"
                    bgColor={bgColor}
                />
            </View>
        </TouchableOpacity>
        ) : (
            <View style={{backgroundColor: bgColor, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#363841" />
            </View>
        )
    );
};

/* The `const styles` declaration is creating a JavaScript object that contains a set of styles for the
components in the React Native code. The `StyleSheet.create()` function is used to create a
stylesheet object that optimizes the styles for performance. */
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        margin: 15,
        width: '85%',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    author: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 26
    },
});

/* The `export default AppletComponent;` statement is exporting the `AppletComponent` component as the
default export of the module. This means that when another file imports this module, it can access
the `AppletComponent` component directly without having to specify its name in curly braces. For
example, in another file, you can import the `AppletComponent` like this: `import AppletComponent
from './AppletComponent';`. */
export default AppletComponent;