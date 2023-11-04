// --- Librairies import --- //
import React, { useEffect, useState, useCallback } from "react";
import { View, StatusBar, StyleSheet, RefreshControl } from "react-native";

// --- Components import --- //
import AppletInfoContainer from "../components/Applets/AppletInfoContainer";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";
import { getWriteColor } from "../components/ActionCard";
import AppletInfos from "../api/AppletInfos";
import ServiceInfo from "../api/ServiceInfo";

/* The code defines a functional component called `MyApplet`. It takes two props, `navigation` and
`route`, which are provided by the React Navigation library. */
const MyApplet = ({navigation, route}) => {
    const [bgColor, setBgColor] = useState('');
    const [dataApplet, setDataApplet] = useState(null);
    const { id } = route.params;
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [refreshing, setRefreshing] = useState<boolean>(false); // State to store refreshing state


    /* The `onRefresh` function is a callback function that is used as the `onRefresh` prop for the
    `RefreshControl` component in the `ScrollView`. */
    const onRefresh = useCallback(async () => {
		setRefreshing(true);
        setDataApplet(null);
		await dataFetch();
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	}, []);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to add a listener to the navigation focus event and to get the
    status bar height. */
    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            dataFetch();
        });
      const getStatusbarHeight = () => {
        setStatusBarHeight(StatusBar.currentHeight + 20 || 0);
      };

      getStatusbarHeight();

    }, []);

    /**
     * The function `dataFetch` is an asynchronous function that fetches data using the `AppletInfos`
     * function and sets the fetched data to the `dataApplet` state variable.
     */
    const dataFetch = async () => {
        try {
            const data = await AppletInfos(id);
            setDataApplet(data);
        } catch (error) {
            console.error(error);
        }
    };

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to call the `dataFetch` function whenever the `id` dependency
    changes. */
    useEffect(() => {
        dataFetch();
    }, [id]);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to fetch data from the `ServiceInfo` API and set the background
    color based on the fetched data. */
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

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to check if the `bgColor` state variable is `undefined`. If it is
    `undefined`, the function returns early and does not perform any further actions. This can be
    useful for handling certain conditions or preventing unnecessary code execution. */
    useEffect(() => {
        if (bgColor === undefined)
            return;
    }, [bgColor]);

    /* The code is returning a JSX (JavaScript XML) structure that represents the UI of the `MyApplet`
    component. */
    return (
        <ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		  }>
            <View style={{ ...styles.container, backgroundColor: bgColor.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : bgColor, paddingTop: statusBarHeight }}>
                <TopBar title=""  iconLeft='arrow-back' onPressLeft={() => navigation.goBack()} color={getWriteColor(bgColor)} iconRight='settings' onPressRight={() => navigation.navigate("EditApplet", {id : id})} />
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
                        notif={dataApplet?.data?.notifUser}
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
