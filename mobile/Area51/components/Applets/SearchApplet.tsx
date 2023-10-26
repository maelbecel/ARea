import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import FormInput from "../FormInput";
import AppletComponent from "./AppletComponent";

import AppletInfos from "../../api/AppletInfos";
import { ScrollView } from "react-native-gesture-handler";

const SearchApplet = () => {
    const [applets, setApplets] = useState<any>(null); // State to store applets
    const [dispApplets, setDispApplets] = useState<any>(null); // State to store applets

    const reduceTitle = (title: string) => {
        if (title.length > 75) {
            return title.slice(0, 75) + "...";
        }
        return title;
    };

    const filterApplets = (name : string) => {
        if (applets == null) return;
        let tmp = applets.filter((service: any) => service.name.toLowerCase().includes(name.toLowerCase()));
        setDispApplets(tmp);
    }

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const data: any = await AppletInfos();
                console.log("data applet component", data);
                setApplets(data.data);
                setDispApplets(data.data);
            } catch (error) {
                console.error("error applet component", error);
            }
        };
        dataFetch();
    }, []);

    return (
        <ScrollView style={{ height: "100%" }}>
          {/* Barre de recherche */}
          <View style={styles.input}>
            <FormInput
              title="Search"
              icon={{ name: "search", width: 27, height: 27 }}
              onChangeText={(text) => {
                filterApplets(text);
              }}
              size="85%"
            />
          </View>

          {/* Liste des applets */}
          {(dispApplets !== null) && dispApplets.length > 0 ? dispApplets.map((item: any) => (
            <View style={styles.applet} key={item.id}>
              <AppletComponent
                id={item.id}
                name={reduceTitle(item.name)}
                reactionSlug={item.reactionSlug.split(".")[0]}
                actionSlug={item.actionSlug.split(".")[0]}
                enabled={item.enabled}
                author={item.user.username}
              />
            </View>
          )): null}
        </ScrollView>
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
