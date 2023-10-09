// --- Librairies import --- //
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

// --- Components import --- //
import AppletInfoContainer from "../components/Applets/AppletInfoContainer";

const MyApplet = ({route}) => {
    const [bgColor, setBgColor] = useState('');
    const [dataApplet, setDataApplet] = useState(null);
    const [theme, setTheme] = useState('');
    const { id } = route.params;

    useEffect(() => {
      const dataFetch = async () => {
        try {
              const token = await SecureStore.getItemAsync("token_api");
              if (id === undefined) {
                  console.log("something went wrong");
                  return;
              }
                const data = await (
                    await fetch(`http://zertus.fr:8001/applet/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                console.log(data);
                setDataApplet(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, [id]);

    useEffect(() => {
      if (dataApplet) {
        const dataFetch = async (slug : string) => {
          try {
                  const token = await SecureStore.getItemAsync("token_api");
                    const dataFetched = await (
                        await fetch(`http://zertus.fr:8001/service/${slug}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                    ).json();
                    setBgColor(dataFetched?.data?.decoration?.backgroundColor);
                } catch (error) {
                    console.log(error);
                }
            };
            console.log("test enable " + dataApplet?.data?.enabled);
            dataFetch(dataApplet?.data?.actionSlug.split('.')[0]);
        }
    }, [dataApplet]);

    useEffect(() => {
        if (bgColor === undefined)
            return;
    }, [bgColor]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {dataApplet &&
                    <AppletInfoContainer
                        name={dataApplet?.data?.name}
                        color={bgColor}
                        theme={theme}
                        actionSlug={dataApplet?.data?.actionSlug.split('.')[0]}
                        reactionSlug={dataApplet?.data?.reactionSlug.split('.')[0]}
                        user={dataApplet?.data?.user?.username}
                        enabled={dataApplet?.data?.enabled}
                        createdAt={dataApplet?.data?.createdAt}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
    },
});

export default MyApplet;
