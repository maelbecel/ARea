import * as React from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import ActionChoose from '../components/ActionChoose';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Action from '../api/Action';
import Reaction from '../api/Reaction';
import ActionInfo from '../api/ActionInfo';
import ReactionInfo from '../api/ReactionInfo';
import AppletID from '../api/AppletID';
import TopBar from '../components/TopBar';
import AppletPatch from '../api/AppletPatch';
import * as Progress from 'react-native-progress';


const EditApplet = ({navigation, route}) => {
  const [action, setAction] = React.useState("default");
  const [reaction, setReaction] = React.useState<string[]>([]);
  const [actionInput, setActionInput] = React.useState(route.params != undefined ? route.params : [])
  const [reactionInput, setReactionInput] = React.useState(route.params != undefined ? route.params : [])
  const [title, setTitle] = React.useState("")
  const [loading, setLoading] = React.useState<number>(0);
  const [isloading, setisLoading] = React.useState<boolean>(true);
  const [loadingInfo, setLoadingInfo] = React.useState<string>("");
  const {id} = route.params

  /* The `React.useEffect` hook is used to perform side effects in functional components. In this case,
  it is used to fetch data from the server and update the component's state. */
  React.useEffect(() => {
    /**
     * The above function fetches data from an API and sets various states based on the received data.
     * @returns The function `fetchData` returns a Promise that resolves to `null` if the `data`
     * variable is `null`. Otherwise, it does not explicitly return anything.
     */
    const fetchData = async () => {
      try {
        const data = await AppletID(id);
        if (data == null) return null;
        setTitle(data.name);
        setAction(data.actionSlug);
        await AsyncStorage.setItem('action', data.actionSlug);
        let ac : string[] = []
        for (let i = 0; i < data.actionData.length; i++)
          ac[i] = data.actionData[i].value;
        setActionInput(ac);

        let reactionSlugs : string[] = []
        let rea : any[][] = []
        for (let i = 0; i < data.reactions.length; i++) {
          reactionSlugs[i] = data.reactions[i].reactionSlug;
          let tmp : any[] = [];
          for (let x = 0; x < data.reactions[i].reactionData.length; x++)
            tmp.push(data.reactions[i].reactionData[x].value)
          rea[i] = tmp;
        }
        setReactionInput(rea);
        setReaction(reactionSlugs);
        await AsyncStorage.setItem('reaction', JSON.stringify(reactionSlugs));
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
    setisLoading(false);
  }, []);


  /**
   * The function `newApplet` is an asynchronous function that creates a new applet by fetching actions
   * and reactions, getting their information, and then creating the applet with the provided data.
   * @returns nothing (undefined) if the condition `data == false` is true. Otherwise, it is navigating
   * to the "MyApplets" screen with the `id` parameter set to `data.id`.
   */
  const newApplet = async () => {

    /* The code is setting the loading state to 1 and displaying the loading information as "Getting
    actions". Then, it is calling the `Action` function with the `action` parameter to fetch the
    action inputs. After that, it initializes an empty array called `reactionInputs`. */
    setLoading(1);
    setLoadingInfo("Getting actions")
    const actionInputs = await Action(action)
    let reactionInputs = [];

    /* The code is setting the loading state to 10 and displaying the loading information as "Getting
    reactions". Then, it is iterating over the `reaction` array and calling the `Reaction` function
    with each reaction and action as parameters. The result of each function call is pushed into the
    `reactionInputs` array. After each iteration, the loading state is updated by adding `(i *
    (20/reaction.length))` to the current loading state. This is done to show the progress of
    fetching reactions. */
    setLoading(10);
    setLoadingInfo("Getting reactions")
    for (let i = 0; i < reaction.length; i++) {
      const reactionInput = await Reaction(reaction[i], action)
      reactionInputs.push(reactionInput)
      setLoading(10 + (i * (20/reaction.length)));
    }

    /* The code is setting the loading state to 30 and displaying the loading information as "Getting
    action informations". Then, it is calling the `ActionInfo` function with the `action` parameter
    to fetch information about the action. After that, it initializes an empty array called
    `reactionInfo`. */
    setLoading(30);
    setLoadingInfo("Getting action information")
    const actionInfo = await ActionInfo(action)
    const reactionInfo = [];

    /* The code is setting the loading state to 40 and displaying the loading information as "Getting
    reaction informations". Then, it is iterating over the `reaction` array and calling the
    `ReactionInfo` function with each reaction as a parameter. The result of each function call is
    pushed into the `reactionInfo` array. After each iteration, the loading state is updated by
    adding `(i * (30/reaction.length))` to the current loading state. This is done to show the
    progress of fetching reaction information. */
    setLoading(40);
    setLoadingInfo("Getting reaction informations")
    for (let i = 0; i < reaction.length; i++) {
      const reactionInf = await ReactionInfo(reaction[i])
      reactionInfo.push(reactionInf)
      setLoading(40 + (i * (30/reaction.length)));
    }

    /* The code block is responsible for creating a new applet. */
    setLoading(70);
    setLoadingInfo("Creating the applet")
    const data = await AppletPatch(title, action, actionInputs, actionInput, reaction, reactionInputs, reactionInput, id);

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

  /**
   * The function removes an item from an array and updates the state and AsyncStorage accordingly.
   * @param {number} item - The `item` parameter is a number that represents the index of the item to
   * be removed from the `reactionInput` and `reaction` arrays.
   */
  const removeItem = async (item : number) => {
    const tmp = [...reactionInput];
    tmp.splice(item, 1);
    setReactionInput(tmp);
    const rec = [...reaction]
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
          <ActionChoose  type="reaction" slug={item} onPress={() => (action === "default") ? null : navigation.navigate('SearchServicesEdit', {id : id, type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : index})}  onPressCross={() => {removeItem(index)}}/>
        </View>
      )
    })
  }

  /**
   * The function "resetAll" resets the action and reaction inputs and saves the default values in
   * AsyncStorage.
   */
  const resetAll = async () => {
    setActionInput("default");
    await AsyncStorage.setItem('action', "default");
    setReactionInput([]);
    await AsyncStorage.setItem('reaction', "[]");
  }

  if (isloading) {
    return (
      <View>
        <View style={{backgroundColor: "#FFF", paddingTop: 50}}>
          <TopBar title="Edit"  iconLeft='arrow-back' onPressLeft={() => (navigation.goBack(), resetAll())} color={"#363841"} />
        </View>
      </View>
    )
  }

  return (loading == 0) ? (
    <View>
      <View style={{backgroundColor: "#FFF", paddingTop: 50}}>
        <TopBar title="Edit"  iconLeft='arrow-back' onPressLeft={() => (navigation.goBack(), resetAll())} color={"#363841"} />
      </View>
      <ScrollView style={{ backgroundColor: "#FFF", height: "80%", paddingTop: 0, marginTop: 0}} contentContainerStyle={{alignItems: 'center', flex: 0, justifyContent: "center"}}>
        <ActionChoose type="action" slug={action} onPress={() => navigation.navigate('SearchServices', {type: "action"})} onPressCross={resetAll}/>
        {showReactions()}
        {
          (reaction.length >= 9) ? null : (
            <Icon name="add-circle" size={40} color="#363841" />
          )
        }
        {
          (reaction.length >= 9) ? null : (
            <ActionChoose type="reaction" slug="default" onPress={() => (action === "default") ? null : navigation.navigate('SearchServicesEdit', {id : id, type: "reaction", actionInput : actionInput, reactionInput : reactionInput, index : reaction.length})} />
          )
        }
        {(action != "default" && reaction.length > 0) ?
          <SubmitButton title="Continue" onPress={newApplet} textcolor='#FFF' style={{}}/>
          : null
        }
      </ScrollView>
      </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#363841' }}>Loading...</Text>
      <Text style={{ textAlign: 'center', fontSize: 25, color: '#363841' }}>{loadingInfo}</Text>
      <Progress.Bar progress={loading / 100.0} width={300} height={30} style={{borderRadius : 90}} color="#363841"/>
    </View>
  );
}
/* The line `export default EditApplet;` is exporting the `EditApplet` component as the default export
of the file. This means that when another file imports this file, they can import the `EditApplet`
component directly without having to specify its name. For example, in another file, you can write
`import EditApplet from './EditApplet';` to import the `EditApplet` component. */

export default EditApplet;