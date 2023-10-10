/* The code is importing various modules and components that are needed for the functionality of the
`AddServices` component. */
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

/* The code defines a functional component called `AddServices` that takes two props, `navigation` and
`route`. */
const AddServices = ({navigation, route}) => {
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState("default");
  const {actionInput, reactionInput} = (route.params != undefined ? route.params : "")

  /**
   * The function `newApplet` creates a new applet by getting action and reaction inputs, calling the
   * AppletApi function, setting default values for action and reaction, and navigating to the "My
   * Applets" screen.
   */
  const newApplet = async () => {
    const actionInputs = await Action(action)
    const reactionInputs = await Reaction(reaction, action)
    AppletApi("Test", action, actionInputs, actionInput, reaction, reactionInputs, reactionInput)
    await AsyncStorage.setItem('action', "default");
    await AsyncStorage.setItem('reaction', "default");
    navigation.navigate("My Applets")
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
        setReaction((reaction === null) ? "default" : reaction);
      } catch (error) {
        console.log("Error while getting info : ", error);
      }
    };
    fetchData();
  });

  /* The `return` statement in the code is rendering the JSX elements that will be displayed on the
  screen when the `AddServices` component is rendered. */
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF" }}>
      <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} />
      <Icon name="add-circle" size={40} color="#363841" />
      <ActionChoose type="reaction" slug={reaction} onPress={() => (action === "default") ? null : navigation.navigate('SearchServices', {type: "reaction", actionInput : actionInput, reactionInput : reactionInput})} />
      <Icon name="add-circle" size={40} color="#363841" />
      <SubmitButton title="Continuer" onPress={newApplet} textcolor='#FFF'/>
    </View>
  );
}

/* The line `export default AddServices;` is exporting the `AddServices` component as the default
export of the module. This allows other modules to import and use the `AddServices` component by
simply importing it without specifying a specific name for the import. For example, in another
module, you can import the `AddServices` component like this: `import AddServices from
'./AddServices';`. */
export default AddServices;