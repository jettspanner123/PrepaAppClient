import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardBottomSheetComponent from "@/app/Components/Shared/StandardBottomSheetComponent";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutScheduleScreenDayRowStaticComponent from "@/app/Features/WorkoutScheduleScreen/Components/static/WorkoutScheduleScreenDayRowStaticComponent";
import WorkoutScheduleScreenCON, {
    ScheduleDay,
} from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import WorkoutListScreenCON, {
    WorkoutCard,
} from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import DatabaseService from "@/app/Services/DatabaseService";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutScheduleScreenController(): React.JSX.Element {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);
    const [savingWorkoutId, setSavingWorkoutId] = useState<string | null>(null);

    const scheduleFromStore = useUserCustomDataStateStore((state) => state.schedule);
    const storeSchedule = useMemo(() => scheduleFromStore || {}, [scheduleFromStore]);
    const setStoreSchedule = useUserCustomDataStateStore((state) => state.setSchedule);
    const customWorkouts = useUserCustomDataStateStore((state) => state.customWorkouts);

    // Merge DB schedule with static mock DAYS configuration
    const dynamicDays = useMemo(() => {
        return WorkoutScheduleScreenCON.DAYS.map((day) => {
            const assignedWorkout = storeSchedule[day.id];
            if (assignedWorkout) {
                const tags = Array.isArray(assignedWorkout.tags) ? assignedWorkout.tags : ["Custom"];
                return {
                    ...day,
                    type: "assigned" as const,
                    label: assignedWorkout.title || assignedWorkout.name || "Workout",
                    sublabel: tags.join(" / "),
                };
            }
            return day;
        });
    }, [storeSchedule]);

    // Build the list of all selectable workouts (including static, custom, and Rest Day)
    const allWorkouts = useMemo(() => {
        const restDay: WorkoutCard = {
            id: "REST",
            tags: ["Rest"],
            title: "Rest Day",
            description: "Take some time to recover and rebuild.",
            exercises: [],
        };
        const staticList = WorkoutListScreenCON.WORKOUTS;
        const customList = customWorkouts
            ? Object.values(customWorkouts).map((w) => ({
                  id: w.id || "",
                  tags: ["Custom"],
                  title: w.name,
                  description: w.exercises.join(", "),
                  exercises: w.exercises.map((name) => ({ name })),
              }))
            : [];
        return [restDay, ...staticList, ...customList];
    }, [customWorkouts]);

    const handleClose = useCallback((): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    }, [router]);

    const handleEdit = useCallback((id: string): void => {
        const found = WorkoutScheduleScreenCON.DAYS.find((d) => d.id === id);
        if (found) {
            setSelectedDay(found);
        }
    }, []);

    const handleCloseSheet = useCallback((): void => {
        setSelectedDay(null);
    }, []);

    const handleSelectWorkout = useCallback(
        async (workout: WorkoutCard): Promise<void> => {
            if (!selectedDay) {
                return;
            }

            const updatedSchedule = {
                ...storeSchedule,
                [selectedDay.id]: workout,
            };

            try {
                // Optimistically update Zustand store
                setStoreSchedule(updatedSchedule);

                // Save to RTDB
                await DatabaseService.getInstance().saveScheduleDay(
                    selectedDay.id,
                    workout,
                );

                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                );
                handleCloseSheet();
            } catch (error) {
                console.error("Error updating schedule day in RTDB:", error);
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error,
                );

                // Rollback store state
                const originalData = await DatabaseService.getInstance().getSchedule();
                setStoreSchedule(originalData);
                throw error;
            }
        },
        [selectedDay, storeSchedule, setStoreSchedule, handleCloseSheet],
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <ApplicationStickyToolbar
                title={WorkoutScheduleScreenCON.PAGE_TITLE}
                onClose={handleClose}
                leftIconType="back"
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: WorkoutScheduleScreenCON.SCROLL_PADDING_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Day rows */}
                {dynamicDays.map((day) => (
                    <WorkoutScheduleScreenDayRowStaticComponent
                        key={day.id}
                        day={day}
                        onEdit={handleEdit}
                    />
                ))}
            </ScrollView>

            {/* Reusable Bottom Sheet */}
            <StandardBottomSheetComponent
                visible={selectedDay !== null}
                title={selectedDay ? selectedDay.day : ""}
                onClose={handleCloseSheet}
            >
                {allWorkouts.map((workout) => (
                    <View
                        key={workout.id}
                        style={{
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            padding: EdgeInsetsCON.XL,
                            marginBottom: EdgeInsetsCON.LG,
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
                            {workout.tags.map((tag, idx) => (
                                <View
                                    key={tag}
                                    style={{
                                        paddingHorizontal: EdgeInsetsCON.SM,
                                        paddingVertical: 2,
                                        borderWidth: 1,
                                        backgroundColor:
                                            idx === 0
                                                ? "rgba(255,255,255,0.1)"
                                                : "transparent",
                                        borderColor:
                                            idx === 0
                                                ? "rgba(255,255,255,0.3)"
                                                : "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: "700",
                                            color:
                                                idx === 0
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
                        {workout.exercises.length > 0 && (
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: ColorFactoryCON.CARD_BORDER,
                                    marginBottom: EdgeInsetsCON.LG,
                                }}
                            >
                                {workout.exercises.map((exercise, idx) => (
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
                                            {String(idx + 1).padStart(2, "0")}
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
                        )}

                        {/* Select CTA */}
                        {savingWorkoutId === workout.id ? (
                            <View
                                style={{
                                    width: "100%",
                                    paddingVertical: 14,
                                    backgroundColor: ColorFactoryCON.WHITE,
                                    borderRadius: 0,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ActivityIndicator
                                    color={ColorFactoryCON.INK}
                                    size="small"
                                />
                            </View>
                        ) : (
                            <StandardButtonComponent
                                label="Select"
                                onPress={async () => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium,
                                    );
                                    setSavingWorkoutId(workout.id);
                                    try {
                                        await handleSelectWorkout(workout);
                                    } catch (err) {
                                        console.error("Failed to save schedule day:", err);
                                    } finally {
                                        setSavingWorkoutId(null);
                                    }
                                }}
                                variant={StandardButtonComponentVariant.WHITE}
                                fullWidth
                                borderRadius={0}
                                fontSize={12}
                                fontWeight="700"
                            />
                        )}
                    </View>
                ))}
            </StandardBottomSheetComponent>
        </SafeAreaView>
    );
}
