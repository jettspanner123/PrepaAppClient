import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { Text, View } from "react-native";

interface OnboardingScreenStepCardStaticComponentProps {
    index: number;
    step: string;
    description: string;
}

export default function OnboardingScreenStepCardStaticComponent({
    index,
    step,
    description,
}: OnboardingScreenStepCardStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: EdgeInsetsCON.LG,
                backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                borderRadius: EdgeInsetsCON.LG,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                paddingHorizontal: 20,
                paddingVertical: 15,
            }}
        >
            {/* Step number */}
            <View
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: ColorFactoryCON.INK,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: ColorFactoryCON.WHITE,
                    }}
                >
                    {index + 1}
                </Text>
            </View>

            {/* Step text */}
            <View style={{ flex: 1, gap: EdgeInsetsCON.XXS }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: ColorFactoryCON.WHITE,
                    }}
                >
                    {step}
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "400",
                        color: ColorFactoryCON.MUTE,
                        lineHeight: 18,
                    }}
                >
                    {description}
                </Text>
            </View>
        </View>
    );
}
