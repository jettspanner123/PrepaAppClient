import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import React from "react";
import { Text, View } from "react-native";

export default function WorkoutScreenCaloriesCardStaticComponent(): React.JSX.Element {
    return (
        <View
            style={{
                backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                borderRadius: EdgeInsetsCON.LG,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                padding: EdgeInsetsCON.XL,
                height: 192,
                overflow: "hidden",
                justifyContent: "space-between",
            }}
        >
            {/* Label + value */}
            <View>
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: "500",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        marginBottom: EdgeInsetsCON.XXS,
                    }}
                >
                    {HomeScreenCON.CALORIES_LABEL}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "baseline", gap: EdgeInsetsCON.XS }}>
                    <Text
                        style={{
                            fontSize: 36,
                            fontWeight: "800",
                            color: ColorFactoryCON.WHITE,
                            fontStyle: "italic",
                            letterSpacing: -0.5,
                            lineHeight: 40,
                        }}
                    >
                        {HomeScreenCON.CALORIES_VALUE}
                    </Text>
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: "500",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                        }}
                    >
                        {HomeScreenCON.CALORIES_UNIT}
                    </Text>
                </View>
            </View>

            {/* Mini bar chart */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: EdgeInsetsCON.XXS,
                    height: 48,
                }}
            >
                {HomeScreenCON.CALORIES_BARS.map((ratio, index) => (
                    <View
                        key={index}
                        style={{
                            flex: 1,
                            height: 48 * ratio,
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2,
                            backgroundColor: `rgba(255,255,255,${ratio === 1 ? 1 : ratio * 0.8})`,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
