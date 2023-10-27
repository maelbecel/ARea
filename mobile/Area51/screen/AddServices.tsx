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
  let {actionInput} = (route.params != undefined ? route.params : "")
  let {reactionInput} = (route.params != undefined ? route.params : [])

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
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
        } else {
            Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
        }
        console.error("Error while getting info : ", error);
      }
    };
    fetchData();
  });

  const removeAction = async () => {
    await AsyncStorage.setItem('action', "default");
    actionInput = "";
    reactionInput = [];
    await AsyncStorage.setItem('reaction', JSON.stringify([]));
  };

  const removeItem = async (item : number) => {
    const reaction = JSON.parse(await AsyncStorage.getItem('reaction'));
    const tmp = [...reactionInput];
    reaction.splice(item, 1);
    tmp.splice(item, 1);
    reactionInput = tmp;
    await AsyncStorage.setItem('reaction', JSON.stringify(reaction));
  };

  const showReactions = () => {
    if (reaction.length == 0) {
      return (null)
    }
    return reaction.map((item, index) => {
      return (
        <View key={index} style={{ alignItems: 'center', backgroundColor: "#FFF", width: "100%"}}>
          <ActionChoose  type="reaction" slug={item} onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : index})}  onPressCross={() => {removeItem(index)}}/>
        </View>
      )
    })
  }

  /* The `return` statement in the code is rendering the JSX elements that will be displayed on the
  screen when the `AddServices` component is rendered. */
  return (
      <ScrollView style={{ backgroundColor: "#FFF", height: "100%", paddingTop: 0, marginTop: 20}} contentContainerStyle={{alignItems: 'center', flex: (reaction.length > 4) ? 0 : 1, justifyContent: "center"}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} onPressCross={removeAction}/>
        {showReactions()}
        {
          (reaction.length >= 9) ? null : (
            <Icon name="add-circle" size={40} color="#363841" />
          )
        }
        {
          (reaction.length >= 9) ? null : (
            <ActionChoose type="reaction" slug="default" onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : reaction.length})} />
          )
        }
        {(action != "default" && reaction.length > 0) ?
          <SubmitButton title="Continuer" onPress={newApplet} textcolor='#FFF' style={{}}/>
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