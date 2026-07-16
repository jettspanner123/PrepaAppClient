import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { BlurView } from "expo-blur";
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
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "./StandardButtonComponent";

// ─── Constants ────────────────────────────────────────────────────────────────
const ITEM_HEIGHT = 40;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

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

interface StandardWeekDayInputComponentProps {
    label: string;
    value: string | null;
    onChange: (day: string) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    hasError?: boolean;
    isValid?: boolean;
    borderRadius?: number;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StandardWeekDayInputComponent({
    label,
    value,
    onChange,
    placeholder = "Select a day",
    inputClassName,
    labelClassName,
    hasError = false,
    isValid = false,
    borderRadius = EdgeInsetsCON.MD,
}: StandardWeekDayInputComponentProps): React.JSX.Element {
    const defaultIndex = value ? WEEK_DAYS.indexOf(value) : 0;
    const initialIndex = defaultIndex !== -1 ? defaultIndex : 0;

    const [open, setOpen] = useState<boolean>(false);
    const [tempIndex, setTempIndex] = useState<number>(initialIndex);
    const [hoveredIndex, setHoveredIndex] = useState<number>(initialIndex);

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
        const valIndex = value ? WEEK_DAYS.indexOf(value) : 0;
        const curIndex = valIndex !== -1 ? valIndex : 0;
        setTempIndex(curIndex);
        setHoveredIndex(curIndex);
        backdropOpacity.setValue(0);
        cardTranslateY.setValue(SCREEN_HEIGHT);
        setOpen(true);
    };

    const handleConfirm = (): void => {
        animateOut(() => {
            onChange(WEEK_DAYS[tempIndex]);
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
                        borderRadius,
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
                        {value ?? placeholder}
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
                    <Animated.View
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: backdropOpacity,
                        }}
                    >
                        <BlurView
                            intensity={30}
                            tint="dark"
                            style={{
                                flex: 1,
                            }}
                        />
                    </Animated.View>
                    <Pressable
                        style={{ position: "absolute", inset: 0 } as any}
                        onPress={handleCancel}
                    />

                    {/* Floating pill heading */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            marginBottom: EdgeInsetsCON.SM,
                        }}
                    >
                        <View
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor:
                                    ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                                borderRadius: 9999,
                                borderWidth: 1,
                                borderColor: ColorFactoryCON.CARD_BORDER,
                                paddingVertical: EdgeInsetsCON.XS,
                                paddingHorizontal: EdgeInsetsCON.LG,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "600",
                                    color: ColorFactoryCON.MUTE,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Card */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            borderRadius,
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            overflow: "hidden",
                        }}
                    >
                        {/* Wheel */}
                        <View
                            style={{
                                flexDirection: "row",
                                height: ITEM_HEIGHT * 5,
                            }}
                        >
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
                            <WheelColumn
                                data={WEEK_DAYS}
                                hoveredIndex={hoveredIndex}
                                onHoverChange={setHoveredIndex}
                                onSelectIndex={(i) => {
                                    setHoveredIndex(i);
                                    setTempIndex(i);
                                }}
                            />
                        </View>
                    </Animated.View>

                    {/* Floating buttons */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            flexDirection: "row",
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            gap: EdgeInsetsCON.SM,
                            marginTop: EdgeInsetsCON.SM,
                        }}
                    >
                        <StandardButtonComponent
                            label="Cancel"
                            onPress={handleCancel}
                            variant={StandardButtonComponentVariant.DARK}
                            style={{ flex: 1 }}
                            hapticStyle={Haptics.ImpactFeedbackStyle.Light}
                            borderRadius={borderRadius}
                        />
                        <StandardButtonComponent
                            label="Confirm"
                            onPress={handleConfirm}
                            variant={StandardButtonComponentVariant.WHITE}
                            style={{ flex: 1 }}
                            hapticStyle={Haptics.ImpactFeedbackStyle.Medium}
                            borderRadius={borderRadius}
                        />
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}
