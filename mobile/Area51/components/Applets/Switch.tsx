import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";
import { getWriteColor } from "../ActionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdateAppletEnableWithID } from "../../api/UpdateApplet";
import { useNavigation } from "@react-navigation/native";

export const darkenColor = (color: string, factor: number, darkMode: boolean): string => {
    if (!darkMode) {
        return color;
    }
    if (!color) {
        return "#FFFFFF";
    }
    const hexToRgb = (hex: string): number[] => {
        if (hex) {
            const match = hex.match(/\w\w/g);
            if (match) {
                return match.map((x) => parseInt(x, 16));
            }
        }
        return [0, 0, 0];
    };
    const rgbToHex = (r: number, g: number, b: number): string =>
        `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    const [r, g, b] = hexToRgb(color);
    const darkenedR = Math.max(0, Math.floor(r / factor));
    const darkenedG = Math.max(0, Math.floor(g / factor));
    const darkenedB = Math.max(0, Math.floor(b / factor));
    const darkenedHex = rgbToHex(darkenedR, darkenedG, darkenedB);
    return rgbToHex(darkenedR, darkenedG, darkenedB);
};

interface ToggleSwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
    toggleColor?: string;
    darkMode?: boolean;
    bigSwitch?: boolean;
    onChange?: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, isDisabled, yesLabel, noLabel, bgColor, toggleColor, darkMode = true, bigSwitch = false, onChange }) => {
    const [isChekedState, setIsChecked] = useState<boolean>(false);
    const [darkenBg, setDarkenColor] = useState<string>(bgColor);

    useEffect(() => {
        setIsChecked(isChecked);
        setDarkenColor(darkenColor(bgColor, 1.2, darkMode));
    }, [isChecked]);

    const handleSwitchChange = async () => {
        setIsChecked(!isChekedState);
        if (bigSwitch) {
            await UpdateAppletEnableWithID(await AsyncStorage.getItem("appletID"), !isChekedState);
        };
    }

    return (
        <TouchableOpacity
            onPress={handleSwitchChange}
            style={[styles.container, {
                backgroundColor: darkenBg,
                width: bigSwitch ? '100%' : '60%',
                borderRadius: bigSwitch ? 50 : 100,
                justifyContent: isChekedState ? 'flex-end' : 'flex-start',
            }]}
            disabled={isDisabled}
        >
            {isChekedState ? (
                <>
                <Text style={[styles.label, {
                    marginRight: bigSwitch ? '15%' : '20%',
                    color: getWriteColor(darkenBg),
                    fontSize: bigSwitch ? 30 : 15,
                }]}>{isChekedState ? yesLabel : noLabel}</Text>
                <View style={[, {
                    width: bigSwitch ? 75 : 30,
                    height: bigSwitch ? 75 : 30,
                    borderRadius: bigSwitch ? 37.5 : 15,
                    backgroundColor: toggleColor ? toggleColor : bgColor }
                ]}/>
                </>
            ) : (
            <>
                <View style={[, {
                    width: bigSwitch ? 75 : 30,
                    height: bigSwitch ? 75 : 30,
                    borderRadius: bigSwitch ? 37.5 : 15,
                    backgroundColor: toggleColor ? toggleColor : bgColor }
                ]}/>
                <Text style={[styles.label, {
                    marginLeft: bigSwitch ? '15%' : '15%',
                    color: getWriteColor(darkenBg),
                    fontSize: bigSwitch ? 30 : 15,
                }]}>{isChekedState ? yesLabel : noLabel}</Text>
            </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
    },
    label: {
        fontWeight: "bold",
    },
    disabled: {
        opacity: 1, // Opacité lorsque le toggle est désactivé
    },
});

export default ToggleSwitch;
