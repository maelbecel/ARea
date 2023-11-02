import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ServiceInfo from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import AppletDetails from "../../api/AppletDetails";
import ToggleSwitch from "./Switch";
import { getWriteColor } from "../ActionCard";

interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}

interface ReactionProps {
    reaction: ReactionListProps;
    bgColor: string;
}

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionsList: ReactionListProps[];
    enabled: boolean;
    author: string;
}

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

    useEffect(() => {
        const dataFetch = async (slug : string) => {
            try {
                const data = await AppletDetails(slug);
                setBgColor(data?.data?.decoration?.backgroundColor);
            } catch (error) {
                console.error(error);
            }
        };
        dataFetch(actionSlug);
    }, []);

    return (
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
                    isDisabled={enabled}
                    yesLabel="Enabled"
                    noLabel="Disabled"
                    bgColor={bgColor}
                />
            </View>
        </TouchableOpacity>
    );
};

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

export default AppletComponent;