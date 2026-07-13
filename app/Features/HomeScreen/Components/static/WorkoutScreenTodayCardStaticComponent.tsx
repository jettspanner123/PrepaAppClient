import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import React from "react";
import { Text, View } from "react-native";

export default function WorkoutScreenTodayCardStaticComponent(): React.JSX.Element {
    return (
        <View style={{ marginBottom: EdgeInsetsCON.XXL }}>
            {/* Section header */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: EdgeInsetsCON.LG,
                }}
            >
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 3,
                    }}
                >
                    {HomeScreenCON.WORKOUT_SECTION_LABEL}
                </Text>
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        borderBottomWidth: 1,
                        borderBottomColor: ColorFactoryCON.CARD_BORDER,
                    }}
                >
                    {HomeScreenCON.WORKOUT_VIEW_ALL}
                </Text>
            </View>

            {/* Card — sharp corners */}
            <View
                style={{
                    backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    padding: EdgeInsetsCON.XL,
                    overflow: "hidden",
                }}
            >
                {/* Tags */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: EdgeInsetsCON.XS,
                        marginBottom: EdgeInsetsCON.XS,
                    }}
                >
                    {HomeScreenCON.WORKOUT_TODAY_TAGS.map((tag, index) => (
                        <View
                            key={tag}
                            style={{
                                paddingHorizontal: EdgeInsetsCON.SM,
                                paddingVertical: 2,
                                borderWidth: 1,
                                backgroundColor:
                                    index === 0
                                        ? "rgba(255,255,255,0.1)"
                                        : "transparent",
                                borderColor:
                                    index === 0
                                        ? "rgba(255,255,255,0.3)"
                                        : "rgba(255,255,255,0.1)",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "700",
                                    color:
                                        index === 0
                                            ? ColorFactoryCON.WHITE
                                            : ColorFactoryCON.MUTE,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                {tag}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Title */}
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "900",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: -0.5,
                        lineHeight: 32,
                        marginBottom: EdgeInsetsCON.XS,
                    }}
                >
                    {HomeScreenCON.WORKOUT_TODAY_TITLE}
                </Text>

                {/* Description */}
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "400",
                        color: ColorFactoryCON.MUTE,
                        lineHeight: 18,
                        marginBottom: EdgeInsetsCON.XL,
                    }}
                >
                    {HomeScreenCON.WORKOUT_TODAY_DESCRIPTION}
                </Text>

                {/* CTA — sharp cornered */}
                <StandardButtonComponent
                    label={HomeScreenCON.WORKOUT_START_CTA}
                    onPress={() => {}}
                    variant={StandardButtonComponentVariant.WHITE}
                    fullWidth
                    borderRadius={0}
                    fontSize={12}
                    fontWeight="700"
                />
            </View>
        </View>
    );
}
