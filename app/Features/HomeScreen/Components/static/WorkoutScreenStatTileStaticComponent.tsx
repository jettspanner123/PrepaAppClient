import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { Text, View } from "react-native";

interface WorkoutScreenStatTileStaticComponentProps {
    label: string;
    value: string;
    unit: string;
}

export default function WorkoutScreenStatTileStaticComponent({
    label,
    value,
    unit,
}: WorkoutScreenStatTileStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                padding: EdgeInsetsCON.XL,
            }}
        >
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: EdgeInsetsCON.XS,
                }}
            >
                {label}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: EdgeInsetsCON.XS,
                }}
            >
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: "900",
                        color: ColorFactoryCON.WHITE,
                        lineHeight: 32,
                        letterSpacing: -0.5,
                    }}
                >
                    {value}
                </Text>
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                    }}
                >
                    {unit}
                </Text>
            </View>
        </View>
    );
}
