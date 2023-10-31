import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";
import ToggleSwitch from "./Switch";
import SwitchNotifyMe from "./SwitchNotifyMe";
import MoreDetailsButton from "./MoreDetails";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DeleteApplet from "../../api/DeleteApplet";
import { getWriteColor } from "../ActionCard";
import TitleModal from "../TitleModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}

interface ReactionProps {
    reaction: ReactionListProps;
    bgColor: string;
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
}

const AppletInfoContainer: React.FC<AppletInfoContainerProps> = ({ name, color, actionSlug, reactionsList, user, enabled, id, createdAt = 0, lastTriggerDate = 0 }) => {
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");

    const navigation: any = useNavigation();

    /* The `useEffect` hook in this code is used to perform side effects in a
    functional component. It takes two arguments: a callback function and an array
    of dependencies. */
    useEffect(() => {
        const dataFetch = async () => {
            if (createdAt !== 0) {
                const createdAtDate = new Date(createdAt * 1000);
                const lastUpdateDate = new Date(lastTriggerDate * 1000);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                setLastUseDate(formattedLastUseDate);
                setFormattedDate(formattedDate);
            }
            console.log("console.log(id) : ", id);
            await AsyncStorage.setItem('appletID', id.toString());
        };
        dataFetch();
    }, []);

    const handleDeleteApplet = () => {
        DeleteApplet(id);
        navigation.navigate('My Applets');
    };

    return (
        <View style={ styles.container }>
            <View style={{ ...styles.header, backgroundColor: color.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : color }}>
                {/* The applet's logo */}
                <View style={{ flexDirection: 'row', marginLeft: '2%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Info', {slug: actionSlug.split('.')[0]})} style={{ marginRight: 10, marginLeft: -10 }}>
                        {actionSlug &&
                        <LogoApplet
                            slug={actionSlug.split('.')[0]}
                            color={color}
                        />}
                    </TouchableOpacity>
                    {/* Loop through reactionsList */}
                    {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Info', {slug: reaction.reactionSlug.split('.')[0]})} style={{ marginRight: 10 }}>
                                <LogoApplet
                                slug={reaction.reactionSlug.split('.')[0]}
                                color={color}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* The title of the applet */}
                <Text style={ [styles.title, { color: getWriteColor(color)}] }>{name}</Text>

                {/* The user who created the applet and the button to edit the title */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{...styles.text, fontWeight: 'bold', color: getWriteColor(color) }}>by {user}</Text>
                    <TitleModal color={color} title={name}/>
                </View>
            </View>

            <View style={ styles.body }>
                {/* The toggle switch that enables or disables the applet */}
                <View style={ styles.toggleSwitch }>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%' }}>
                    <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22 }}>Notify me</Text>
                    <SwitchNotifyMe isChecked={false} isDisabled={false} />
                </View>
                <TouchableOpacity onPress={handleDeleteApplet}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22, marginTop: '1%' }}>Delete applet</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        fontSize: 32,
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
