import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import ServiceInfo from '../../api/ServiceInfo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoApplet from "./Logo";
import Switch from "./Switch";
import FormInput from "../FormInput";

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

    useEffect(() => {
        const dataFetch = async (slug : string) => {
            try {
                const token: string = await SecureStore.getItemAsync("token_api");
                const serverAddress: string = await AsyncStorage.getItem('serverAddress');
                const data: any = await (
                    await fetch(`${serverAddress}/service/${slug}`, {
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
    const [dispApplets, setDispApplets] = useState([]); // State to store applets

    const filterApplets = (name : string) => {
        if (applets == null) return;
        let tmp = applets.filter((service) => service.name.toLowerCase().includes(name.toLowerCase()));
        setDispApplets(tmp);
    }

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const token = await SecureStore.getItemAsync("token_api");
                const serverAddress = await AsyncStorage.getItem('serverAddress');
                const response = await (
                    await fetch(`${serverAddress}/applet/me`, {
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
        <View style={styles.container}>
            {/* Barre de recherche */}
            <View style={ styles.input }>
                <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => {filterApplets(text)}} size='85%' />
            </View>

            {/* Liste des applets */}
            <FlatList
                data={dispApplets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AppletComponent
                        id={item.id}
                        name={item.name}
                        reactionSlug={item.reactionSlug.split(".")[0]}
                        actionSlug={item.actionSlug.split(".")[0]}
                        enabled={item.enabled}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  input: {
    alignContent: "center",
    alignItems: "center",
  },
});

export default SearchApplet;
