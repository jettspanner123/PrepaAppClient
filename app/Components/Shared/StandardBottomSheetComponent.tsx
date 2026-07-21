import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    LayoutAnimation,
    Modal,
    PanResponder,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export interface BottomSheetAction {
    label: string;
    onPress: () => void;
    icon?: string;
}

interface StandardBottomSheetComponentProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    height?: string | number; // default '85%'
    rightIconType?: "more" | "none";
    onRightPress?: () => void;
    actions?: BottomSheetAction[];
}

function ActionButton({
    action,
    onPress,
}: {
    action: BottomSheetAction;
    onPress: (callback: () => void) => void;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            onPress={() => onPress(action.onPress)}
            style={{
                flex: 1,
                flexDirection: "row",
                gap: EdgeInsetsCON.XS,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                backgroundColor: pressed
                    ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
                    : ColorFactoryCON.CARD_BG_LIGHT,
                paddingVertical: EdgeInsetsCON.MD,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {action.icon && (
                <Ionicons
                    name={action.icon as any}
                    size={14}
                    color={ColorFactoryCON.WHITE}
                />
            )}
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                }}
            >
                {action.label}
            </Text>
        </Pressable>
    );
}

export default function StandardBottomSheetComponent({
    visible,
    title,
    onClose,
    children,
    height = "85%",
    rightIconType = "none",
    onRightPress,
    actions = [],
}: StandardBottomSheetComponentProps): React.JSX.Element {
    const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(visible);

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onClose();
    };

    const handleMorePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded((prev) => !prev);
        if (onRightPress) {
            onRightPress();
        }
    };

    const handleActionPress = (actionOnPress: () => void): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(false);
        actionOnPress();
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 5,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    sheetTranslateY.setValue(gestureState.dy);
                } else {
                    sheetTranslateY.setValue(gestureState.dy * 0.2);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 120 || gestureState.vy > 0.5) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onClose();
                } else {
                    Animated.spring(sheetTranslateY, {
                        toValue: 0,
                        damping: 25,
                        stiffness: 200,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            setIsExpanded(false);
            sheetTranslateY.setValue(SCREEN_HEIGHT);
            Animated.spring(sheetTranslateY, {
                toValue: 0,
                damping: 25,
                stiffness: 200,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(sheetTranslateY, {
                toValue: SCREEN_HEIGHT,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                setShowModal(false);
            });
        }
    }, [visible, sheetTranslateY]);

    const backdropBg = sheetTranslateY.interpolate({
        inputRange: [0, SCREEN_HEIGHT * 0.85, SCREEN_HEIGHT],
        outputRange: ["rgba(0,0,0,0.75)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"],
        extrapolate: "clamp",
    });

    return (
        <Modal
            visible={showModal}
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: backdropBg,
                    justifyContent: "flex-end",
                }}
            >
                {/* Dismiss Touch Area */}
                <Pressable
                    style={{ position: "absolute", inset: 0 } as any}
                    onPress={handleClose}
                />

                {/* Full Bottom Sheet Container */}
                <Animated.View
                    style={{
                        transform: [{ translateY: sheetTranslateY }],
                        height: height as any,
                        backgroundColor: ColorFactoryCON.INK,
                        borderRadius: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Sheet Header — styled like ApplicationStickyToolbar */}
                    <BlurView
                        {...panResponder.panHandlers}
                        intensity={50}
                        tint="dark"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            flexDirection: "column",
                            alignItems: "stretch",
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: EdgeInsetsCON.LG,
                            paddingBottom: EdgeInsetsCON.LG,
                            borderBottomWidth: 1,
                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
                        }}
                    >
                        {/* Header Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            {/* Close button */}
                            <Pressable
                                onPress={handleClose}
                                hitSlop={{
                                    top: 12,
                                    bottom: 12,
                                    left: 12,
                                    right: 12,
                                }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={ColorFactoryCON.WHITE}
                                />
                            </Pressable>

                            {/* Heading Title */}
                            <Text
                                style={{
                                    fontFamily: "Anton",
                                    fontSize: 24,
                                    fontWeight: "900",
                                    color: ColorFactoryCON.WHITE,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {title}
                            </Text>

                            {/* Right Options Toggle or Spacer */}
                            {rightIconType === "more" ? (
                                <Pressable
                                    onPress={handleMorePress}
                                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Ionicons
                                        name={isExpanded ? "close" : "ellipsis-vertical"}
                                        size={24}
                                        color={ColorFactoryCON.WHITE}
                                    />
                                </Pressable>
                            ) : (
                                <View style={{ width: 40 }} />
                            )}
                        </View>

                        {/* Expanded Actions */}
                        {isExpanded && actions && actions.length > 0 && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: EdgeInsetsCON.SM,
                                    marginTop: EdgeInsetsCON.LG,
                                    width: "100%",
                                }}
                            >
                                {actions.map((action, index) => (
                                    <ActionButton
                                        key={index}
                                        action={action}
                                        onPress={handleActionPress}
                                    />
                                ))}
                            </View>
                        )}
                    </BlurView>

                    {/* Scrollable Sheet Content */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: isExpanded ? 152 : 88,
                            paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                        }}
                    >
                        {children}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}
