import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ServiceInfo from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import Switch from "./Switch";
import AppletDetails from "../../api/AppletDetails";

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionSlug: string;
    enabled: boolean;
}

const AppletComponent: React.FC<AppletProps> = ({ id, name, actionSlug, reactionSlug, enabled }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const navigation: any = useNavigation();

    console.log("ihugyv", enabled)

    useEffect(() => {
        const dataFetch = async (slug : string) => {
            try {
                const bgColor = await AppletDetails(slug);
                setBgColor(bgColor);
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
            <View style={ styles.card }>
                {actionSlug && (
                <LogoApplet
                    slug={actionSlug}
                    width={42}
                    height={42}
                    toggleBackground={false}
                />
                )}
                {reactionSlug && (
                <LogoApplet
                    slug={reactionSlug}
                    width={42}
                    height={42}
                    toggleBackground={false}
                />
                )}
                <Text style={ styles.title }>
                {name}
                </Text>
            </View>
            {/* <View style={ styles.card }>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Enabled:
                </Text>
                <Switch isChecked={enabled} isDisabled={enabled} />
            </View> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 9,
        padding: 20,
        margin: 10,
        width: '85%',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
});

export default AppletComponent;