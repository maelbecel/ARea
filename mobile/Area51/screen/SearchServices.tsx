import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import Services from '../api/Services';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import TopBar from '../components/TopBar';

const SearchServices = ({ navigation, route }) => {
  const [applets, setApplets] = useState([]); // State to store applets
  const { type }  = route.params;

  useEffect(() => {
    const fetchApplets = async () => {
      try {
        const services = await Services();
        setApplets(services);
      } catch (error) {
        console.log('Error fetching applets:', error);
      }
    };

    fetchApplets();
  }, [type]);

  const filteredApplets = applets.filter((service) => {
    if (type === "action") return service.action === true;
    if (type === "reaction") return service.reaction === true;
    return true; // Include all applets if type is not specified
  });

  return (
    <View style={styles.container}>
      <TopBar title="Create" iconLeft='menu' color="#000" onPressLeft={() => navigation.goBack()} />
      <View style={styles.input}>
        <FormInput title="Search" icon={{ name: "search", width: 27, height: 27 }} onChangeText={(text) => { console.log(text) }} size='85%' />
      </View>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.services}>
          {filteredApplets.length === 0 ? <Text>No result</Text> : (
            filteredApplets.map((service) => (
              <ServiceCard key={service.slug} logo={service.decoration.logoUrl} onPress={() => navigation.navigate('ServiceTemplate', { slug: service.slug, type: type })} title={service.name} slug={service.slug} color={service.decoration.backgroundColor} />
            ))
          )}
        </View>
      </ScrollView>
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
  services: {
    alignContent: "center",
    alignItems: "center",
  },
});

export default SearchServices;
