import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, RefreshControl } from "react-native";

import FormInput from "../FormInput";
import AppletComponent from "./AppletComponent";

import AppletMe from "../../api/AppletMe";
import { ScrollView } from "react-native-gesture-handler";

const SearchApplet: React.FC = () => {
	const [applets, setApplets] = useState<any>(null); // State to store applets
	const [dispApplets, setDispApplets] = useState<any>(null); // State to store applets
	const [loading, setLoading] = useState<boolean>(true); // State to store loading state
	const [refreshing, setRefreshing] = useState<boolean>(false); // State to store refreshing state

	const reduceTitle = (title: string) => {
		if (title.length > 50) {
			return title.slice(0, 50) + "...";
		}
		return title;
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setApplets(null);
		setDispApplets(null);
		await dataFetch();
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	  }, []);

	const filterApplets = (name : string) => {
		if (applets == null) return;
		let tmp = applets.filter((service: any) => service.name.toLowerCase().includes(name.toLowerCase()));
		setDispApplets(tmp);
	}

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

	useEffect(() => {
		dataFetch();
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
			<ActivityIndicator size="large" color="#363841" />
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
