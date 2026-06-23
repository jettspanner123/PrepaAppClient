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
const ITEM_HEIGHT = 52;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

// ─── Props ────────────────────────────────────────────────────────────────────
interface StandardDateInputComponentProps {
    label: string;
    value: number | null;
    onChange: (year: number) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    fromYear?: number;
    toYear?: number;
}

export default function StandardDateInputComponent({
    label,
    value,
    onChange,
    placeholder = "Select a year",
    inputClassName,
    labelClassName,
    fromYear = DEFAULT_FROM_YEAR,
    toYear = DEFAULT_TO_YEAR,
}: StandardDateInputComponentProps): React.JSX.Element {
    const years: number[] = Array.from(
        { length: toYear - fromYear + 1 },
        (_, i) => fromYear + i,
    );
    const [open, setOpen] = useState<boolean>(false);
    const [tempYear, setTempYear] = useState<number>(value ?? CURRENT_YEAR);
    const listRef = useRef<FlatList>(null);

    // backdrop opacity — cannot use nativeDriver (color-adjacent bg)
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    // card slide — translateY, can use nativeDriver
    const cardTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    // Animate in when open becomes true
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

            // Scroll to selected year
            setTimeout(() => {
                const index = years.indexOf(value ?? CURRENT_YEAR);
                if (index !== -1) {
                    listRef.current?.scrollToIndex({ index, animated: false });
                }
            }, 100);
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
        ]).start(() => {
            callback();
        });
    };

    const handleOpen = (): void => {
        setTempYear(value ?? CURRENT_YEAR);
        backdropOpacity.setValue(0);
        cardTranslateY.setValue(SCREEN_HEIGHT);
        setOpen(true);
    };

    const handleConfirm = (): void => {
        animateOut(() => {
            onChange(tempYear);
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
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    marginBottom: 5,
                    marginLeft: 5,
                }}
            >
                {label}
            </Text>

            {/* Trigger */}
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
                    borderColor: open
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
                    {value ? String(value) : placeholder}
                </Text>
                <Text style={{ fontSize: 14, color: ColorFactoryCON.MUTE }}>
                    ›
                </Text>
            </Pressable>

            {/* Year picker modal */}
            <Modal
                visible={open}
                transparent
                animationType="none"
                onRequestClose={handleCancel}
            >
                {/* Animated backdrop */}
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

                    {/* Animated card — slides up from bottom */}
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

                        {/* Year scroll list */}
                        <View style={{ height: ITEM_HEIGHT * 5 }}>
                            {/* Selection highlight strip */}
                            <View
                                pointerEvents="none"
                                style={{
                                    position: "absolute",
                                    top: ITEM_HEIGHT * 2,
                                    left: EdgeInsetsCON.LG,
                                    right: EdgeInsetsCON.LG,
                                    height: ITEM_HEIGHT,
                                    borderRadius: EdgeInsetsCON.SM,
                                    backgroundColor: ColorFactoryCON.INK,
                                    borderWidth: 1,
                                    borderColor: ColorFactoryCON.CARD_BORDER,
                                }}
                            />
                            <FlatList
                                ref={listRef}
                                data={years}
                                keyExtractor={(item) => String(item)}
                                showsVerticalScrollIndicator={false}
                                snapToInterval={ITEM_HEIGHT}
                                decelerationRate="fast"
                                onMomentumScrollEnd={(e) => {
                                    const index = Math.round(
                                        e.nativeEvent.contentOffset.y /
                                            ITEM_HEIGHT,
                                    );
                                    setTempYear(years[index] ?? CURRENT_YEAR);
                                }}
                                contentContainerStyle={{
                                    paddingVertical: ITEM_HEIGHT * 2,
                                }}
                                getItemLayout={(_, index) => ({
                                    length: ITEM_HEIGHT,
                                    offset: ITEM_HEIGHT * index,
                                    index,
                                })}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => setTempYear(item)}
                                        style={{
                                            height: ITEM_HEIGHT,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize:
                                                    item === tempYear ? 20 : 16,
                                                fontWeight:
                                                    item === tempYear
                                                        ? "700"
                                                        : "400",
                                                color:
                                                    item === tempYear
                                                        ? ColorFactoryCON.WHITE
                                                        : ColorFactoryCON.MUTE,
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
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
