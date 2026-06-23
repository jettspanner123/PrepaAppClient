import React from "react";
import { Text, View } from "react-native";
import ColorFactoryCON from "../../../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../../../Constants/EdgeInsetsCON";
import OnboardingScreenCON from "../../Constants/OnboardingScreenCON";

export default function OnboardingScreenHeroStaticComponent(): React.JSX.Element {
    return (
        <View
            style={{
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                paddingTop: EdgeInsetsCON.SCREEN_TOP,
                gap: EdgeInsetsCON.MD,
            }}
        >
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    lineHeight: 48,
                    letterSpacing: -0.5,
                }}
            >
                {OnboardingScreenCON.TITLE}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: ColorFactoryCON.MUTE,
                }}
            >
                {OnboardingScreenCON.SUBTITLE}
            </Text>
        </View>
    );
}
