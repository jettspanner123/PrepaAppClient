import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import DatabaseService from "@/app/Services/DatabaseService";
import { WorkoutSessionDataType } from "@/app/Types/WorkoutSessionDataType";
import { WorkoutSetType } from "@/app/Types/WorkoutSetType";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface WeekGroup {
    weekStartMs: number;
    weekRangeLabel: string;
    sessions: WorkoutSessionDataType[];
}

// ─── Helper Functions ────────────────────────────────────────────────────────
const getOrdinalSuffix = (dayNum: number): string => {
    if (dayNum > 3 && dayNum < 21) return "th";
    switch (dayNum % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

const formatWeekRangeText = (start: Date, end: Date): string => {
    const startDay = start.getDate();
    const startMonth = start.toLocaleDateString(undefined, { month: "long" });
    const endDay = end.getDate();
    const endMonth = end.toLocaleDateString(undefined, { month: "long" });
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const startStr = `${startDay}${getOrdinalSuffix(startDay)} ${startMonth}`;
    const endStr = `${endDay}${getOrdinalSuffix(endDay)} ${endMonth}`;

    if (startYear !== endYear) {
        return `${startStr} ${startYear} - ${endStr} ${endYear}`;
    }
    return `${startStr} - ${endStr}`;
};

const getWeekRangeKey = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const diffToMonday = day === 0 ? 6 : day - 1;

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return {
        start: startOfWeek,
        end: endOfWeek,
        keyString: formatWeekRangeText(startOfWeek, endOfWeek),
    };
};

const groupSessionsByWeek = (sessionList: WorkoutSessionDataType[]): WeekGroup[] => {
    const groupsMap: Record<number, WeekGroup> = {};

    for (const session of sessionList) {
        const timestamp = session.completedAt || Date.now();
        const { start, keyString } = getWeekRangeKey(timestamp);
        const weekStartMs = start.getTime();

        if (!groupsMap[weekStartMs]) {
            groupsMap[weekStartMs] = {
                weekStartMs,
                weekRangeLabel: keyString,
                sessions: [],
            };
        }
        groupsMap[weekStartMs].sessions.push(session);
    }

    return Object.values(groupsMap).sort((a, b) => b.weekStartMs - a.weekStartMs);
};

export default function JournalScreenController(): React.JSX.Element {
    const [sessions, setSessions] = useState<WorkoutSessionDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            setIsLoading(true);

            const fetchSessions = async (): Promise<void> => {
                try {
                    const data = await DatabaseService.getInstance().getWorkoutSessions();
                    if (isMounted) {
                        if (data) {
                            // Sort sessions descending by completedAt timestamp
                            const sortedList = Object.values(data).sort(
                                (a, b) => (b.completedAt || 0) - (a.completedAt || 0),
                            );
                            setSessions(sortedList);
                        } else {
                            setSessions([]);
                        }
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error("Error fetching completed sessions:", error);
                    if (isMounted) {
                        setIsLoading(false);
                    }
                }
            };

            fetchSessions();

            return () => {
                isMounted = false;
            };
        }, []),
    );

    const formatDate = (timestamp?: number): string => {
        if (!timestamp) return "Unknown Date";
        const date = new Date(timestamp);
        return (
            date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
            }) +
            " • " +
            date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
            })
        );
    };

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins === 0) return `${secs}s`;
        return `${mins}m ${secs}s`;
    };

    const getTopSetId = (sets: WorkoutSetType[]): string | null => {
        const completedSets = sets.filter((s) => s.completed);
        if (completedSets.length === 0) return null;

        let topSet = completedSets[0];
        let maxWeight = parseFloat(topSet.weightPlaceholder) || 0;
        let maxReps = parseFloat(topSet.repsPlaceholder) || 0;

        for (let i = 1; i < completedSets.length; i++) {
            const s = completedSets[i];
            const weight = parseFloat(s.weightPlaceholder) || 0;
            const reps = parseFloat(s.repsPlaceholder) || 0;

            if (weight > maxWeight) {
                maxWeight = weight;
                maxReps = reps;
                topSet = s;
            } else if (weight === maxWeight && reps > maxReps) {
                maxReps = reps;
                topSet = s;
            }
        }
        return topSet.id;
    };

    // Memoize grouping sessions by week
    const groupedWeeks = useMemo(() => {
        return groupSessionsByWeek(sessions);
    }, [sessions]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: ColorFactoryCON.BLACK,
            }}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
                showsVerticalScrollIndicator={false}
            >
                <StandardPageHeaderComponent text="Journal" />
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: ColorFactoryCON.MUTE,
                        marginTop: EdgeInsetsCON.SM,
                        marginBottom: EdgeInsetsCON.XL,
                        lineHeight: 18,
                    }}
                >
                    Your diary of completed workout logs and history.
                </Text>

                {isLoading ? (
                    <View
                        style={{
                            marginTop: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ActivityIndicator color={ColorFactoryCON.WHITE} size="large" />
                    </View>
                ) : groupedWeeks.length === 0 ? (
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            padding: EdgeInsetsCON.XL,
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            alignItems: "center",
                            marginTop: EdgeInsetsCON.MD,
                        }}
                    >
                        <Text
                            style={{
                                color: ColorFactoryCON.MUTE,
                                fontSize: 14,
                                textAlign: "center",
                                lineHeight: 20,
                            }}
                        >
                            No logged sessions yet. Complete scheduled workouts to fill your journal!
                        </Text>
                    </View>
                ) : (
                    groupedWeeks.map((group) => (
                        <View key={group.weekStartMs} style={{ marginBottom: EdgeInsetsCON.XL }}>
                            {/* Week range section header */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: EdgeInsetsCON.SM,
                                    borderLeftWidth: 3,
                                    borderLeftColor: ColorFactoryCON.WARNING,
                                    paddingLeft: EdgeInsetsCON.MD,
                                    marginBottom: EdgeInsetsCON.LG,
                                    marginTop: EdgeInsetsCON.SM,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "900",
                                        color: ColorFactoryCON.WHITE,
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                    }}
                                >
                                    {group.weekRangeLabel}
                                </Text>
                            </View>

                            {/* Session cards within this week */}
                            {group.sessions.map((session, sessionIdx) => (
                                <View
                                    key={session.completedAt || sessionIdx}
                                    style={{
                                        backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                                        borderWidth: 1,
                                        borderColor: ColorFactoryCON.CARD_BORDER,
                                        padding: EdgeInsetsCON.XL,
                                        marginBottom: EdgeInsetsCON.LG,
                                    }}
                                >
                                    {/* Top row: completed time & duration */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                                            paddingHorizontal: EdgeInsetsCON.XL,
                                            paddingVertical: EdgeInsetsCON.MD,
                                            borderBottomWidth: 1,
                                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
                                            marginHorizontal: -EdgeInsetsCON.XL,
                                            marginTop: -EdgeInsetsCON.XL,
                                            marginBottom: EdgeInsetsCON.MD,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontWeight: "800",
                                                color: ColorFactoryCON.WARNING,
                                                textTransform: "uppercase",
                                                letterSpacing: 1,
                                            }}
                                        >
                                            {formatDate(session.completedAt)}
                                        </Text>
                                        <View
                                            style={{
                                                paddingHorizontal: EdgeInsetsCON.SM,
                                                paddingVertical: 2,
                                                borderWidth: 1,
                                                borderColor: "rgba(255,255,255,0.15)",
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 9,
                                                    fontWeight: "700",
                                                    color: ColorFactoryCON.WHITE,
                                                    textTransform: "uppercase",
                                                    letterSpacing: 1.5,
                                                }}
                                            >
                                                TIME: {formatDuration(session.durationSeconds)}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Workout Title */}
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "900",
                                            color: ColorFactoryCON.WHITE,
                                            textTransform: "uppercase",
                                            letterSpacing: -0.5,
                                            marginBottom: EdgeInsetsCON.MD,
                                        }}
                                    >
                                        {session.workoutName}
                                    </Text>

                                    {/* Completed Exercises list */}
                                    {session.exercises && session.exercises.length > 0 && (
                                        <View
                                            style={{
                                                borderTopWidth: 1,
                                                borderTopColor: ColorFactoryCON.CARD_BORDER,
                                                paddingTop: EdgeInsetsCON.MD,
                                            }}
                                        >
                                            {session.exercises.map((exercise) => {
                                                const completedSets = exercise.sets.filter((s) => s.completed);
                                                if (completedSets.length === 0) return null;

                                                // Identify the top set of this exercise
                                                const topSetId = getTopSetId(exercise.sets);

                                                return (
                                                    <View
                                                        key={exercise.id}
                                                        style={{
                                                            marginBottom: EdgeInsetsCON.LG,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "700",
                                                                color: ColorFactoryCON.WHITE,
                                                                textTransform: "uppercase",
                                                                letterSpacing: 0.2,
                                                                marginBottom: EdgeInsetsCON.XS,
                                                            }}
                                                        >
                                                            {exercise.name}
                                                        </Text>

                                                        {/* Sets detailed list */}
                                                        <View style={{ gap: 4, paddingLeft: EdgeInsetsCON.SM }}>
                                                            {completedSets.map((set) => {
                                                                const isTopSet = set.id === topSetId;
                                                                return (
                                                                    <View
                                                                        key={set.id}
                                                                        style={{
                                                                            flexDirection: "row",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                            paddingVertical: 4,
                                                                            paddingHorizontal: EdgeInsetsCON.SM,
                                                                            backgroundColor: isTopSet
                                                                                ? "rgba(245, 158, 11, 0.08)"
                                                                                : "transparent",
                                                                            borderWidth: isTopSet ? 1 : 0,
                                                                            borderColor: isTopSet
                                                                                ? ColorFactoryCON.WARNING
                                                                                : "transparent",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                fontSize: 12,
                                                                                fontWeight: isTopSet ? "700" : "500",
                                                                                color: isTopSet
                                                                                    ? ColorFactoryCON.WARNING
                                                                                    : ColorFactoryCON.MUTE,
                                                                            }}
                                                                        >
                                                                            Set {set.setNumber}: {set.weightPlaceholder} lbs x {set.repsPlaceholder} reps
                                                                        </Text>
                                                                        {isTopSet && (
                                                                            <View
                                                                                style={{
                                                                                    backgroundColor: ColorFactoryCON.WARNING,
                                                                                    paddingHorizontal: 6,
                                                                                    paddingVertical: 2,
                                                                                }}
                                                                            >
                                                                                <Text
                                                                                    style={{
                                                                                        fontSize: 8,
                                                                                        fontWeight: "900",
                                                                                        color: ColorFactoryCON.BLACK,
                                                                                        letterSpacing: 0.5,
                                                                                    }}
                                                                                >
                                                                                    TOP SET
                                                                                </Text>
                                                                            </View>
                                                                        )}
                                                                    </View>
                                                                );
                                                            })}
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}
