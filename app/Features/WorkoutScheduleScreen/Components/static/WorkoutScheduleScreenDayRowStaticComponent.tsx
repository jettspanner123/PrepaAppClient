import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutScheduleScreenCON, {
    ScheduleDay,
} from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface WorkoutScheduleScreenDayRowStaticComponentProps {
    day: ScheduleDay;
    onEdit: (id: string) => void;
}

export default function WorkoutScheduleScreenDayRowStaticComponent({
    day,
    onEdit,
}: WorkoutScheduleScreenDayRowStaticComponentProps): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);
    const isRest = day.type === "rest";
    const isUnassigned = day.type === "unassigned";

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            onPress={() => onEdit(day.id)}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: EdgeInsetsCON.XL,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                backgroundColor: pressed
                    ? ColorFactoryCON.CARD_BG_LIGHT
                    : "transparent",
            }}
        >
            {/* Left — index + day + label */}
            <View style={{ flex: 1, gap: EdgeInsetsCON.XXS }}>
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        letterSpacing: 2,
                    }}
                >
                    {day.index}
                </Text>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "900",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        lineHeight: 32,
                    }}
                >
                    {day.day}
                </Text>

                {isUnassigned ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: EdgeInsetsCON.XS,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: ColorFactoryCON.MUTE,
                                lineHeight: 20,
                            }}
                        >
                            +
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: ColorFactoryCON.MUTE,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                            }}
                        >
                            {WorkoutScheduleScreenCON.LABEL_ASSIGN}
                        </Text>
                    </View>
                ) : (
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "400",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            fontStyle: isRest ? "italic" : "normal",
                        }}
                    >
                        {day.label}
                        {day.sublabel ? ` / ${day.sublabel}` : ""}
                    </Text>
                )}
            </View>

            {/* Right — edit icon */}
            <Ionicons
                name="create-outline"
                size={20}
                color={ColorFactoryCON.WHITE}
            />
        </Pressable>
    );
}
