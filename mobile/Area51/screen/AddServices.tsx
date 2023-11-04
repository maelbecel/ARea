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
import * as Progress from 'react-native-progress';

/* The code defines a functional component called `AddServices` that takes two props, `navigation` and
`route`. */
const AddServices = ({navigation, route}) => {
  /* The code is using the `React.useState` hook to define and initialize state variables in the
  `AddServices` component. */
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<number>(0);
  const [loadingInfo, setLoadingInfo] = React.useState<string>("");
  let {actionInput} = (route.params != undefined ? route.params : "")
  let {reactionInput} = (route.params != undefined ? route.params : [])

  /**
   * The function `newApplet` creates a new applet by getting action and reaction inputs, calling the
   * AppletApi function, setting default values for action and reaction, and navigating to the "My
   * Applets" screen.
   */
  const newApplet = async () => {

    setLoading(1);
    setLoadingInfo("Getting actions")
    const actionInputs : any[] = await Action(action)
    let reactionInputs : any[] = [];

    setLoading(10);
    setLoadingInfo("Getting reactions")
    for (const input of reaction) {
      const reactionInput : any[] = await Reaction(input, action)
      reactionInputs.push(reactionInput)
    }

    setLoading(30);
    setLoadingInfo("Getting action informations")
    const actionInfo : any = await ActionInfo(action)
    const reactionInfo : any[] = [];

    setLoading(40);
    setLoadingInfo("Getting reaction informations")
    for (const input of reaction) {
      const reactionInf : any = await ReactionInfo(input)
      reactionInfo.push(reactionInf)
    }

    setLoading(60);
    setLoadingInfo("Creating title")
    let title : string = reactionInfo[0].name
    for (let i = 1; i < reactionInfo.length; i++) {
      title += " and " + reactionInfo[i].name
    }
    title += " if " + actionInfo.name
    if (title == undefined || action == "default" || actionInputs == undefined || reactionInputs == undefined || reaction.length == 0) {
      alert("Error")
      setLoading(0);
      return
    }

    setLoading(80);
    setLoadingInfo("Creating the applet")
    const data : any = await AppletApi(title, action, actionInputs, actionInput, reaction, reactionInputs, reactionInput);
    if (data == false) {
      setLoading(0);
      return
    } else {
      await AsyncStorage.setItem('action', "default");
      await AsyncStorage.setItem('reaction', "[]");
      navigation.navigate("MyApplets", { id: data.id});
    }
    setLoading(0);
  }

  /* The `useFocusEffect` hook is a React Navigation hook that allows you to perform side effects when
  the screen comes into focus. In this code, it is used to fetch data from AsyncStorage and update
  the state variables `action` and `reaction` when the screen is focused. */
  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const action : string = await AsyncStorage.getItem('action');
        const reaction : string = await AsyncStorage.getItem('reaction');
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

  /**
   * The function `removeItem` removes an item from an array and updates the state and AsyncStorage
   * accordingly.
   * @param {number} item - The `item` parameter is a number that represents the index of the item you
   * want to remove from the `reactionInput` and `reaction` arrays.
   */
  const removeItem = async (item : number) => {
    const tmp : any[] = [...reactionInput];
    tmp.splice(item, 1);
    reactionInput = tmp;
    const rec : any[] = [...reaction]
    rec.splice(item, 1);
    setReaction(rec);
    await AsyncStorage.setItem('reaction', JSON.stringify(rec));
  };

  /**
   * The function "showReactions" returns a list of React components based on the "reaction" array,
   * with each component containing an "ActionChoose" component.
   * @returns The function `showReactions` returns a JSX element.
   */
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

  /**
   * The function resets the values of actionInput and reactionInput and saves them in AsyncStorage.
   */
  const resetAll = async () => {
    actionInput = "default";
    await AsyncStorage.setItem('action', "default");
    reactionInput = [];
    await AsyncStorage.setItem('reaction', "[]");
  }

  /* The `return` statement in the code is rendering the JSX elements that will be displayed on the
  screen when the `AddServices` component is rendered. */
  return (loading == 0) ? (
      <ScrollView style={{ backgroundColor: "#FFF", height: "100%", paddingTop: 20}} contentContainerStyle={{alignItems: 'center', flex: (reaction.length > 4) ? 0 : 1, justifyContent: "center"}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} onPressCross={resetAll}/>
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
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#363841' }}>Loading...</Text>
      <Text style={{ textAlign: 'center', fontSize: 25, color: '#363841' }}>{loadingInfo}</Text>
      <Progress.Bar progress={loading / 100.0} width={300} height={30} style={{borderRadius : 90}} color="#363841"/>
    </View>
  );
}

/* The line `export default AddServices;` is exporting the `AddServices` component as the default
export of the module. This allows other modules to import and use the `AddServices` component by
simply importing it without specifying a specific name for the import. For example, in another
module, you can import the `AddServices` component like this: `import AddServices from
'./AddServices';`. */
export default AddServices;