import * as React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import ServiceInfo, {Action, Reaction} from '../api/ServiceInfo';
import ActionCard from '../components/ActionCard';

/**
 * The `getWriteColor` function takes a color value and returns the appropriate text color (either
 * black or white) based on the brightness of the background color.
 * @param {string} color - The `color` parameter is a string representing a color. It can be in any
 * valid CSS color format, such as hexadecimal (`#RRGGBB`), RGB (`rgb(r, g, b)`), or color names
 * (`red`, `blue`, etc.).
 * @returns The function `getWriteColor` returns a string representing the appropriate text color based
 * on the luminance of the background color. If the luminance is greater than 0.5, it returns "#000000"
 * (black), indicating that the text color should be dark. Otherwise, it returns "#FFFFFF" (white),
 * indicating that the text color should be light.
 */
const getWriteColor = (color: string): string => {
  /* The line `const hexColor = color.startsWith("#") ? color : `#`;` is checking if the
  `color` variable starts with a `#` symbol. If it does, then `hexColor` is assigned the value of
  `color`. If it doesn't start with `#`, then `hexColor` is assigned the value of `#`,
  which adds the `#` symbol to the beginning of the `color` string. This ensures that the
  `hexColor` variable always contains a valid hexadecimal color value. */
  const hexColor = color.startsWith("#") ? color : `#${color}`;

  /**
   * The function calculates the luminance of a given hex color.
   * @param {string} hexColor - The `hexColor` parameter is a string representing a color in
   * hexadecimal format. It should be in the format `#RRGGBB`, where RR represents the red component,
   * GG represents the green component, and BB represents the blue component of the color.
   * @returns The function `getLuminance` returns a number, which represents the luminance value of
   * the given hex color.
   */
  const getLuminance = (hexColor: string): number => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  /* The line `const luminance = getLuminance(hexColor);` is calling the `getLuminance` function and
  assigning its return value to the `luminance` variable. The `getLuminance` function calculates
  the luminance of a given hex color by converting the color to its RGB components and applying a
  luminance formula. The resulting luminance value represents the brightness of the color, with
  higher values indicating brighter colors and lower values indicating darker colors. */
  const luminance = getLuminance(hexColor);

  /* The code block is determining the appropriate text color based on the luminance of the
  background color. */
  if (luminance > 0.6) {
      return "#000000";
  } else {
      return "#FFFFFF";
  }
};

/* The `Service` component is a functional component that represents a screen in a React Native app. It
receives two props, `navigation` and `route`, from the React Navigation library. */
const Service = ({ navigation, route }) => {
  const { slug } = route.params;
  const [color, setColor] = React.useState<string>("#FFFFFF");
  const [url, setUrl] = React.useState<string>("https://via.placeholder.com/100");
  const [name, setName] = React.useState<string>("");
  const [action, setAction] = React.useState<Action[]>([]);
  const [reaction, setReaction] = React.useState<Reaction[]>([]);


  /**
   * The function `displayActions` returns an array of `ActionCard` components based on the `action`
   * array, with each component having a unique key, name, description, color, and an `onPress` event
   * that navigates to the 'ConnectAuth' screen with specific parameters.
   * @returns The `displayActions` function is returning an array of `ActionCard` components.
   */
  const displayActions = () => {
    return action.map((service) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuth', { slug: service.slug , type: "action"})}/>
    ));
  };

  /**
   * The function `displayReactions` maps over an array of `reaction` objects and returns an array of
   * `ActionCard` components with specific props.
   * @returns The `displayReactions` function is returning an array of `ActionCard` components. Each
   * `ActionCard` component has a `key` prop set to the `slug` property of the `service` object, and
   * also has `name`, `description`, `color`, and `onPress` props set based on the properties of the
   * `service` object.
   */
  const displayReactions = () => {
    return reaction.map((service) => (
      <ActionCard key={service.slug} name={service.name} description={service.description} color={color} onPress={() => navigation.navigate('ConnectAuth', { slug: service.slug, type: "reaction" })}/>
    ));
  }


  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this
  case, the effect is triggered when the `slug` variable changes. */
  React.useEffect(() => {
    /**
     * The function fetchData fetches data from a service and sets various state variables based on the
     * fetched data.
     */
    const fetchData = async () => {
      try {
        const service = await ServiceInfo(slug);
        (service.decoration.backgroundColor) ? setColor(service.decoration.backgroundColor) : null;
        (service.decoration.logoUrl != "") ? setUrl(service.decoration.logoUrl) : null;
        setName(service.name);
        setAction(service.actions);
        setReaction(service.reactions);
      } catch (error) {
        console.error("Erreur lors de l'appel de ServiceInfo:", error);
      }
    };

    fetchData();
  }, [slug]);

  /* The `return` statement in the `Service` component is returning a JSX expression that represents
  the structure and content of the component's rendered output. */
  return (
    <View>
      {/* <StatusBar backgroundColor={color} /> */}
      <View style={[{ backgroundColor: color }, styles.container]}>
        <TopBar title="Explore" iconLeft='arrow-back' color={getWriteColor(color)} onPressLeft={() => navigation.goBack()} iconRight='info' onPressRight={() => navigation.goBack()} />
        <Image source={{ uri: url }} style={styles.logo} />
        <Text style={[styles.name, { color: getWriteColor(color) }]}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.action}>
          {displayActions()}
          {displayReactions()}
        </View>
      </ScrollView>
    </View>
  );
};

/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from the
`react-native` library. Each key-value pair in the `styles` object represents a specific style rule. */
const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginTop: 10,
    width: 100,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 30,
    shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  action: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingBottom: 250,
  }
});


export default Service;
