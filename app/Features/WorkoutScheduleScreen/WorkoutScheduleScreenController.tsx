import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutScheduleScreenBottomSheetStaticComponent from "@/app/Features/WorkoutScheduleScreen/Components/static/WorkoutScheduleScreenBottomSheetStaticComponent";
import WorkoutScheduleScreenDayRowStaticComponent from "@/app/Features/WorkoutScheduleScreen/Components/static/WorkoutScheduleScreenDayRowStaticComponent";
import WorkoutScheduleScreenCON, {
    ScheduleDay,
} from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import WorkoutListScreenCON, { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import DatabaseService from "@/app/Services/DatabaseService";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutScheduleScreenController(): React.JSX.Element {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);
    const [schedule, setSchedule] = useState<Record<string, string>>({});

    // Load initial schedule from DB
    useEffect(() => {
        const fetchSchedule = async (): Promise<void> => {
            try {
                const data = await DatabaseService.getInstance().getSchedule();
                if (data) {
                    setSchedule(data);
                }
            } catch (error) {
                console.error("Error loading schedule from RTDB:", error);
            }
        };
        fetchSchedule();
    }, []);

    // Merge DB schedule with static mock DAYS configuration
    const dynamicDays = useMemo(() => {
        return WorkoutScheduleScreenCON.DAYS.map((day) => {
            const assignedWorkoutId = schedule[day.id];
            if (assignedWorkoutId) {
                const workout = WorkoutListScreenCON.WORKOUTS.find(
                    (w) => w.id === assignedWorkoutId,
                );
                if (workout) {
                    return {
                        ...day,
                        type: "assigned" as const,
                        label: workout.title,
                        sublabel: workout.tags.join(" / "),
                    };
                }
            }
            return day;
        });
    }, [schedule]);

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

            try {
                // Optimistically update local UI state
                setSchedule((prev) => ({
                    ...prev,
                    [selectedDay.id]: workout.id,
                }));

                // Save to RTDB
                await DatabaseService.getInstance().saveScheduleDay(
                    selectedDay.id,
                    workout.id,
                );

                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                );
            } catch (error) {
                console.error("Error updating schedule day in RTDB:", error);
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error,
                );

                // Rollback local state
                const originalData =
                    await DatabaseService.getInstance().getSchedule();
                if (originalData) {
                    setSchedule(originalData);
                }
            }
        },
        [selectedDay],
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

            {/* Bottom Sheet */}
            <WorkoutScheduleScreenBottomSheetStaticComponent
                visible={selectedDay !== null}
                day={selectedDay}
                onClose={handleCloseSheet}
                onSelectWorkout={handleSelectWorkout}
            />
        </SafeAreaView>
    );
}
