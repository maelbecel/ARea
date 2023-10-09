import * as React from 'react';
import { Text, View } from 'react-native';
import ActionChoose from '../components/ActionChoose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AppletApi from '../api/Applet';
import Action from '../api/Action';
import Reaction from '../api/Reaction';

const AddServices = ({navigation, route}) => {
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState("default");
  const {actionInput, reactionInput} = (route.params != undefined ? route.params : "")

  const newApplet = async () => {
    const actionInputs = await Action(action)
    const reactionInputs = await Reaction(reaction, action)
    AppletApi("Test", action, actionInputs, actionInput, reaction, reactionInputs, reactionInput)
    await AsyncStorage.setItem('action', "default");
    await AsyncStorage.setItem('reaction', "default");
    navigation.navigate("My Applets")
  }

  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const action = await AsyncStorage.getItem('action');
        const reaction = await AsyncStorage.getItem('reaction');
        setAction((action === null) ? "default" : action);
        setReaction((reaction === null) ? "default" : reaction);
      } catch (error) {
        console.log("Error while getting info : ", error);
      }
    };
    fetchData();
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} />
      <Icon name="add-circle" size={40} color="#363841" />
      <ActionChoose type="reaction" slug={reaction} onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput})} />
      <SubmitButton title="Continuer" onPress={newApplet} textcolor='#FFF'/>
    </View>
  );
}

export default AddServices;