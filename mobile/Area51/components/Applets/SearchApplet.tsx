import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, RefreshControl } from "react-native";

import FormInput from "../FormInput";
import AppletComponent from "./AppletComponent";

import AppletMe from "../../api/AppletMe";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

/* The code defines a functional component called `SearchApplet` using TypeScript and React. */
const SearchApplet: React.FC = () => {
	const [applets, setApplets] = useState<any>(null); // State to store applets
	const [dispApplets, setDispApplets] = useState<any>(null); // State to store applets
	const [loading, setLoading] = useState<boolean>(true); // State to store loading state
	const [refreshing, setRefreshing] = useState<boolean>(false); // State to store refreshing state
	const navigation: any = useNavigation();

	/**
	 * The function `reduceTitle` takes a string `title` as input and returns a shortened version of the
	 * title if it exceeds 50 characters, otherwise it returns the original title.
	 * @param {string} title - The `title` parameter is a string that represents the title of a text or
	 * document.
	 * @returns The function `reduceTitle` returns a modified version of the input `title` string. If the
	 * length of the `title` is greater than 50 characters, it returns the first 50 characters of the
	 * `title` followed by an ellipsis ("..."). Otherwise, it returns the original `title` string.
	 */
	const reduceTitle = (title: string) => {
		if (title.length > 50) {
			return title.slice(0, 50) + "...";
		}
		return title;
	};

	/* The `onRefresh` function is a callback function that is used to handle the refresh action in the
	ScrollView component. */
	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setApplets(null);
		setDispApplets(null);
		await dataFetch();
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	  }, []);

	/**
	 * The function filters an array of applets based on a given name and updates the displayed applets.
	 * @param {string} name - A string representing the name of the applet to filter.
	 * @returns nothing (void) as there is no explicit return statement.
	 */
	const filterApplets = (name : string) => {
		if (applets == null) return;
		let tmp = applets.filter((service: any) => service.name.toLowerCase().includes(name.toLowerCase()));
		setDispApplets(tmp);
	}

	/**
	 * The function `dataFetch` is an asynchronous function that fetches data from the `AppletMe` API and
	 * updates the state variables `applets`, `dispApplets`, and `loading` accordingly.
	 */
	const dataFetch = async () => {
	  try {
		const data: any = await AppletMe();
		setApplets(data.data);
		setDispApplets(data.data);
		setLoading(false);
	} catch (error) {
		console.error("error applet component", error);
	  }
	};

	/* The `useEffect` hook is used to perform side effects in functional components. In this case, the
	`useEffect` hook is used to add a listener to the navigation focus event. */
	useEffect(() => {
		const listener = navigation.addListener("focus", () => {
			dataFetch();
		});
	}, []);

	  return (
		  <ScrollView style={{ height: "100%", alignContent: "center" }} refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		  }>
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
			{(!loading && dispApplets) ? dispApplets.map((item: any) => (
			  <View style={styles.applet} key={item.id}>
				<AppletComponent
				  id={item.id}
				  name={reduceTitle(item.name)}
				  reactionsList={item.reactions}
				  actionSlug={item.actionSlug.split(".")[0]}
				  enabled={item.enabled}
				  author={item.user.username}
				/>
			  </View>
			)):
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#363841" />
			</View>
			}
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
