import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoApplet from "./Logo";

interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionSlug: string;
}

const MoreDetailsButton = ({ isToggle, actionSlug, reactionSlug }: ButtonProps) => {
    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(isToggle);

    const handleClick = () => {
        setIsButtonToggle(!isButtonToggle);
        console.log(isButtonToggle ? "disabled" : "enabled");
    };

    return (
        <View>
            {isButtonToggle ? (
                <View style={{ alignItems: "center" }}>
                    <View style={ styles.section }>
                        <View style={{ width: "33%", alignItems: "flex-start" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Action</Text>
                        </View>

                        <View>
                            {actionSlug &&
                            <LogoApplet
                                slug={actionSlug}
                                width={60}
                                height={60}
                                toggleBackground={true}
                            />}
                        </View>

                        <View>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Action</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Action</Text>
                        </View>
                    </View>

                    <View style={{ paddingVertical: "8%", paddingHorizontal: 2.5, backgroundColor: "#36384138" }} />

                    <View style={ styles.section }>
                        <View style={{ width: "33%", alignItems: "flex-start" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Reaction</Text>
                        </View>
                        <View>
                            {reactionSlug &&
                            <LogoApplet
                                slug={reactionSlug}
                                width={60}
                                height={60}
                                toggleBackground={true}
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
