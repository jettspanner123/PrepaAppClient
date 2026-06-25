import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ─── Constants ────────────────────────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_FROM_YEAR = CURRENT_YEAR - 5;
const DEFAULT_TO_YEAR = CURRENT_YEAR + 10;
const ITEM_HEIGHT = 40;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FullDate {
    day: number;
    month: number; // 0-indexed
    year: number;
}

// ─── Wheel item ───────────────────────────────────────────────────────────────
function WheelItem({
    label,
    isHovered,
    onPress,
}: {
    label: string;
    isHovered: boolean;
    onPress: () => void;
}): React.JSX.Element {
    const scale = useRef(new Animated.Value(isHovered ? 1.05 : 1)).current;
    const colorAnim = useRef(new Animated.Value(isHovered ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(scale, {
            toValue: isHovered ? 1.05 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        Animated.timing(colorAnim, {
            toValue: isHovered ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isHovered]);

    const animatedColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [ColorFactoryCON.MUTE, ColorFactoryCON.WHITE],
    });

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: ITEM_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                <Animated.Text
                    style={{
                        fontSize: 15,
                        fontWeight: "400",
                        color: animatedColor,
                    }}
                >
                    {label}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

// ─── Wheel column ─────────────────────────────────────────────────────────────
function WheelColumn({
    data,
    hoveredIndex,
    onHoverChange,
    onSelectIndex,
}: {
    data: string[];
    hoveredIndex: number;
    onHoverChange: (index: number) => void;
    onSelectIndex: (index: number) => void;
}): React.JSX.Element {
    const listRef = useRef<FlatList>(null);
    const lastHapticIndex = useRef<number>(-1);

    useEffect(() => {
        setTimeout(() => {
            listRef.current?.scrollToIndex({
                index: hoveredIndex,
                animated: false,
            });
        }, 120);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={listRef}
                data={data}
                keyExtractor={(_, i) => String(i)}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate={0.96}
                scrollEventThrottle={16}
                extraData={hoveredIndex}
                onScroll={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    if (index >= 0 && index < data.length) {
                        onHoverChange(index);
                    }
                    if (
                        index !== lastHapticIndex.current &&
                        index >= 0 &&
                        index < data.length
                    ) {
                        lastHapticIndex.current = index;
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                }}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    onSelectIndex(index);
                }}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                renderItem={({ item, index }) => (
                    <WheelItem
                        label={item}
                        isHovered={index === hoveredIndex}
                        onPress={() => onSelectIndex(index)}
                    />
                )}
            />
        </View>
    );
}

interface StandardFullDateInputComponentProps {
    label: string;
    value: FullDate | null;
    onChange: (date: FullDate) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    fromYear?: number;
    toYear?: number;
    hasError?: boolean;
    isValid?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: FullDate): string {
    const day = String(date.day).padStart(2, "0");
    return `${day} ${MONTHS[date.month]} ${date.year}`;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StandardFullDateInputComponent({
    label,
    value,
    onChange,
    placeholder = "Select a date",
    inputClassName,
    labelClassName,
    fromYear = DEFAULT_FROM_YEAR,
    toYear = DEFAULT_TO_YEAR,
    hasError = false,
    isValid = false,
}: StandardFullDateInputComponentProps): React.JSX.Element {
    const today = new Date();
    const defaultDate: FullDate = value ?? {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    };

    const years = Array.from({ length: toYear - fromYear + 1 }, (_, i) =>
        String(fromYear + i),
    );

    const [open, setOpen] = useState<boolean>(false);
    const [tempDate, setTempDate] = useState<FullDate>(defaultDate);
    const [hoveredDay, setHoveredDay] = useState<number>(defaultDate.day - 1);
    const [hoveredMonth, setHoveredMonth] = useState<number>(defaultDate.month);
    const [hoveredYear, setHoveredYear] = useState<number>(
        years.indexOf(String(defaultDate.year)),
    );

    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!hasError) return;
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, [hasError]);

    const days = Array.from(
        { length: getDaysInMonth(tempDate.month, tempDate.year) },
        (_, i) => String(i + 1).padStart(2, "0"),
    );

    useEffect(() => {
        if (open) {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.spring(cardTranslateY, {
                    toValue: 0,
                    damping: 22,
                    stiffness: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [open]);

    const animateOut = (callback: () => void): void => {
        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(cardTranslateY, {
                toValue: SCREEN_HEIGHT,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => callback());
    };

    const handleOpen = (): void => {
        const d = value ?? defaultDate;
        setTempDate(d);
        setHoveredDay(d.day - 1);
        setHoveredMonth(d.month);
        setHoveredYear(years.indexOf(String(d.year)));
        backdropOpacity.setValue(0);
        cardTranslateY.setValue(SCREEN_HEIGHT);
        setOpen(true);
    };

    const handleConfirm = (): void => {
        animateOut(() => {
            onChange(tempDate);
            setOpen(false);
        });
    };

    const handleCancel = (): void => {
        animateOut(() => setOpen(false));
    };

    const backdropBg = backdropOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"],
    });

    return (
        <View style={{ gap: EdgeInsetsCON.XS }}>
            {/* Label */}
            <Text
                className={labelClassName}
                style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: isValid
                        ? ColorFactoryCON.SUCCESS
                        : hasError
                          ? ColorFactoryCON.DANGER
                          : ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    marginBottom: 5,
                    marginLeft: 5,
                }}
            >
                {label}
            </Text>

            {/* Trigger */}
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <Pressable
                    onPressIn={() =>
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    onPress={handleOpen}
                    className={inputClassName}
                    style={{
                        backgroundColor: ColorFactoryCON.INPUT_BG,
                        borderRadius: EdgeInsetsCON.MD,
                        borderWidth: 1,
                        borderColor: isValid
                            ? ColorFactoryCON.SUCCESS
                            : hasError
                              ? ColorFactoryCON.DANGER
                              : open
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.CARD_BORDER,
                        paddingHorizontal: EdgeInsetsCON.LG,
                        paddingVertical: EdgeInsetsCON.LG,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: value
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.MUTE,
                        }}
                    >
                        {value ? formatDate(value) : placeholder}
                    </Text>
                    <Text style={{ fontSize: 14, color: ColorFactoryCON.MUTE }}>
                        ›
                    </Text>
                </Pressable>
            </Animated.View>

            {/* Modal */}
            <Modal
                visible={open}
                transparent
                animationType="none"
                onRequestClose={handleCancel}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: backdropBg,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        style={{ position: "absolute", inset: 0 } as any}
                        onPress={handleCancel}
                    />

                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            borderRadius: EdgeInsetsCON.LG,
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            overflow: "hidden",
                        }}
                    >
                        {/* Title */}
                        <View
                            style={{
                                paddingHorizontal: EdgeInsetsCON.XL,
                                paddingTop: EdgeInsetsCON.XL,
                                paddingBottom: EdgeInsetsCON.MD,
                                borderBottomWidth: 1,
                                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 11,
                                    fontWeight: "600",
                                    color: ColorFactoryCON.MUTE,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                {label}
                            </Text>
                        </View>

                        {/* Three wheels */}
                        <View
                            style={{
                                flexDirection: "row",
                                height: ITEM_HEIGHT * 5,
                            }}
                        >
                            {/* Shared highlight strip */}
                            <View
                                pointerEvents="none"
                                style={{
                                    position: "absolute",
                                    top: ITEM_HEIGHT * 2,
                                    left: EdgeInsetsCON.LG,
                                    right: EdgeInsetsCON.LG,
                                    height: ITEM_HEIGHT,
                                    borderRadius: EdgeInsetsCON.SM,
                                    backgroundColor:
                                        ColorFactoryCON.WHITE_MUTED,
                                    borderWidth: 1,
                                    borderColor: ColorFactoryCON.CARD_BORDER,
                                }}
                            />

                            {/* Day */}
                            <WheelColumn
                                data={days}
                                hoveredIndex={hoveredDay}
                                onHoverChange={setHoveredDay}
                                onSelectIndex={(i) => {
                                    setHoveredDay(i);
                                    setTempDate((prev) => ({
                                        ...prev,
                                        day: i + 1,
                                    }));
                                }}
                            />

                            {/* Divider */}
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor:
                                        ColorFactoryCON.CARD_BORDER,
                                    marginVertical: EdgeInsetsCON.SM,
                                }}
                            />

                            {/* Month */}
                            <WheelColumn
                                data={MONTHS}
                                hoveredIndex={hoveredMonth}
                                onHoverChange={setHoveredMonth}
                                onSelectIndex={(i) => {
                                    setHoveredMonth(i);
                                    setTempDate((prev) => ({
                                        ...prev,
                                        month: i,
                                    }));
                                }}
                            />

                            {/* Divider */}
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor:
                                        ColorFactoryCON.CARD_BORDER,
                                    marginVertical: EdgeInsetsCON.SM,
                                }}
                            />

                            {/* Year */}
                            <WheelColumn
                                data={years}
                                hoveredIndex={hoveredYear}
                                onHoverChange={setHoveredYear}
                                onSelectIndex={(i) => {
                                    setHoveredYear(i);
                                    setTempDate((prev) => ({
                                        ...prev,
                                        year: fromYear + i,
                                    }));
                                }}
                            />
                        </View>

                        {/* Actions */}
                        <View
                            style={{
                                flexDirection: "row",
                                borderTopWidth: 1,
                                borderTopColor: ColorFactoryCON.CARD_BORDER,
                            }}
                        >
                            <Pressable
                                onPressIn={() =>
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light,
                                    )
                                }
                                onPress={handleCancel}
                                style={{
                                    flex: 1,
                                    paddingVertical: EdgeInsetsCON.LG,
                                    alignItems: "center",
                                    backgroundColor:
                                        ColorFactoryCON.DANGER_MUTED,
                                    borderRightWidth: 1,
                                    borderRightColor:
                                        ColorFactoryCON.CARD_BORDER,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "500",
                                        color: ColorFactoryCON.DANGER,
                                    }}
                                >
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                onPressIn={() =>
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium,
                                    )
                                }
                                onPress={handleConfirm}
                                style={{
                                    flex: 1,
                                    paddingVertical: EdgeInsetsCON.LG,
                                    alignItems: "center",
                                    backgroundColor:
                                        ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: ColorFactoryCON.WHITE,
                                    }}
                                >
                                    Confirm
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}
