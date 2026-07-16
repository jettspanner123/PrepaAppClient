import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutListScreenCON, {
    WorkoutCard,
} from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import React from "react";
import { Text, View } from "react-native";

interface WorkoutListScreenCardStaticComponentProps {
    workout: WorkoutCard;
    onStart: (id: string) => void;
}

export default function WorkoutListScreenCardStaticComponent({
    workout,
    onStart,
}: WorkoutListScreenCardStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                padding: EdgeInsetsCON.XL,
                marginBottom: EdgeInsetsCON.MD,
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
                {workout.tags.map((tag, index) => (
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
                {workout.title}
            </Text>

            {/* Description */}
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "400",
                    color: ColorFactoryCON.MUTE,
                    lineHeight: 18,
                    marginBottom: EdgeInsetsCON.LG,
                }}
            >
                {workout.description}
            </Text>

            {/* Exercise list */}
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: ColorFactoryCON.CARD_BORDER,
                    marginBottom: EdgeInsetsCON.LG,
                }}
            >
                {workout.exercises.map((exercise, index) => (
                    <View
                        key={exercise.name}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: EdgeInsetsCON.MD,
                            paddingVertical: EdgeInsetsCON.SM,
                            borderBottomWidth: 1,
                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "700",
                                color: ColorFactoryCON.MUTE,
                                letterSpacing: 1,
                                width: 20,
                            }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "600",
                                color: ColorFactoryCON.WHITE,
                                flex: 1,
                                letterSpacing: 0.2,
                            }}
                        >
                            {exercise.name}
                        </Text>
                    </View>
                ))}
            </View>

            {/* CTA */}
            <StandardButtonComponent
                label={WorkoutListScreenCON.CTA_START}
                onPress={() => onStart(workout.id)}
                variant={StandardButtonComponentVariant.WHITE}
                fullWidth
                borderRadius={0}
                fontSize={12}
                fontWeight="700"
            />
        </View>
    );
}
