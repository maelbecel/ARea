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
