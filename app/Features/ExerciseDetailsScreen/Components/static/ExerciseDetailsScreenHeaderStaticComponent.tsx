import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import ExerciseDetailsScreenCON from "@/app/Features/ExerciseDetailsScreen/Constants/ExerciseDetailsScreenCON";
import React from "react";
import { Text, View } from "react-native";

interface ExerciseDetailsScreenHeaderStaticComponentProps {
    name: string;
    isCustom: boolean;
}

export default function ExerciseDetailsScreenHeaderStaticComponent({
    name,
    isCustom,
}: ExerciseDetailsScreenHeaderStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                paddingBottom: EdgeInsetsCON.XL,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                marginBottom: EdgeInsetsCON.XXL,
            }}
        >
            {/* Custom badge — only visible for user-created exercises */}
            {isCustom && (
                <View
                    style={{
                        alignSelf: "flex-start",
                        backgroundColor: ColorFactoryCON.WHITE,
                        paddingHorizontal: EdgeInsetsCON.MD,
                        paddingVertical: EdgeInsetsCON.XXS,
                        marginBottom: EdgeInsetsCON.SM,
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
                        {ExerciseDetailsScreenCON.LABEL_CUSTOM_BADGE}
                    </Text>
                </View>
            )}

            {/* Exercise name */}
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    lineHeight: 52,
                }}
            >
                {name}
            </Text>
        </View>
    );
}
