import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import React from "react";
import { Text, View } from "react-native";

export default function WorkoutScreenHeroStaticComponent(): React.JSX.Element {
    return (
        <View style={{ marginBottom: EdgeInsetsCON.XXL }}>
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    marginBottom: EdgeInsetsCON.XXS,
                }}
            >
                {HomeScreenCON.WORKOUT_WELCOME_LABEL}
            </Text>
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    letterSpacing: -1,
                    lineHeight: 52,
                }}
            >
                {HomeScreenCON.WORKOUT_HERO_HEADLINE}
            </Text>
        </View>
    );
}
