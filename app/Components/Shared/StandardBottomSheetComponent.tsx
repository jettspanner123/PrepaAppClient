import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

interface StandardBottomSheetComponentProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    height?: string | number; // default '85%'
}

export default function StandardBottomSheetComponent({
    visible,
    title,
    onClose,
    children,
    height = "85%",
}: StandardBottomSheetComponentProps): React.JSX.Element {
    const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const animateOut = (callback: () => void): void => {
        Animated.timing(sheetTranslateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: false,
        }).start(() => callback());
    };

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        animateOut(onClose);
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
                    animateOut(onClose);
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
            sheetTranslateY.setValue(SCREEN_HEIGHT);
            Animated.spring(sheetTranslateY, {
                toValue: 0,
                damping: 25,
                stiffness: 200,
                useNativeDriver: false,
            }).start();
        }
    }, [visible, sheetTranslateY]);

    const backdropBg = sheetTranslateY.interpolate({
        inputRange: [0, SCREEN_HEIGHT * 0.85, SCREEN_HEIGHT],
        outputRange: ["rgba(0,0,0,0.75)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"],
        extrapolate: "clamp",
    });

    return (
        <Modal
            visible={visible}
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
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: EdgeInsetsCON.LG,
                            paddingBottom: EdgeInsetsCON.LG,
                            borderBottomWidth: 1,
                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
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

                        {/* Right Spacer to center title */}
                        <View style={{ width: 40 }} />
                    </BlurView>

                    {/* Scrollable Sheet Content */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: 88,
                            paddingBottom:
                                EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                        }}
                    >
                        {children}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}
