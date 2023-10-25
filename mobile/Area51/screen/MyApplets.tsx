// --- Librairies import --- //
import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- Components import --- //
import AppletInfoContainer from "../components/Applets/AppletInfoContainer";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";

const MyApplet = ({route}) => {
    const [bgColor, setBgColor] = useState('');
    const [dataApplet, setDataApplet] = useState(null);
    const { id } = route.params;
    const navigation = useNavigation();
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    useEffect(() => {
      const getStatusbarHeight = () => {
        setStatusBarHeight(StatusBar.currentHeight + 20 || 0);
      };

      getStatusbarHeight();

    }, []);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const token = await SecureStore.getItemAsync("token_api");
                if (id === undefined) {
                    console.log("something went wrong");
                    return;
                }
                const serverAddress = await AsyncStorage.getItem('serverAddress');
                const data = await (
                    await fetch(`${serverAddress}/applet/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
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
                  const serverAddress = await AsyncStorage.getItem('serverAddress');
                    const dataFetched = await (
                        await fetch(`${serverAddress}/service/${slug}`, {
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
        <ScrollView>
            <View style={{ ...styles.container, backgroundColor: bgColor, paddingTop: statusBarHeight }}>
                {/* TODO: faire l'engrenage de modification etc */}
                <TopBar title=""  iconLeft='arrow-back' onPressLeft={() => navigation.goBack()} color={('white')} />
            </View>
            <View>
                {dataApplet &&
                    <AppletInfoContainer
                        name={dataApplet?.data?.name}
                        color={bgColor}
                        actionSlug={dataApplet?.data?.actionSlug.split('.')[0]}
                        reactionSlug={dataApplet?.data?.reactionSlug.split('.')[0]}
                        user={dataApplet?.data?.user?.username}
                        enabled={dataApplet?.data?.enabled}
                        createdAt={dataApplet?.data?.createdAt}
                        id={dataApplet?.data?.id}
                    />
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
          shadowOffset: {
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.84,
          elevation: 5,
      },
});

export default MyApplet;
