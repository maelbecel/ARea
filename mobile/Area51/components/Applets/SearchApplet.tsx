import React, { useState, useEffect } from "react";
import { View, Image, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import ServiceInfo, {Action, Reaction} from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import LogoApplet from "./Logo";
import Switch from "./Switch";
import FormInput from "../FormInput";

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
            setBgColor(service?.decoration?.backgroundColor);
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
    const [dispApplets, setDispApplets] = useState([]); // State to store applets

    const filterApplets = (name : string) => {
        if (applets == null) return;
        let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
        console.log("OIJHUGYHIJOIHUGYFVUBIHUGYFVHJ",tmp);
        setDispApplets(tmp);
    }

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
                setDispApplets(data?.data);
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
            <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => {filterApplets(text)}} size='85%' />

            {/* Liste des applets */}
            <FlatList
                style={{ width: "75%" }}
                data={dispApplets}
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
