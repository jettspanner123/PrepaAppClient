import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import CreateWorkoutScreenCON from "@/app/Features/CreateWorkoutScreen/Constants/CreateWorkoutScreenCON";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function CreateWorkoutScreenHeaderStaticComponent(): React.JSX.Element {
    const router = useRouter();

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: EdgeInsetsCON.LG,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                marginBottom: EdgeInsetsCON.XXL,
            }}
        >
            {/* Close button */}
            <Pressable
                onPress={handleClose}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={{
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "300",
                        color: ColorFactoryCON.WHITE,
                    }}
                >
                    ✕
                </Text>
            </Pressable>

            {/* Title */}
            <Text
                style={{
                    fontFamily: "Anton",
                    fontSize: 24,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                }}
            >
                {CreateWorkoutScreenCON.PAGE_TITLE}
            </Text>

            {/* Spacer to centre the title */}
            <View style={{ width: 40 }} />
        </View>
    );
}
