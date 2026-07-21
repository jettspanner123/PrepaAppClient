import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutScheduleScreenBottomSheetStaticComponent from "@/app/Features/WorkoutScheduleScreen/Components/static/WorkoutScheduleScreenBottomSheetStaticComponent";
import WorkoutScheduleScreenDayRowStaticComponent from "@/app/Features/WorkoutScheduleScreen/Components/static/WorkoutScheduleScreenDayRowStaticComponent";
import WorkoutScheduleScreenCON, {
    ScheduleDay,
} from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import DatabaseService from "@/app/Services/DatabaseService";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutScheduleScreenController(): React.JSX.Element {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);

    const scheduleFromStore = useUserCustomDataStateStore((state) => state.schedule);
    const storeSchedule = useMemo(() => scheduleFromStore || {}, [scheduleFromStore]);
    const setStoreSchedule = useUserCustomDataStateStore((state) => state.setSchedule);


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
            } catch (error) {
                console.error("Error updating schedule day in RTDB:", error);
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error,
                );

                // Rollback store state
                const originalData =
                    await DatabaseService.getInstance().getSchedule();
                setStoreSchedule(originalData);
                throw error;
            }
        },
        [selectedDay, storeSchedule, setStoreSchedule],
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
