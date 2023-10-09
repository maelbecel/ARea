import React, { useState, useEffect } from "react";
import { View, Image, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import ServiceInfo, {Action, Reaction} from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import Switch from "./Switch";

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionSlug: string;
    actionTrigger: string;
    lastTriggerUpdate: string; // date
    createdAt: number; // date
    enabled: boolean;
}

const AppletComponent = ({ id, name, actionSlug, reactionSlug, actionTrigger, lastTriggerUpdate, createdAt, enabled }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const [service, setService] = useState<any>({});
    const navigation = useNavigation();

    // get background color of the action slug
    useEffect(() => {
        const dataFetch = async (slug : string) => {
            try {
                const token = await SecureStore.getItemAsync("token_api");
                const data = await (
                    await fetch(`http://zertus.fr:8001/service/${slug}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setBgColor(data?.data?.decoration?.backgroundColor);
            } catch (error) {
                console.log("error applet component", error);
            }
        };
        dataFetch(actionSlug);
    }, []);

    useEffect(() => {
        const ServiceFetch = async (slug: string) => {
            const service = await ServiceInfo(slug);
            console.log("service", service);
            setBgColor(service?.decoration?.backgroundColor);
            console.log("bgColor", bgColor);
        };
        ServiceFetch(actionSlug);
    }, [bgColor]);

    return (
        <TouchableOpacity
        style={{
            backgroundColor: bgColor,
            borderRadius: 9,
            padding: 20,
            margin: 10,
        }}
        onPress={() => navigation.navigate('MyApplets', { id: id })}
        >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {actionSlug && (
            <LogoApplet
                slug={actionSlug}
                width={56}
                height={56}
                toggleBackground={false}
            />
            )}
            {reactionSlug && (
            <LogoApplet
                slug={reactionSlug}
                width={56}
                height={56}
                toggleBackground={false}
            />
            )}
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 28 }}>
            {name}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Enabled:
            </Text>
            <Switch isChecked={enabled} isDisabled={true} />
        </View>
        </TouchableOpacity>
    );
};

const SearchApplet = () => {
    const [applets, setApplets] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const token = await SecureStore.getItemAsync("token_api");
                const response = await (
                    await fetch(`http://zertus.fr:8001/applet/me`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                );
                const data = await response.json();
                setApplets(data?.data);
            } catch (error) {
                console.log("error search applet", error);
            }
        };
        dataFetch();
    }, []);

    useEffect(() => {
        if (applets) {
            console.log("applets", applets);
        }
    }, [applets]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* Barre de recherche */}
            <View style={{ flexDirection: "row", backgroundColor: "#D9D9D9", borderRadius: 15, margin: 20, padding: 10, alignItems: "center" }}>
                <Icon name={"search"} size={24} color="#00000080" />
                <TextInput
                    value={searchValue}
                    placeholder="Search services"
                    onChangeText={(text) => setSearchValue(text)}
                    style={{ flex: 1, fontSize: 24, color: "#363841", fontWeight: "bold" }}
                />
            </View>

            {/* Liste des applets */}
            <FlatList
                style={{ width: "75%" }}
                data={applets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AppletComponent
                        id={item.id}
                        name={item.name}
                        reactionSlug={item.reactionSlug.split(".")[0]}
                        actionSlug={item.actionSlug.split(".")[0]}
                        actionTrigger={item.actionTrigger}
                        lastTriggerUpdate={item.lastTriggerUpdate}
                        createdAt={item.createdAt}
                        enabled={item.enabled}
                    />
                )}
            />
        </View>
    );
};

export default SearchApplet;
