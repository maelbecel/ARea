// --- Librairies import --- //
import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, Alert } from "react-native";

// --- Components import --- //
import AppletInfoContainer from "../components/Applets/AppletInfoContainer";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";
import { getWriteColor } from "../components/ActionCard";
import AppletInfos from "../api/AppletInfos";
import ServiceInfo from "../api/ServiceInfo";

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
                const data = await AppletInfos(id);
                setDataApplet(data);
            } catch (error) {
                console.error(error);
            }
        };
        dataFetch();
    }, [id]);

    useEffect(() => {
        if (dataApplet) {
            const dataFetch = async (slug : string) => {
                try {
                    const data = await ServiceInfo(slug);
                    setBgColor(data?.decoration?.backgroundColor);
                } catch (error) {
                    console.error(error);
                }
            };
            dataFetch(dataApplet?.data?.actionSlug.split('.')[0]);
        }
    }, [dataApplet]);

    useEffect(() => {
        if (bgColor === undefined)
            return;
    }, [bgColor]);

    return (
        <ScrollView>
            <View style={{ ...styles.container, backgroundColor: bgColor.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : bgColor, paddingTop: statusBarHeight }}>
                {/* TODO: faire l'engrenage de modification etc */}
                <TopBar title=""  iconLeft='arrow-back' onPressLeft={() => navigation.goBack()} color={getWriteColor(bgColor)} iconRight='settings' onPressRight={() => console.log("settings")} />
            </View>
            <View>
                {dataApplet &&
                    <AppletInfoContainer
                        name={dataApplet?.data?.name}
                        color={bgColor}
                        actionSlug={dataApplet?.data?.actionSlug}
                        reactionsList={dataApplet?.data?.reactions}
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
        paddingRight: 10,
      },
});

export default MyApplet;
