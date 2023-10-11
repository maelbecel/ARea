import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LogoApplet from "./Logo";
import Switch from "./Switch";
import SwitchNotifyMe from "./SwitchNotifyMe";
import MoreDetailsButton from "./MoreDetails";
import { useNavigation } from '@react-navigation/native';

const AppletInfoContainer = ({ name, color, theme, actionSlug, reactionSlug, user, enabled, createdAt = 0, lastTriggerDate = 0 }) => {
    const [formattedDate, setFormattedDate] = useState("");
    const [LastUseDate, setLastUseDate] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        console.log("enabled -> ", enabled);

        if (createdAt !== 0) {
            const createdAtDate = new Date(createdAt * 1000);
            const lastUpdateDate = new Date(lastTriggerDate * 1000);
            const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            setLastUseDate(formattedLastUseDate);
            setFormattedDate(formattedDate);
        }
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: `${color}`, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: `${color}`, paddingHorizontal: '35%' }}>
                    <TouchableOpacity onPress={() => console.log("Details Applet")}>
                        <View style={{ flexDirection: 'row' }}>
                            {actionSlug && <LogoApplet slug={actionSlug} width={56} height={56} toggleBackground={false} />}
                            {reactionSlug && <LogoApplet slug={reactionSlug} width={56} height={56} toggleBackground={false} />}
                        </View>
                        <Text style={{ color: 'white', fontSize: 37, fontWeight: 'bold', paddingBottom: '10%' }}>{name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Edit title")}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>Edit title</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: '20%' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>by <Text style={{ fontWeight: 'bold' }}>{user}</Text></Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '5%' }}>
                <Switch isChecked={enabled} isDisabled={false} />
            </View>
            <View style={{ paddingHorizontal: '35%', marginBottom: '5%' }}>
                <Text style={{ color: '#B8B9BB', fontWeight: 'bold' }}>
                    <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactionSlug={reactionSlug} />
                </Text>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%' }}>
                    <Text style={{ color: '#363841', fontWeight: 'bold', fontSize: 22 }}>Notify me</Text>
                    <SwitchNotifyMe isChecked={false} isDisabled={false} />
                </View>
            </View>
        </View>
    );
};

export default AppletInfoContainer;
