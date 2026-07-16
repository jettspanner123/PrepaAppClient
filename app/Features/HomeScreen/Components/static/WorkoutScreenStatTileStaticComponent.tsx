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
                justifyContent: "space-between",
                gap: EdgeInsetsCON.SM,
            }}
        >
            {/* Label */}
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                }}
            >
                {label}
            </Text>

            {/* Value — large, takes most of the space */}
            <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                    fontSize: 36,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    letterSpacing: -1,
                    lineHeight: 36,
                }}
            >
                {value}
            </Text>

            {/* Unit pill */}
            <View
                style={{
                    alignSelf: "flex-start",
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingHorizontal: EdgeInsetsCON.SM,
                    paddingVertical: EdgeInsetsCON.XXS,
                }}
            >
                <Text
                    style={{
                        fontSize: 9,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                    }}
                >
                    {unit}
                </Text>
            </View>
        </View>
    );
}
