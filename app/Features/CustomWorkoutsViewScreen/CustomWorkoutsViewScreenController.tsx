import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import DatabaseService from "@/app/Services/DatabaseService";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomWorkoutsViewScreenCON from "./Constants/CustomWorkoutsViewScreenCON";
import CustomWorkoutsViewScreenCardStaticComponent from "./Components/static/CustomWorkoutsViewScreenCardStaticComponent";

const SHADOW_STYLE = {
    shadowColor: ColorFactoryCON.SHADOW,
    shadowOffset: {
        width: EdgeInsetsCON.SHADOW_OFFSET_W,
        height: EdgeInsetsCON.SHADOW_OFFSET_H,
    },
    shadowOpacity: EdgeInsetsCON.SHADOW_OPACITY,
    shadowRadius: EdgeInsetsCON.SHADOW_RADIUS,
    elevation: EdgeInsetsCON.SHADOW_ELEVATION,
};

function FABButton({
    label,
    onPress,
    isPrimary,
}: {
    label: string;
    onPress: () => void;
    isPrimary: boolean;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    const bg = isPrimary
        ? pressed
            ? ColorFactoryCON.HAIRLINE
            : ColorFactoryCON.WHITE
        : pressed
          ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
          : ColorFactoryCON.CARD_BG_LIGHT_PRESSED;

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            onPress={onPress}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    backgroundColor: bg,
                    borderWidth: 1,
                    borderColor: isPrimary
                        ? ColorFactoryCON.WHITE
                        : ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.LG,
                    alignItems: "center",
                    justifyContent: "center",
                    ...SHADOW_STYLE,
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: isPrimary
                            ? ColorFactoryCON.BLACK
                            : ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                    }}
                >
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

export default function CustomWorkoutsViewScreenController(): React.JSX.Element {
    const router = useRouter();
    const customWorkouts = useUserCustomDataStateStore(
        (state) => state.customWorkouts,
    );
    const setCustomWorkouts = useUserCustomDataStateStore(
        (state) => state.setCustomWorkouts,
    );

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const workoutsList = useMemo(
        () => (customWorkouts ? Object.entries(customWorkouts) : []),
        [customWorkouts],
    );

    const filteredWorkoutsList = useMemo(() => {
        if (!searchQuery.trim()) return workoutsList;
        const q = searchQuery.trim().toLowerCase();
        return workoutsList.filter(
            ([_, data]) =>
                data.name.toLowerCase().includes(q) ||
                data.exercises.some((ex) => ex.toLowerCase().includes(q)),
        );
    }, [workoutsList, searchQuery]);

    const handleClose = (): void => {
        if (isSelecting) {
            setIsSelecting(false);
            setSelectedIds(new Set());
            return;
        }
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const handleLongPress = (id: string): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsSelecting(true);
        setSelectedIds(new Set([id]));
    };

    const handleToggle = (id: string): void => {
        if (!isSelecting) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            if (next.size === 0) setIsSelecting(false);
            return next;
        });
    };

    const handleDelete = async (): Promise<void> => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

        try {
            const idsToDelete = Array.from(selectedIds);

            // Delete from database
            for (const id of idsToDelete) {
                await DatabaseService.getInstance().deleteWorkout(id);
            }

            // Update Zustand cache
            if (customWorkouts) {
                const updatedWorkouts = { ...customWorkouts };
                for (const id of idsToDelete) {
                    delete updatedWorkouts[id];
                }
                setCustomWorkouts(updatedWorkouts);
            }

            // Reset selection state
            setIsSelecting(false);
            setSelectedIds(new Set());
        } catch (error) {
            console.error("Error deleting custom workouts:", error);
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <ApplicationStickyToolbar
                title={CustomWorkoutsViewScreenCON.PAGE_TITLE}
                onClose={handleClose}
                leftIconType="back"
            />
            <ScrollView
                style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: CustomWorkoutsViewScreenCON.SCROLL_PADDING_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Search bar */}
                <View
                    style={{
                        marginTop: EdgeInsetsCON.LG,
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: searchFocused
                            ? ColorFactoryCON.WHITE
                            : ColorFactoryCON.CARD_BORDER,
                        paddingHorizontal: EdgeInsetsCON.LG,
                        paddingVertical: EdgeInsetsCON.MD,
                        marginBottom: EdgeInsetsCON.LG,
                        gap: EdgeInsetsCON.MD,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            color: searchFocused
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.MUTE,
                        }}
                    >
                        ⌕
                    </Text>
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder={CustomWorkoutsViewScreenCON.PLACEHOLDER_SEARCH}
                        placeholderTextColor={ColorFactoryCON.CARD_BORDER}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        style={{
                            flex: 1,
                            fontSize: 15,
                            fontWeight: "700",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            paddingVertical: EdgeInsetsCON.XS,
                        }}
                    />
                </View>

                {/* Section header */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        borderBottomWidth: 1,
                        borderBottomColor: ColorFactoryCON.CARD_BORDER,
                        marginBottom: EdgeInsetsCON.MD,
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                        }}
                    >
                        {isSelecting
                            ? `${selectedIds.size} SELECTED`
                            : CustomWorkoutsViewScreenCON.LABEL_YOUR_WORKOUTS}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                        }}
                    >
                        {filteredWorkoutsList.length} TOTAL
                    </Text>
                </View>

                {filteredWorkoutsList.length === 0 ? (
                    <Text
                        style={{
                            color: ColorFactoryCON.MUTE,
                            fontSize: 14,
                            marginTop: EdgeInsetsCON.MD,
                        }}
                    >
                        No custom workouts created yet.
                    </Text>
                ) : (
                    filteredWorkoutsList.map(([id, data]) => (
                        <CustomWorkoutsViewScreenCardStaticComponent
                            key={id}
                            id={id}
                            name={data.name}
                            exercises={data.exercises}
                            weekDay={data.weekDay}
                            isSelecting={isSelecting}
                            isSelected={selectedIds.has(id)}
                            onPress={() => handleToggle(id)}
                            onLongPress={() => handleLongPress(id)}
                        />
                    ))
                )}
            </ScrollView>

            {/* Floating action area */}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
                pointerEvents="box-none"
            >
                <View
                    style={{
                        position: "absolute",
                        bottom: EdgeInsetsCON.FAB_BOTTOM,
                        left: EdgeInsetsCON.SCREEN_H,
                        right: EdgeInsetsCON.SCREEN_H,
                        flexDirection: "row",
                    }}
                >
                    {isSelecting ? (
                        <StandardButtonComponent
                            label={`Delete (${selectedIds.size})`}
                            onPress={handleDelete}
                            variant={StandardButtonComponentVariant.DANGER}
                            fullWidth
                            borderRadius={0}
                            fontSize={13}
                            fontWeight="700"
                            style={[{ flex: 1 }]}
                        />
                    ) : (
                        <FABButton
                            label={CustomWorkoutsViewScreenCON.CTA_CREATE_WORKOUT}
                            onPress={() => router.push("/create-workout")}
                            isPrimary={true}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
