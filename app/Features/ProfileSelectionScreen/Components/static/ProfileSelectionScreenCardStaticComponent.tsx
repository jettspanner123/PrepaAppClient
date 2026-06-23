import * as Haptics from "expo-haptics";
import React from "react";
import { Text, View } from "react-native";
import TapScaleEffectComponent from "../../../../Components/Interactions/TapScaleEffectComponent";
import ColorFactoryCON from "../../../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../../../Constants/EdgeInsetsCON";

interface ProfileSelectionScreenCardStaticComponentProps {
    id: string;
    name: string;
    initials: string;
    onPress: (id: string) => void;
}

export default function ProfileSelectionScreenCardStaticComponent({
    id,
    name,
    initials,
    onPress,
}: ProfileSelectionScreenCardStaticComponentProps): React.JSX.Element {
    const handlePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress(id);
    };

    return (
        <TapScaleEffectComponent onPress={handlePress}>
            <View
                style={{
                    backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                    borderRadius: EdgeInsetsCON.LG,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingVertical: 14,
                    paddingHorizontal: EdgeInsetsCON.XL,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* Avatar */}
                <View
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 26,
                        backgroundColor: ColorFactoryCON.INK,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: ColorFactoryCON.CARD_BORDER,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "600",
                            color: ColorFactoryCON.WHITE,
                        }}
                    >
                        {initials}
                    </Text>
                </View>

                {/* Name + label */}
                <View
                    style={{
                        flex: 1,
                        marginLeft: EdgeInsetsCON.LG,
                        gap: EdgeInsetsCON.XXS,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: ColorFactoryCON.WHITE,
                        }}
                    >
                        {name}
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
                        Personal profile
                    </Text>
                </View>

                {/* Chevron */}
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: ColorFactoryCON.CARD_BAND,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: ColorFactoryCON.MUTE,
                            marginLeft: 2,
                        }}
                    >
                        ›
                    </Text>
                </View>
            </View>
        </TapScaleEffectComponent>
    );
}
