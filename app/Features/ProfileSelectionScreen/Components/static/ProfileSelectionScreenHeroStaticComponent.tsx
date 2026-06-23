import React from "react";
import { Text, View } from "react-native";
import ProfileSelectionScreenCON from "../../Constants/ProfileSelectionScreenCON";

export default function ProfileSelectionScreenHeroStaticComponent(): React.JSX.Element {
    return (
        <View className="px-ei-screen-h pt-[5rem] pb-ei-xxl">
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {ProfileSelectionScreenCON.SCREEN_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {ProfileSelectionScreenCON.SCREEN_SUBTITLE}
            </Text>
        </View>
    );
}
