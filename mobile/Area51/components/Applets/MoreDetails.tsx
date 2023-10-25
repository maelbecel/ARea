import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";

interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionSlug: string;
}

const MoreDetailsButton = ({ isToggle, actionSlug, reactionSlug }: ButtonProps) => {
    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(isToggle);
    const [actionInfos, setActionInfos] = useState<any>("");
    const [reactionInfos, setReactionInfos] = useState<any>("");

    const handleClick = () => {
        setIsButtonToggle(!isButtonToggle);
        console.log(isButtonToggle ? "disabled" : "enabled");
    };

    useEffect(() => {
        const dataFetch = async () => {
            try {
                // const actionInfos = await ActionInfos(actionSlug);
                // const reactionInfos = await ReactionInfos(reactionSlug);
                // setActionInfos(actionInfos);
                // setReactionInfos(reactionInfos);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    return (
        <View>
            {isButtonToggle ? (
                <View>
                    <View style={ styles.section }>
                        <View>
                            {actionSlug &&
                            <LogoApplet
                                slug={actionSlug}
                            />}
                        </View>

                        <View style={{ marginLeft: 30 }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Action</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Action</Text>
                        </View>
                    </View>

                    <View style={ styles.separator } />

                    <View style={ styles.section }>
                        <View>
                            {reactionSlug &&
                            <LogoApplet
                                slug={reactionSlug}
                            />}
                        </View>
                        <View style={{ marginLeft: 30 }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Reaction</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Reaction</Text>
                        </View>
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

const styles = StyleSheet.create({
    section : {
        flexDirection: "row",
        alignItems: "center",
    },
    separator: {
        paddingVertical: "8%",
        backgroundColor: "#36384138",
        marginRight: "92.5%",
        marginLeft: "6.5%",
    },
});

export default MoreDetailsButton;
