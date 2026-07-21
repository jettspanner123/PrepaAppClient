import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import WorkoutScheduleScreenCON from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import WorkoutListScreenCON, { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export default function WorkoutScreenTodayCardStaticComponent(): React.JSX.Element {
    const router = useRouter();
    const scheduleFromStore = useUserCustomDataStateStore((state) => state.schedule);

    // Get today's workout dynamically
    const todayWorkout = useMemo<WorkoutCard>(() => {
        const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
        const dayIds = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        const todayId = dayIds[dayIndex];

        // 1. Check user schedule from state store
        if (scheduleFromStore && scheduleFromStore[todayId]) {
            const assigned = scheduleFromStore[todayId];
            return {
                id: assigned.id,
                tags: Array.isArray(assigned.tags) ? assigned.tags : ["Custom"],
                title: assigned.title || assigned.name || "Workout",
                description: assigned.description || "Your custom workout session.",
                exercises: assigned.exercises || [],
            };
        }

        // 2. Check defaults in WorkoutScheduleScreenCON.DAYS
        const defaultDay = WorkoutScheduleScreenCON.DAYS.find((d) => d.id === todayId);
        if (defaultDay) {
            if (defaultDay.type === "rest" || defaultDay.label === "Rest Day") {
                return {
                    id: "REST",
                    tags: ["Rest"],
                    title: "Rest Day",
                    description: "Take some time to recover and rebuild.",
                    exercises: [],
                };
            }

            // Fallback: match by name
            const labelLower = defaultDay.label.toLowerCase();
            let matchedWorkout = WorkoutListScreenCON.WORKOUTS.find(
                (w) => w.title.toLowerCase().includes(labelLower) || labelLower.includes(w.id.toLowerCase())
            );

            if (!matchedWorkout) {
                if (labelLower.includes("push") || labelLower.includes("chest")) {
                    matchedWorkout = WorkoutListScreenCON.WORKOUTS.find((w) => w.id === "chest");
                } else if (labelLower.includes("pull") || labelLower.includes("back")) {
                    matchedWorkout = WorkoutListScreenCON.WORKOUTS.find((w) => w.id === "back");
                } else if (labelLower.includes("leg")) {
                    matchedWorkout = WorkoutListScreenCON.WORKOUTS.find((w) => w.id === "legs-strength");
                } else if (labelLower.includes("upper") || labelLower.includes("arm") || labelLower.includes("shoulder")) {
                    matchedWorkout = WorkoutListScreenCON.WORKOUTS.find((w) => w.id === "shoulders");
                }
            }

            if (matchedWorkout) {
                return matchedWorkout;
            }

            if (defaultDay.label) {
                return {
                    id: defaultDay.id,
                    tags: [defaultDay.sublabel || "Scheduled"],
                    title: defaultDay.label,
                    description: "Your scheduled workout session.",
                    exercises: [],
                };
            }
        }

        // 3. Absolute fallback
        return WorkoutListScreenCON.WORKOUTS[0];
    }, [scheduleFromStore]);

    const handleViewAll = (): void => {
        router.push("/workout-list");
    };

    const handleCreateWorkout = (): void => {
        router.push("/create-workout");
    };

    const handleStartWorkout = (): void => {
        if (todayWorkout && todayWorkout.id !== "REST") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push(`/workout-engine/${todayWorkout.id}`);
        }
    };

    return (
        <View
            style={{
                marginTop: EdgeInsetsCON.LG,
                marginBottom: EdgeInsetsCON.XXL,
            }}
        >
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
                <Pressable
                    onPress={handleViewAll}
                    hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                >
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
                </Pressable>
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
                    {todayWorkout.tags.map((tag, index) => (
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
                    {todayWorkout.title}
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
                    {todayWorkout.description}
                </Text>

                {/* CTA — sharp cornered */}
                {todayWorkout.id === "REST" ? (
                    <View
                        style={{
                            paddingVertical: EdgeInsetsCON.MD,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            backgroundColor: "transparent",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "700",
                                color: ColorFactoryCON.MUTE,
                                textTransform: "uppercase",
                                letterSpacing: 2,
                            }}
                        >
                            RESTING TODAY
                        </Text>
                    </View>
                ) : (
                    <StandardButtonComponent
                        label={HomeScreenCON.WORKOUT_START_CTA}
                        onPress={handleStartWorkout}
                        variant={StandardButtonComponentVariant.WHITE}
                        fullWidth
                        borderRadius={0}
                        fontSize={12}
                        fontWeight="700"
                    />
                )}
            </View>

            {/* Crave Something Else section */}
            <View style={{ marginTop: EdgeInsetsCON.XXL }}>
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        marginBottom: EdgeInsetsCON.LG,
                    }}
                >
                    {HomeScreenCON.WORKOUT_CRAVE_LABEL}
                </Text>
                <StandardButtonComponent
                    label={HomeScreenCON.WORKOUT_CREATE_CTA}
                    onPress={handleCreateWorkout}
                    variant={StandardButtonComponentVariant.DARK}
                    fullWidth
                    borderRadius={0}
                    fontSize={13}
                    fontWeight="700"
                />
            </View>
        </View>
    );
}
