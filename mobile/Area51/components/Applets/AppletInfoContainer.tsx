import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";
import ToggleSwitch from "./Switch";
import SwitchNotifyMe from "./SwitchNotifyMe";
import MoreDetailsButton from "./MoreDetails";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "../DeleteModal";
import OutlinedTitleBox from "../OutlinedTitleBox";

/* The `ReactionListProps` interface is defining the type of props that the `AppletInfoContainer`
component expects to receive for the `reactionsList` prop. It specifies that the `reactionsList`
prop should be an array of objects with two properties: `reactionSlug` (a string) and `reactionData`
(an array of any type). This interface helps ensure that the `reactionsList` prop is used correctly
and that the objects in the array have the expected properties and types. */
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}


/* The `AppletInfoContainerProps` interface is defining the type of props that the
`AppletInfoContainer` component expects to receive. It specifies the names and
types of the props, such as `name` (a string), `color` (a string), `actionSlug`
(a string), `reactionSlug` (a string), `user` (a string), `enabled` (a
boolean), `createdAt` (a number), and `lastTriggerDate` (a number). By defining
this interface, it helps ensure that the component is used correctly and that
the props passed to it have the expected types. */
interface AppletInfoContainerProps {
    name: string;
    color: string;
    actionSlug: string;
    reactionsList: ReactionListProps[];
    user: string;
    enabled: boolean;
    id: number;
    createdAt?: number;
    lastTriggerDate?: number;
    notif: boolean;
}

const AppletInfoContainer: React.FC<AppletInfoContainerProps> = ({ name, color, actionSlug, reactionsList, user, enabled, id, createdAt = 0, lastTriggerDate = 0, notif }) => {
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");
    const [title, setTitle] = useState<string>(name);

    const navigation: any = useNavigation();

    /* The `useEffect` hook in this code is used to perform side effects in a
    functional component. It takes two arguments: a callback function and an array
    of dependencies. */
    useEffect(() => {
        /**
         * The function `dataFetch` retrieves data, formats dates, and stores an applet ID in
         * AsyncStorage.
         */
        const dataFetch = async () => {
            if (createdAt !== 0) {
                const createdAtDate = new Date(createdAt * 1000);
                const lastUpdateDate = new Date(lastTriggerDate * 1000);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                setLastUseDate(formattedLastUseDate);
                setFormattedDate(formattedDate);
            }
            await AsyncStorage.setItem('appletID', id.toString());
        };
        dataFetch();
    }, []);

    /**
     * The function `handleTitleChange` updates the title state and saves it to AsyncStorage if the
     * text length is less than 141 characters.
     * @param {string} text - The `text` parameter is a string that represents the new title value that
     * is being passed to the `handleTitleChange` function.
     */
    const handleTitleChange = async (text: string) => {
        if (text.length < 141) {
            setTitle(text);
            await AsyncStorage.setItem('title', text);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ ...styles.header, backgroundColor: color.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : color }}>
                {/* The applet's logo */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Info', { slug: actionSlug.split('.')[0] })}>
                        {actionSlug &&
                            <LogoApplet
                                slug={actionSlug.split('.')[0]}
                                color={color}
                            />}
                    </TouchableOpacity>
                    {/* Loop through reactionsList */}
                    {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Info', { slug: reaction.reactionSlug.split('.')[0] })}>
                                <LogoApplet
                                    slug={reaction.reactionSlug.split('.')[0]}
                                    color={color}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* The title of the applet */}
                <OutlinedTitleBox value={title} bgColor={color} author={user} onChangeText={handleTitleChange} />

            </View>

            <View style={styles.body}>
                {/* The toggle switch that enables or disables the applet */}
                <View style={styles.toggleSwitch}>
                    <ToggleSwitch
                        isChecked={enabled}
                        isDisabled={false}
                        yesLabel="Enabled"
                        noLabel="Disabled"
                        bgColor='#121212'
                        toggleColor={color.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : color}
                        darkMode={false}
                        bigSwitch={true}
                    />
                </View>

                <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactionsList={reactionsList} />

                <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, marginTop: '1%' }}>
                    {formattedDate ? (
                        `Created at ${formattedDate}`
                    ) : (
                        "Date of creation not accessible"
                    )}
                </Text>
                <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, marginTop: '1%' }}>
                    {LastUseDate ? (
                        `Last use ${formattedDate}`
                    ) : (
                        "Never used yet"
                    )}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, alignContent: 'center', alignItems: 'center' }}>Notify me</Text>
                    <SwitchNotifyMe isChecked={notif} isDisabled={false} />
                </View>
                <DeleteModal id={id} />
            </View>
        </View>
    );
};

/* The `const styles` declaration is creating a JavaScript object that contains a set of styles for
different elements in the `AppletInfoContainer` component. Each key in the object represents a style
property, such as `container`, `header`, `title`, `text`, `toggleSwitch`, and `body`. The
corresponding value for each key is an object that defines the specific style properties and their
values for that element. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: '5%',
        paddingTop: '3%',
        paddingBottom: '10%',
        marginBottom: '5%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginBottom: '2%',
    },
    text: {
        fontSize: 16,
    },
    toggleSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    },
    body: {
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
});

export default AppletInfoContainer;
