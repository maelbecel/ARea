import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";

import FormInput from "../FormInput";
import AppletComponent from "./AppletComponent";

import AppletInfos from "../../api/AppletInfos";

const SearchApplet = () => {
    const [applets, setApplets] = useState<any>(null); // State to store applets
    const [dispApplets, setDispApplets] = useState<any>(null); // State to store applets

    const filterApplets = (name : string) => {
        if (applets == null) return;
        let tmp = applets.filter((service: any) => service.name.toLowerCase().includes(name.toLowerCase()));
        setDispApplets(tmp);
    }

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const data: any = await AppletInfos();
                setApplets(data.data);
                setDispApplets(data.data);
            } catch (error) {
                console.log("error applet component", error);
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
        <View>
            {/* Barre de recherche */}
            <View style={ styles.input }>
                <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => {filterApplets(text)}} size='85%' />
            </View>

            {/* Liste des applets */}
            <FlatList
                data={dispApplets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={ styles.applet }>
                        <AppletComponent
                            id={item.id}
                            name={item.name}
                            reactionSlug={item.reactionSlug.split(".")[0]}
                            actionSlug={item.actionSlug.split(".")[0]}
                            enabled={item.enabled}
                        />
                    </View>
                )}
            />
            </View>
    );
};

const styles = StyleSheet.create({
    input: {
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    applet: {
        alignContent: 'center',
        alignItems: 'center',
    },
});

export default SearchApplet;
