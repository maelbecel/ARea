import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ServiceInfo from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import AppletDetails from "../../api/AppletDetails";
import ToggleSwitch from "./Switch";

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionSlug: string;
    enabled: boolean;
    author: string;
}

const AppletComponent: React.FC<AppletProps> = ({ id, name, actionSlug, reactionSlug, enabled, author }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const navigation: any = useNavigation();

    useEffect(() => {
        const dataFetch = async (slug : string) => {
            try {
                const data = await AppletDetails(slug);
                setBgColor(data?.data?.decoration?.backgroundColor);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch(actionSlug);
    }, []);

    useEffect(() => {
        const ServiceFetch = async (slug: string) => {
            const service = await ServiceInfo(slug);
            setBgColor(service?.decoration?.backgroundColor);
        };
        ServiceFetch(actionSlug);
    }, [bgColor]);

    return (
        <TouchableOpacity style={{ ...styles.container, backgroundColor: bgColor} } onPress={() => navigation.navigate('MyApplets', { id: id })}>
            <View style={ {...styles.card, marginBottom: 10 }}>
                <View style={{ marginRight: 10 }}>
                    {actionSlug && (
                        <LogoApplet
                        slug={actionSlug}
                        width={27}
                        height={27}
                        toggleBackground={false}
                        />
                    )}
                </View>
                <View>
                    {reactionSlug && (
                        <LogoApplet
                        slug={reactionSlug}
                        width={27}
                        height={27}
                        toggleBackground={false}
                        />
                    )}
                </View>
            </View>
            <View style={ { ...styles.card, marginBottom: 10 } }>
                <Text style={ styles.title }>
                {name}
                </Text>
            </View>
            <Text style={ styles.author}>
                by {author}
            </Text>
            <View style={ styles.card }>
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
        borderRadius: 9,
        padding: 20,
        margin: 10,
        width: '85%',
        justifyContent: 'space-between', // ou alignItems: 'center' selon votre besoin
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