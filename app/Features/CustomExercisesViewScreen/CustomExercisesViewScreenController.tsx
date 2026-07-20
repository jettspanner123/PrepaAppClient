import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomExercisesViewScreenCON from "./Constants/CustomExercisesViewScreenCON";

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

// ─── Exercise row ─────────────────────────────────────────────────────────────
function ExerciseRow({
    id,
    name,
    muscleGroup,
    category,
    isSelecting,
    isSelected,
    onPress,
    onLongPress,
    onEdit,
}: {
    id: string;
    name: string;
    muscleGroup: string;
    category: string;
    isSelecting: boolean;
    isSelected: boolean;
    onPress: () => void;
    onLongPress: () => void;
    onEdit: () => void;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            delayLongPress={350}
        >
            <View
                style={{
                    paddingVertical: EdgeInsetsCON.MD,
                    borderBottomWidth: 1,
                    borderBottomColor: ColorFactoryCON.CARD_BORDER,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: EdgeInsetsCON.LG,
                    backgroundColor: pressed
                        ? ColorFactoryCON.CARD_BG_LIGHT
                        : "transparent",
                }}
            >
                {/* Checkbox — only in selection mode */}
                {isSelecting && (
                    <View
                        style={{
                            width: 24,
                            height: 24,
                            borderWidth: 2,
                            borderColor: isSelected
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.CARD_BORDER,
                            backgroundColor: isSelected
                                ? ColorFactoryCON.WHITE
                                : "transparent",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isSelected && (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "900",
                                    color: ColorFactoryCON.BLACK,
                                    lineHeight: 16,
                                }}
                            >
                                ✓
                            </Text>
                        )}
                    </View>
                )}

                {/* Name + category */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "900",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                            marginTop: 2,
                        }}
                    >
                        {muscleGroup} • {category}
                    </Text>
                </View>

                {/* Edit icon — hidden in selection mode */}
                {!isSelecting && (
                    <Pressable
                        onPress={onEdit}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                        style={{ padding: EdgeInsetsCON.SM }}
                    >
                        <Ionicons
                            name="create-outline"
                            size={20}
                            color={ColorFactoryCON.WHITE}
                        />
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
}

export default function CustomExercisesViewScreenController(): React.JSX.Element {
    const router = useRouter();
    const customExercises = useUserCustomDataStateStore(
        (state) => state.customExercises,
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const exerciseList = useMemo(
        () => (customExercises ? Object.entries(customExercises) : []),
        [customExercises],
    );

    const filteredExerciseList = useMemo(() => {
        if (!searchQuery.trim()) return exerciseList;
        const q = searchQuery.trim().toLowerCase();
        return exerciseList.filter(
            ([_, data]) =>
                data.name.toLowerCase().includes(q) ||
                data.muscleGroup.toLowerCase().includes(q) ||
                data.category.toLowerCase().includes(q),
        );
    }, [exerciseList, searchQuery]);

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

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <ApplicationStickyToolbar
                title={CustomExercisesViewScreenCON.PAGE_TITLE}
                onClose={handleClose}
                leftIconType="back"
            />
            <ScrollView
                style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: CustomExercisesViewScreenCON.SCROLL_PADDING_TOP,
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
                        placeholder="Search custom exercises..."
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
                            : CustomExercisesViewScreenCON.LABEL_YOUR_EXERCISES}
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
                        {filteredExerciseList.length} TOTAL
                    </Text>
                </View>

                {filteredExerciseList.length === 0 ? (
                    <Text
                        style={{
                            color: ColorFactoryCON.MUTE,
                            fontSize: 14,
                            marginTop: EdgeInsetsCON.MD,
                        }}
                    >
                        No custom exercises created yet.
                    </Text>
                ) : (
                    filteredExerciseList.map(([id, data]) => (
                        <ExerciseRow
                            key={id}
                            id={id}
                            name={data.name}
                            muscleGroup={data.muscleGroup}
                            category={data.category}
                            isSelecting={isSelecting}
                            isSelected={selectedIds.has(id)}
                            onPress={() => handleToggle(id)}
                            onLongPress={() => handleLongPress(id)}
                            onEdit={() => {
                                Haptics.impactAsync(
                                    Haptics.ImpactFeedbackStyle.Light,
                                );
                                router.push({
                                    pathname: "/exercise-details",
                                    params: {
                                        id,
                                        name: data.name,
                                        muscleGroup: data.muscleGroup,
                                        category: data.category,
                                        isCustom: "true",
                                    },
                                });
                            }}
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
                            onPress={() => {
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Warning,
                                );
                                // TODO: delete selected exercises
                                console.log("Delete", Array.from(selectedIds));
                            }}
                            variant={StandardButtonComponentVariant.DANGER}
                            fullWidth
                            borderRadius={0}
                            fontSize={13}
                            fontWeight="700"
                            style={[{ flex: 1 }]}
                        />
                    ) : (
                        <FABButton
                            label={CustomExercisesViewScreenCON.CTA_CREATE_EXERCISE}
                            onPress={() => router.push("/create-exercise")}
                            isPrimary={true}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
