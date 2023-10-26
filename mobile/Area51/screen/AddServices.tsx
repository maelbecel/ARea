/* The code is importing various modules and components that are needed for the functionality of the
`AddServices` component. */
import * as React from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import ActionChoose from '../components/ActionChoose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AppletApi from '../api/Applet';
import Action from '../api/Action';
import Reaction from '../api/Reaction';
import ActionInfo from '../api/ActionInfo';
import ReactionInfo from '../api/ReactionInfo';

/* The code defines a functional component called `AddServices` that takes two props, `navigation` and
`route`. */
const AddServices = ({navigation, route}) => {
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState<string[]>([]);
  const {actionInput} = (route.params != undefined ? route.params : "")
  const {reactionInput} = (route.params != undefined ? route.params : [])

  /**
   * The function `newApplet` creates a new applet by getting action and reaction inputs, calling the
   * AppletApi function, setting default values for action and reaction, and navigating to the "My
   * Applets" screen.
   */
  const newApplet = async () => {
    const actionInputs = await Action(action)
    let reactionInputs = [];
    for (const input of reaction) {
      const reactionInput = await Reaction(input, action)
      reactionInputs.push(reactionInput)
    }
    const actionInfo = await ActionInfo(action)
    const reactionInfo = [];
    for (const input of reaction) {
      const reactionInf = await ReactionInfo(input)
      reactionInfo.push(reactionInf)
    }
    // await ReactionInfo(reaction)
    let title = reactionInfo[0].name
    for (let i = 1; i < reactionInfo.length; i++) {
      title += " and " + reactionInfo[i].name
    }
    title += " if " + actionInfo.name
    if (title == undefined || action == "default" || actionInputs == undefined || reactionInputs == undefined || reaction.length == 0) {
      alert("Error")
      return
    }
    const data = await AppletApi(title, action, actionInputs, actionInput, reaction, reactionInputs, reactionInput);
    if (data == false) {
      alert("Error")
      return
    } else {

      await AsyncStorage.setItem('action', "default");
      await AsyncStorage.setItem('reaction', "[]");
      navigation.navigate("MyApplets", { id: data.id});
    }
  }

  /* The `useFocusEffect` hook is a React Navigation hook that allows you to perform side effects when
  the screen comes into focus. In this code, it is used to fetch data from AsyncStorage and update
  the state variables `action` and `reaction` when the screen is focused. */
  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const action = await AsyncStorage.getItem('action');
        const reaction = await AsyncStorage.getItem('reaction');
        setAction((action === null) ? "default" : action);
        setReaction((reaction === null) ? [] : JSON.parse(reaction));
      } catch (error) {
        console.error("Error while getting info : ", error);
      }
    };
    fetchData();
  });

  const showReactions = () => {
    if (reaction.length == 0) {
      return (null)
    }
    return reaction.map((item, index) => {
      return (
        <View key={index} style={{ alignItems: 'center', backgroundColor: "#FFF", width: "100%"}}>
          <ActionChoose  type="reaction" slug={item} onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : index})} />
          <Icon name="add-circle" size={40} color="#363841" />
        </View>
      )
    })
  }

  /* The `return` statement in the code is rendering the JSX elements that will be displayed on the
  screen when the `AddServices` component is rendered. */
  return (
      <ScrollView style={{ backgroundColor: "#FFF", height: "90%", paddingTop: 50}} contentContainerStyle={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} />
        <Icon name="add-circle" size={40} color="#363841" />
        {showReactions()}
        <ActionChoose type="reaction" slug="default" onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : reaction.length})} />
        {(action != "default" && reaction.length > 0) ?
          <SubmitButton title="Continuer" onPress={newApplet} textcolor='#FFF' style={{paddingBottom: 200}}/>
          : null
        }
      </ScrollView>
  );
}

/* The line `export default AddServices;` is exporting the `AddServices` component as the default
export of the module. This allows other modules to import and use the `AddServices` component by
simply importing it without specifying a specific name for the import. For example, in another
module, you can import the `AddServices` component like this: `import AddServices from
'./AddServices';`. */
export default AddServices;