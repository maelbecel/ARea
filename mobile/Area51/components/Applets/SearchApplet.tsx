import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import FormInput from "../FormInput";
import AppletComponent from "./AppletComponent";

import AppletMe from "../../api/AppletMe";
import { ScrollView } from "react-native-gesture-handler";

const SearchApplet = () => {
	const [applets, setApplets] = useState<any>(null); // State to store applets
	const [dispApplets, setDispApplets] = useState<any>(null); // State to store applets
	const [loading, setLoading] = useState<boolean>(true); // State to store loading state

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
			const data: any = await AppletMe();
			setApplets(data.data);
			setDispApplets(data.data);
			setLoading(false);
		} catch (error) {
			console.error("error applet component", error);
		  }
		};
		dataFetch();
	}, []);

	  return (
		  <ScrollView style={{ height: "100%", alignContent: "center" }}>
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
