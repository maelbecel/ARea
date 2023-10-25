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
                <View style={{ alignItems: "center" }}>
                    <View style={ styles.section }>
                        <View style={{ width: "50%" }}>
                            {actionSlug &&
                            <LogoApplet
                                slug={actionSlug}
                            />}
                        </View>

                        <View style={{ width: "50%" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Action</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Action</Text>
                        </View>
                    </View>

                    <View style={{ paddingVertical: "8%", paddingHorizontal: 2.5, backgroundColor: "#36384138" }} />

                    <View style={ styles.section }>
                        <View>
                            {reactionSlug &&
                            <LogoApplet
                                slug={reactionSlug}
                            />}
                        </View>
                        <View>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Reaction</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Reaction</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleClick} style={{marginVertical: 10 }}>
                        <Text style={{ color: "#939596", fontWeight: "bold", fontSize: 18 }}>Fewer Details</Text>
                    </TouchableOpacity>
                </View>

            ) :
            <TouchableOpacity onPress={handleClick} style={{ alignItems: "center", marginVertical: 10 }}>
                <Text style={{ color: "#939596", fontWeight: "bold", fontSize: 18 }}>More Details</Text>
            </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    section : {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
});

export default MoreDetailsButton;
