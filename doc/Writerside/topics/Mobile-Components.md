# Mobile-Components

## [AppletComponent.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/AppletComponent.tsx)

The `AppletComponent` is the component that will be used to display the applets in the mobile application. It is a simple component that will display the name of the applet and the icon of the applet. It will also display the number of unread messages in the applet.

![AppletComponent.png](../images/mobileComponents/AppletComponent.png)

The `AppletProps` interface is defining the structure of an object that represents the props passed
to the `AppletComponent` component. It has the following properties:
* `id` : the id of the applet
* `name` : the name of the applet
* `actionSlug` : the slug of the action of the applet
* `reactionsList` : the list of the reactions of the applet
* `enabled` : a boolean that indicates if the applet is enabled or not
* `author` : the author of the applet

```typescript 
interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionsList: ReactionListProps[];
    enabled: boolean;
    author: string;
}
```

The `ReactionListProps` interface is defining the structure of an object that represents a list of
reactions for an applet. It has two properties:
* `reactionSlug` : the slug of the reaction
* `reactionData` : the data of the reaction

```Typescript
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}
```

This permit to create the following `AppletComponent` component:

```typescript
const AppletComponent: React.FC<AppletProps> = ({ id, name, actionSlug, reactionsList, enabled, author }) 
```

The code is using the `React.useState` hook to define and initialize state variables in the
`AppletComponent` component.

```typescript
    const [bgColor, setBgColor] = useState<string>("");
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
```

We create a function to fetch the data. The function `dataFetch` is an asynchronous function that fetches data using the `AppletDetails`
function and sets the background color based on the fetched data. The `slug` parameter is a string that represents a unique identifier for 
a specific item or resource. It is used as a parameter in the `dataFetch` function to fetch data related to that specific slug.

```typescript
const dataFetch = async (slug : string) => {
        try {
            const data = await AppletDetails(slug);
            setBgColor(data?.data?.decoration?.backgroundColor);
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };
```

The `useEffect` hook is used to perform side effects in a functional component. In this case, it
is used to fetch data and set the background color based on the fetched data.

```typescript
    useEffect(() => {
        dataFetch(actionSlug);
    }, [navigation]);
```

The `return` statement in the code is rendering the JSX elements based on the value of the
`loading` state: 
* If the value of the `loading` state is `false`, the `return` statement is :
```typescript 
        <TouchableOpacity style={{ ...styles.container, backgroundColor: bgColor} } onPress={() => navigation.navigate('MyApplets', { id: id })}>
            <View style={[ styles.card, {marginBottom: 10, flexWrap: "wrap" }]}>
                    {actionSlug && (
                        <LogoApplet
                        slug={actionSlug}
                        color={bgColor}
                        />
                    )}
                    {/* Loop through reactionsList */}
                    {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index} style={{  }}>
                            <ReactionLogo
                                reaction={reaction}
                                bgColor={bgColor}
                            />
                        </View>
                    ))}
            </View>
            <View style={ { ...styles.card, marginBottom: 10 } }>
                <Text style={ [ styles.title, { color: getWriteColor(bgColor) }] }>
                {name}
                </Text>
            </View>
            <Text style={ styles.author }>
                by {author}
            </Text>
            <View style={[ styles.card, { marginTop: '3%'}] }>
                <ToggleSwitch
                    isChecked={enabled}
                    isDisabled={false}
                    yesLabel="Enabled"
                    noLabel="Disabled"
                    bgColor={bgColor}
                />
            </View>
        </TouchableOpacity>
```
* Otherwise, the `return` statement is a loading logo:

```typescript
<View style={{backgroundColor: bgColor, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#363841" />
</View>
```

The `ReactionLogo` component renders a logo based on the given reaction and background color. It takes `reaction` as parameter: This is an object that contains information about a reaction. It likely has
properties such as `reactionSlug` which is a string representing the slug of the reaction. The `ReactionLogo` component is returning a `LogoApplet` component with the `slug` prop set
to the first part of the `reactionSlug` string (obtained by splitting it at the dot) and the `color` prop set to the value of the `bgColor` prop.

```typescript
const ReactionLogo: React.FC<ReactionProps> = ({ reaction, bgColor }) => {
    return (
        <LogoApplet
            slug={reaction.reactionSlug.split(".")[0]}
            color={bgColor}
        />
    );
};
```

The `ReactionProps` interface is defining the structure of an object that represents the props
passed to the `ReactionLogo` component. It has two properties:

```Typescript
interface ReactionProps {
    reaction: ReactionListProps;
    bgColor: string;
}
```

The `const styles` declaration is creating a JavaScript object that contains a set of styles for the
components in the React Native code. The `StyleSheet.create()` function is used to create a
stylesheet object that optimizes the styles for performance.

```typescript
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        margin: 15,
        width: '85%',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    author: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 26
    },
});
```

The `export default AppletComponent;` statement is exporting the `AppletComponent` component as the
default export of the module. This means that when another file imports this module, it can access
the `AppletComponent` component directly without having to specify its name in curly braces. For
example, in another file, you can import the `AppletComponent` like this: `import AppletComponent
from './AppletComponent';`.

```javascript 
export default AppletComponent;
```

For more information about this file you can check his complete code here : [Activity.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/AppletComponent.tsx)


## [AppletInfoContainer.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/AppletInfoContainer.tsx)

The `AppletInfoContainer` component is the component that will be used to display the information of an applet in the mobile application. It is a simple component that will display the name of the applet, the icon of the applet, the description of the applet, the author of the applet and the reactions of the applet.

![AppletInfoContainer-1.png](../images/mobileComponents/AppletInfoContainer-1.png)

<img height="684" alt="AppletInfoContainer" src="AppletInfoContainer-2.png" width="364"/>

The `AppletInfoContainerProps` interface is defining the type of props that the
`AppletInfoContainer` component expects to receive. It specifies the names and
types of the props, such as `name` (a string), `color` (a string), `actionSlug`
(a string), `reactionSlug` (a string), `user` (a string), `enabled` (a
boolean), `createdAt` (a number), and `lastTriggerDate` (a number). By defining
this interface, it helps ensure that the component is used correctly and that
the props passed to it have the expected types. Here are the props that the
`AppletInfoContainer` component expects to receive:
* `name` : the name of the applet
* `color` : the color of the applet
* `actionSlug` : the slug of the action of the applet
* `reactionsList` : the list of the reactions of the applet
* `user` : the author of the applet
* `enabled` : a boolean that indicates if the applet is enabled or not
* `id` : the id of the applet
* `createdAt` : the date of creation of the applet
* `lastTriggerDate` : the date of the last trigger of the applet
* `notif` : a boolean that indicates if the applet has notifications or not

```typescript
interface AppletInfoContainerProps {
    name: string;
    color: string;
    actionSlug: string;
    reactionsList: ReactionListProps[];
    user: string;
    enabled: boolean;
    id: number;
    createdAt?: number;
    lastTriggerDate?: number;
    notif: boolean;
}
```

The `ReactionListProps` interface is defining the type of props that the `AppletInfoContainer`
component expects to receive for the `reactionsList` prop. It specifies that the `reactionsList`
prop should be an array of objects with two properties:
* `reactionSlug` : the slug of the reaction
* `reactionData` : the data of the reaction

```typescript
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}
```

The `AppletInfoContainer` component is a functional component that takes the
`AppletInfoContainerProps` as a parameter. It returns a `View` component that
contains the JSX elements that will be rendered by the component.

```Typescript
const AppletInfoContainer: React.FC<AppletInfoContainerProps> = ({ name, color, actionSlug, reactionsList, user, enabled, id, createdAt = 0, lastTriggerDate = 0, notif })
```

The code is using the `React.useState` hook to define and initialize state variables in the
`AppletInfoContainer` component.

```Typescript 
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");
    const [title, setTitle] = useState<string>(name);
    const navigation: any = useNavigation();
```

The `useEffect` hook in this code is used to perform side effects in a
functional component. It takes two arguments: a callback function and an array
of dependencies. The function `dataFetch` retrieves data, formats dates, and stores an applet ID in AsyncStorage.

```Typescript
    useEffect(() => {
        const dataFetch = async () => {
            if (createdAt !== 0) {
                const createdAtDate = new Date(createdAt * 1000);
                const lastUpdateDate = new Date(lastTriggerDate * 1000);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
                setLastUseDate(formattedLastUseDate);
                setFormattedDate(formattedDate);
            }
            await AsyncStorage.setItem('appletID', id.toString());
        };
        dataFetch();
    }, []);
```

The function `handleTitleChange` updates the title state and saves it to AsyncStorage if the text length is less than 141 characters. The `text` parameter is a string that represents the new title value that
is being passed to the `handleTitleChange` function.

```typescript 
    const handleTitleChange = async (text: string) => {
        if (text.length < 141) {
            setTitle(text);
            await AsyncStorage.setItem('title', text);
        }
    };
```

The return statement in the code is rendering the JSX elements in two parts:
* The first part contain the header of the applet :

![AppletInfoContainer-3.png](../images/mobileComponents/AppletInfoContainer-3.png)

```typescript 
            <View style={{ ...styles.header, backgroundColor: color.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : color }}>
                {/* The applet's logo */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Info', { slug: actionSlug.split('.')[0] })}>
                        {actionSlug &&
                            <LogoApplet
                                slug={actionSlug.split('.')[0]}
                                color={color}
                            />}
                    </TouchableOpacity>
                    {/* Loop through reactionsList */}
                    {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Info', { slug: reaction.reactionSlug.split('.')[0] })}>
                                <LogoApplet
                                    slug={reaction.reactionSlug.split('.')[0]}
                                    color={color}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* The title of the applet */}
                <OutlinedTitleBox value={title} bgColor={color} author={user} onChangeText={handleTitleChange} />

            </View>
```

* The second part is the body of the container :

![AppletInfoContainer-4.png](../images/mobileComponents/AppletInfoContainer-4.png)

```Typescript
            <View style={styles.body}>
                {/* The toggle switch that enables or disables the applet */}
                <View style={styles.toggleSwitch}>
                    <ToggleSwitch
                        isChecked={enabled}
                        isDisabled={false}
                        yesLabel="Enabled"
                        noLabel="Disabled"
                        bgColor='#121212'
                        toggleColor={color.toLocaleLowerCase() == "#ffffff" ? "#eeeeee" : color}
                        darkMode={false}
                        bigSwitch={true}
                    />
                </View>

                <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactionsList={reactionsList} />

                <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, marginTop: '1%' }}>
                    {formattedDate ? (
                        `Created at ${formattedDate}`
                    ) : (
                        "Date of creation not accessible"
                    )}
                </Text>
                <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, marginTop: '1%' }}>
                    {LastUseDate ? (
                        `Last use ${formattedDate}`
                    ) : (
                        "Never used yet"
                    )}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22, alignContent: 'center', alignItems: 'center' }}>Notify me</Text>
                    <SwitchNotifyMe isChecked={notif} isDisabled={false} />
                </View>
                <DeleteModal id={id} />
            </View>
```

The `const styles` declaration is creating a JavaScript object that contains a set of styles for
different elements in the `AppletInfoContainer` component. Each key in the object represents a style
property, such as `container`, `header`, `title`, `text`, `toggleSwitch`, and `body`. The
corresponding value for each key is an object that defines the specific style properties and their
values for that element.

```typescript
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: '5%',
        paddingTop: '3%',
        paddingBottom: '10%',
        marginBottom: '5%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginBottom: '2%',
    },
    text: {
        fontSize: 16,
    },
    toggleSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    },
    body: {
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
});
```

The `export default AppletInfoContainer;` statement is exporting the `AppletInfoContainer` component
as the default export of the module. This means that when another file imports this module, it can
access the `AppletInfoContainer` component directly without having to specify its name in curly
braces. For example, in another file, you can import the `AppletInfoContainer` like this: `import
AppletInfoContainer from './AppletInfoContainer';`.

```typescript
export default AppletInfoContainer;
```

For more information about this file you can check his complete code here : [AppletInfoContainer.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/AppletInfoContainer.tsx)

## [Logo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/Logo.tsx)

The `Logo` component is the component that will be used to display the logo of an applet in the mobile application. It is a simple component that will display the logo of the applet.

![Logo.png](../images/mobileComponents/Logo.png)

The `interface CardProps` is defining the props that can be passed to the `LogoApplet` component. It
extends the `TouchableOpacityProps` interface, which includes all the props that can be passed to
the `TouchableOpacity` component from React Native. It has the following properties:
* `slug` : the slug of the service
* `onPress` : a function that will be called when the user presses the logo
* `color` : the color of the logo background

```typescript 
interface CardProps extends TouchableOpacityProps {
    slug    : string;
    onPress ?: () => void;
    color   ?: string;
}
```

The `LogoApplet` component is a functional component that takes the `CardProps` as a parameter. The component renders a `TouchableOpacity` or `View` depending on whether the `onPress`
prop is defined or not. It displays a logo from of a service.

```typescript
const LogoApplet: React.FC<CardProps> = ({ slug , onPress, color = "#ffffff"}) 
```

The code is using the `React.useState` hook to define and initialize state variables in the
`LogoApplet` component.

```typescript
    const [bgColor, setColor] = React.useState<string>("EEEEEE");
    const [logo, setLogo] = React.useState<string>("https://via.placeholder.com/50");
    const [loading, setLoading] = React.useState<boolean>(true);
```

The `React.useEffect` hook is used to perform side effects in functional components. In this
case, it is used to fetch information from the `ServiceInfo` API and update the component's
state.

```typescript 
    React.useEffect(() => {
        const fetchInfos = async () => {
            const res = await ServiceInfo(slug);
            setColor(res.decoration.backgroundColor);
            setLogo(res.decoration.logoUrl);
            setLoading(false);
        }
        fetchInfos();
    }, []);
```

The function checks if a given color is light or not. It uses a `color` parameter that is a string representing a color.
It returns true if the color is considered light, and false if not
```typescript
    const isLight = (color: string) => {
        if (color.charAt(0) === '#') {
            color = color.substr(1);
        }
        if (color.length === 3) {
            color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
        }
        if (color.toLocaleLowerCase() === 'ffffff') {
            return false;
        }
        return true;
    }
```

Then, if `loading` is true the component will be display in two different ways :
* If `onPress` is defined, a `TouchableOpacity`
```typescript 
<TouchableOpacity onPress={onPress} style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
    <Image source={{ uri: logo, cache: 'force-cache'}} style={[styles.logopti]} />
</TouchableOpacity>
```
* Otherwise, a `View`
```typescript
<View style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
    <Image source={{ uri: logo, cache: 'force-cache' }} style={[styles.logopti]} />
</View>
```

The `const styles` variable is an object that contains style definitions for the `LogoApplet`
component. It uses the `StyleSheet.create` method from React Native to create a stylesheet object.

```typescript
  const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    logopti: {
        height: 40,
        width: 40,
        alignSelf: 'center',
    }
  });
```

The `export default LogoApplet;` statement is exporting the `LogoApplet` component as the default
export of the module. This means that when another file imports this module, it can access the
`LogoApplet` component directly without having to specify its name in curly braces. For example, in
another file, you can import the `LogoApplet` like this: `import LogoApplet from './LogoApplet';`.

```typescript
export default LogoApplet;
```

For more information about this file you can check his complete code here : [Logo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/Logo.tsx)

## [MoreDetails.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/MoreDetails.tsx)

The `MoreDetails` component is the component that will be used to display the details of an applet in the mobile application. It is a simple component that will display the details of the applet.

![MoreDetails-1.png](../images/mobileComponents/MoreDetails-1.png){style="inline"}

<img height="684" alt="MoreDetails-2" src="MoreDetails-2.png" width="364"/>

The `ButtonProps` interface is defining the type of props that the `MoreDetailsButton` component
expects to receive. It has three properties:
* `isToggle` : a boolean that indicates if the button is a toggle or not
* `actionSlug` : the slug of the action of the applet
* `reactionsList` : the list of the reactions of the applet

```typescript
interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionsList: ReactionListProps[];
}
```

The `ReactionListProps` interface is defining the type of props that the `MoreDetailsButton`
component expects to receive. It has two properties:
* `reactionSlug` : the slug of the reaction
* `reactionData` : the data of the reaction

```typescript
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}
```

The `MoreDetailsButton` component is a React functional component that displays a button that
toggles between showing more details and fewer details.

```typescript
const MoreDetailsButton = ({ isToggle, actionSlug, reactionsList }: ButtonProps)
```

The code is using the `React.useState` hook to define and initialize state variables in the
`MoreDetailsButton` component.

```typescript
    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(isToggle);
    const [actionInfos, setActionInfos] = useState<any>("");
    const [reactionInfos, setReactionInfos] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);
```

The handleClick function toggles the value of isButtonToggle.

```typescript
    const handleClick = () => {
        setIsButtonToggle(!isButtonToggle);
    };
```

The `useEffect` hook is used to perform side effects in a functional component. In this case,
the `useEffect` hook is used to fetch data from the server and update the component's state.
The function `dataFetch` fetches action and reaction information, sets the fetched data in
state variables, and handles any errors that occur during the process.

```typescript 
    useEffect(() => {
        const dataFetch = async () => {
            try {
                const actionInfos = await ActionInfo(actionSlug);
                const reactionInfos = [];
                for (let i = 0; i < reactionsList.length; i++) {
                    const reactionInfo = await ReactionInfo(reactionsList[i].reactionSlug);
                    reactionInfos.push(reactionInfo);
                }
                setActionInfos(actionInfos);
                setReactionInfos(reactionInfos);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        dataFetch();
    }, []);
```

The `return` statement in the code is rendering the JSX elements based on the value of the
`loading` state and the `isButtonToggle` status. It has two different return possibility:
* The first one if the `isButtonToggle` is `true`, we return the information about the applets.

![MoreDetails-2.png](../images/mobileComponents/MoreDetails-2.png)

```typescript
                <View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View>
                                {actionSlug &&
                                <LogoApplet
                                    slug={actionSlug.split('.')[0]}
                                />}
                            </View>

                            <View style={{ marginLeft: 30, width: '70%' }}>
                                <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>{actionInfos.name}</Text>
                                <Text style={{ color: "#363841", fontSize: 22 }}>{actionInfos.description}</Text>
                            </View>
                        </View>
                    </View>


                    <View>
                        {/* Loop through reactionsList */}
                        {reactionsList && reactionsList.map((reaction: any, index: number) => (
                        <View key={index}>
                            <View style={ styles.separator } />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <LogoApplet
                                slug={reaction.reactionSlug.split('.')[0]}
                                />
                                <View style={{ marginLeft: 30, width: '70%' }}>
                                    <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>{reactionInfos[index].name}</Text>
                                    <Text style={{ color: "#363841", fontSize: 22 }}>{reactionInfos[index].description}</Text>
                                </View>
                            </View>
                        </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleClick} style={{ alignItems: "center", marginTop: 30, marginBottom: 20 }}>
                        <Text style={{ color: "#939596", fontWeight: "bold", fontSize: 18 }}>Fewer Details</Text>
                    </TouchableOpacity>
                </View>
```

* Otherwise, we return the button to show more details.

![MoreDetails-1.png](../images/mobileComponents/MoreDetails-1.png)

```typescript
<TouchableOpacity onPress={handleClick} style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
     <Text style={{ color: "#939596", fontWeight: "bold", fontSize: 18 }}>More Details</Text>
</TouchableOpacity>
```

The `const styles` variable is an object that contains a style definition for a separator element.
The `StyleSheet.create()` function is used to create a stylesheet object that can be used to define
styles for React Native components. In this case, the `separator` style defines the padding,
background color, and margins for the separator element.

```typescript
const styles = StyleSheet.create({
    separator: {
        paddingVertical: "8%",
        backgroundColor: "#36384138",
        marginRight: "92.5%",
        marginLeft: "6.5%",
    },
});
```

The line `export default MoreDetailsButton;` is exporting the `MoreDetailsButton` component as the
default export of the module. This means that when another file imports this module, it can import
the `MoreDetailsButton` component using any name of its choice. For example, in another file, you
can import the `MoreDetailsButton` component like this: `import CustomButton from
"./MoreDetailsButton";`.
```typescript
export default MoreDetailsButton;
```

For more information about this file you can check his complete code here : [MoreDetails.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/components/Applets/MoreDetails.tsx)
