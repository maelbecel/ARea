import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";
import ToggleSwitch from "./Switch";
import SwitchNotifyMe from "./SwitchNotifyMe";
import MoreDetailsButton from "./MoreDetails";
import { useNavigation } from '@react-navigation/native';

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
    reactionSlug: string;
    user: string;
    enabled: boolean;
    createdAt?: number;
    lastTriggerDate?: number;
}

const AppletInfoContainer: React.FC<AppletInfoContainerProps> = ({ name, color, actionSlug, reactionSlug, user, enabled, createdAt = 0, lastTriggerDate = 0 }) => {
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");

    const navigation: any = useNavigation();

    /* The `useEffect` hook in this code is used to perform side effects in a
    functional component. It takes two arguments: a callback function and an array
    of dependencies. */
    useEffect(() => {
        console.log("The applet is enabled ?", enabled);
        if (createdAt !== 0) {
            const createdAtDate = new Date(createdAt * 1000);
            const lastUpdateDate = new Date(lastTriggerDate * 1000);
            const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            setLastUseDate(formattedLastUseDate);
            setFormattedDate(formattedDate);
        }
    }, []);

    return (
        <View style={ styles.container }>
            <View style={{ ...styles.header, backgroundColor: `${color}` }}>
                {/* The applet's logo */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => console.log("Details Applet")} style={{ marginRight: 10, marginLeft: -10 }}>
                        {actionSlug &&
                        <LogoApplet
                            slug={actionSlug}
                            width={52}
                            height={52}
                            toggleBackground={false}
                        />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Details Applet")} style={{ marginRight: 10 }}>
                        {reactionSlug &&
                        <LogoApplet
                        slug={reactionSlug}
                        width={52} height={52}
                        toggleBackground={false}
                        />}
                    </TouchableOpacity>
                </View>

                {/* The title of the applet */}
                <Text style={ styles.title }>{name}</Text>

                {/* The user who created the applet and the button to edit the title */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{...styles.text, fontWeight: 'bold' }}>by {user}</Text>
                    <TouchableOpacity onPress={() => console.log("Edit title")}>
                        <Text style={{...styles.text, fontWeight: 'bold' }}>Edit title</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* The toggle switch that enables or disables the applet */}
            <View style={ styles.toggleSwitch }>
                <ToggleSwitch
                    isChecked={enabled}
                    isDisabled={false}
                    yesLabel="Enabled"
                    noLabel="Disabled"
                    bgColor='#121212'
                    toggleColor={color}
                    darkMode={false}
                />
            </View>

            <View style={ styles.body }>
                <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactionSlug={reactionSlug} />

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
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        paddingBottom: '1%',
        paddingHorizontal: '2%',
        marginBottom: '2%',
    },
    text: {
        color: 'white',
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
