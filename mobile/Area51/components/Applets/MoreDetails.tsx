import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";
import ReactionInfo from "../../api/ReactionInfo";
import ActionInfo from "../../api/ActionInfo";

/* The `ReactionListProps` interface is defining the type of props that the `MoreDetailsButton`
component expects to receive. It has two properties: */
interface ReactionListProps {
    reactionSlug: string;
    reactionData: any[];
}

/* The `ButtonProps` interface is defining the type of props that the `MoreDetailsButton` component
expects to receive. It has three properties: */
interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionsList: ReactionListProps[];
}

/* The `MoreDetailsButton` component is a React functional component that displays a button that
toggles between showing more details and fewer details. */
const MoreDetailsButton = ({ isToggle, actionSlug, reactionsList }: ButtonProps) => {
    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(isToggle);
    const [actionInfos, setActionInfos] = useState<any>("");
    const [reactionInfos, setReactionInfos] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * The handleClick function toggles the value of isButtonToggle.
     */
        const handleClick = () => {
            setIsButtonToggle(!isButtonToggle);
        };

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to fetch data from the server and update the component's state. */
    useEffect(() => {
        /**
         * The function `dataFetch` fetches action and reaction information, sets the fetched data in
         * state variables, and handles any errors that occur during the process.
         */
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

    return (
        <View>
            {!loading && isButtonToggle ? (
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

            ) :
            <TouchableOpacity onPress={handleClick} style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
                <Text style={{ color: "#939596", fontWeight: "bold", fontSize: 18 }}>More Details</Text>
            </TouchableOpacity>
            }
        </View>
    );
};

/* The `const styles` variable is an object that contains a style definition for a separator element.
The `StyleSheet.create()` function is used to create a stylesheet object that can be used to define
styles for React Native components. In this case, the `separator` style defines the padding,
background color, and margins for the separator element. */
const styles = StyleSheet.create({
    separator: {
        paddingVertical: "8%",
        backgroundColor: "#36384138",
        marginRight: "92.5%",
        marginLeft: "6.5%",
    },
});

/* The line `export default MoreDetailsButton;` is exporting the `MoreDetailsButton` component as the
default export of the module. This means that when another file imports this module, it can import
the `MoreDetailsButton` component using any name of its choice. For example, in another file, you
can import the `MoreDetailsButton` component like this: `import CustomButton from
"./MoreDetailsButton";`. */
    export default MoreDetailsButton;
