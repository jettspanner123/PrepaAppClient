import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";

const SETTINGS_ITEMS = [
    {
        id: "custom-workouts",
        label: "Custom Workouts",
        target: "CUSTOM WORKOUTS",
    },
    {
        id: "custom-exercises",
        label: "Custom Exercises",
        target: "CUSTOM EXERCISES",
    },
    {
        id: "workout-general",
        label: "Workout General",
        target: "WORKOUT GENERAL",
    },
    {
        id: "workout-schedule",
        label: "Workout Schedule",
        target: "WORKOUT SCHEDULE",
    },
];

export default function SettingsScreenController(): React.JSX.Element {
    const router = useRouter();

    const handlePress = (target: string): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log("Pressed settings item:", target);

        if (target === "CUSTOM WORKOUTS" || target === "CUSTOM EXERCISES") {
            router.push("/custom-exercises");
        } else if (target === "WORKOUT SCHEDULE") {
            router.push("/workout-schedule");
        }
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                paddingTop: EdgeInsetsCON.SCREEN_TOP,
                paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
            }}
            showsVerticalScrollIndicator={false}
        >
            <StandardPageHeaderComponent text="Settings" />
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: ColorFactoryCON.MUTE,
                    marginTop: EdgeInsetsCON.SM,
                    marginBottom: EdgeInsetsCON.XXS,
                    lineHeight: 18,
                }}
            >
                Manage your application preferences, account information, and
                custom content.
            </Text>

            <View
                style={{
                    flex: 1,
                    marginTop: EdgeInsetsCON.LG,
                    justifyContent: "space-between",
                    gap: EdgeInsetsCON.XXL,
                }}
            >
                <View style={{ gap: EdgeInsetsCON.SM }}>
                    {/* Section header */}
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: "700",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 3,
                        }}
                    >
                        GENERAL
                    </Text>

                    {/* iOS styled Settings list container */}
                    <View
                        style={{
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            overflow: "hidden",
                        }}
                    >
                        {SETTINGS_ITEMS.map((item, index) => {
                            const isLast = index === SETTINGS_ITEMS.length - 1;
                            return (
                                <View key={item.id}>
                                    <Pressable
                                        onPress={() => handlePress(item.target)}
                                    >
                                        {({ pressed }) => (
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    paddingVertical: 14,
                                                    paddingHorizontal: 16,
                                                    backgroundColor: pressed
                                                        ? "#2c2c2e"
                                                        : "transparent",
                                                }}
                                            >
                                                {/* Row label */}
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: "500",
                                                        color: "#ffffff",
                                                    }}
                                                >
                                                    {item.label}
                                                </Text>

                                                {/* iOS Arrow icon */}
                                                <Ionicons
                                                    name="chevron-forward"
                                                    size={14}
                                                    color="#c7c7cc"
                                                />
                                            </View>
                                        )}
                                    </Pressable>

                                    {/* Inset divider */}
                                    {!isLast && (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor:
                                                    ColorFactoryCON.CARD_BORDER,
                                                marginLeft: 16, // inset matching the padding
                                            }}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* App Version */}
                <View style={{ paddingTop: EdgeInsetsCON.XL }}>
                    <Text
                        style={{
                            fontFamily:
                                Platform.OS === "ios"
                                    ? "Courier New"
                                    : "monospace",
                            fontSize: 11,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                        }}
                    >
                        VERSION 4.2.0-KINETIC
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
