import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <View style={{ width: "33%", alignItems: "center" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Action</Text>
                        </View>
                        <View style={{ width: "33%", alignItems: "center" }}>
                            {actionSlug && <LogoApplet slug={actionSlug} width={60} height={60} toggleBackground={true} />}
                        </View>
                        <View style={{ width: "33%" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Action</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Action</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: "8%", paddingHorizontal: 2, backgroundColor: "#36384138" }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <View style={{ width: "33%", alignItems: "center" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Reaction</Text>
                        </View>
                        <View style={{ width: "33%", alignItems: "center" }}>
                            {reactionSlug && <LogoApplet slug={reactionSlug} width={60} height={60} toggleBackground={true} />}
                        </View>
                        <View style={{ width: "33%" }}>
                            <Text style={{ color: "#363841", fontWeight: "bold", fontSize: 22 }}>Name of Reaction</Text>
                            <Text style={{ color: "#363841", fontSize: 22 }}>Description of Reaction</Text>
                        </View>
                    </View>
                </View>
            ) : null}
            <TouchableOpacity onPress={handleClick} style={{ alignItems: "center", marginVertical: 10 }}>
                <Text style={{ color: "blue", fontWeight: "bold", fontSize: 18 }}>More Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MoreDetailsButton;
