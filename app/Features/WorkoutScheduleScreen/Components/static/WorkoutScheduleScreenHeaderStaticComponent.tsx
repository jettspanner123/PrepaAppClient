import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutScheduleScreenCON from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import React from "react";
import { Text, View } from "react-native";

interface WorkoutScheduleScreenHeaderStaticComponentProps {
    scheduledCount: number;
}

export default function WorkoutScheduleScreenHeaderStaticComponent({
    scheduledCount,
}: WorkoutScheduleScreenHeaderStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                paddingBottom: EdgeInsetsCON.XL,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                marginBottom: EdgeInsetsCON.XXL,
            }}
        >
            {/* Title */}
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    letterSpacing: -1,
                    lineHeight: 52,
                    marginBottom: EdgeInsetsCON.MD,
                }}
            >
                {WorkoutScheduleScreenCON.PAGE_TITLE}
            </Text>

            {/* Subtitle */}
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: ColorFactoryCON.MUTE,
                    marginBottom: EdgeInsetsCON.LG,
                }}
            >
                {WorkoutScheduleScreenCON.PAGE_SUBTITLE}
            </Text>

            {/* Stats row */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: EdgeInsetsCON.SM,
                }}
            >
                <View
                    style={{
                        backgroundColor: ColorFactoryCON.WHITE,
                        paddingHorizontal: EdgeInsetsCON.MD,
                        paddingVertical: EdgeInsetsCON.XXS,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: "700",
                            color: ColorFactoryCON.BLACK,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                        }}
                    >
                        {scheduledCount} / 7 DAYS
                    </Text>
                </View>
            </View>
        </View>
    );
}
