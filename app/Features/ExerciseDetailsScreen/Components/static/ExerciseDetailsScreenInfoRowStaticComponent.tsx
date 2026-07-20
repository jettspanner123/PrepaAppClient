import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { Text, View } from "react-native";

interface ExerciseDetailsScreenInfoRowStaticComponentProps {
    label: string;
    value: string;
}

export default function ExerciseDetailsScreenInfoRowStaticComponent({
    label,
    value,
}: ExerciseDetailsScreenInfoRowStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: EdgeInsetsCON.MD,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
            }}
        >
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
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}
            >
                {value}
            </Text>
        </View>
    );
}
