import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import React from "react";
import { Text, View } from "react-native";

const SUMMARY_ITEMS = [
    { label: "Basic Info", description: "Name, course & profile saved." },
    { label: "Course Info", description: "Your study goal is locked in." },
    { label: "Key Dates", description: "Exam & prep dates confirmed." },
];

export default function OnboardingScreenSaveScreenViewComponent(): React.JSX.Element {
    return (
        <PageScrollViewHolderComponent>
            {/* Heading */}
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {OnboardingScreenCON.SAVE_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {OnboardingScreenCON.SAVE_SUBTITLE}
            </Text>

            {/* Summary cards */}
            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.MD }}
            >
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: EdgeInsetsCON.XS,
                    }}
                >
                    What we saved
                </Text>

                {SUMMARY_ITEMS.map((item) => (
                    <View
                        key={item.label}
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
                        {/* Tick circle */}
                        <View
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: ColorFactoryCON.INK,
                                borderWidth: 1,
                                borderColor: ColorFactoryCON.SUCCESS,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: ColorFactoryCON.SUCCESS,
                                }}
                            >
                                ✓
                            </Text>
                        </View>

                        <View style={{ flex: 1, gap: EdgeInsetsCON.XXS }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: ColorFactoryCON.WHITE,
                                }}
                            >
                                {item.label}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: "400",
                                    color: ColorFactoryCON.MUTE,
                                    lineHeight: 18,
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </PageScrollViewHolderComponent>
    );
}
