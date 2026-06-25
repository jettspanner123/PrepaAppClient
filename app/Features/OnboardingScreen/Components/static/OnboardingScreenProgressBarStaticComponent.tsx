import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const TOTAL_STEPS = 5;
const DOT_SIZE = 6;
const ACTIVE_WIDTH = 24;

// ─── Single step dot ──────────────────────────────────────────────────────────
function StepDot({
    isActive,
    isCompleted,
}: {
    isActive: boolean;
    isCompleted: boolean;
}): React.JSX.Element {
    const width = useRef(
        new Animated.Value(isActive ? ACTIVE_WIDTH : DOT_SIZE),
    ).current;
    const opacity = useRef(
        new Animated.Value(isActive || isCompleted ? 1 : 0.25),
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(width, {
                toValue: isActive ? ACTIVE_WIDTH : DOT_SIZE,
                useNativeDriver: false,
                speed: 20,
                bounciness: 6,
            }),
            Animated.timing(opacity, {
                toValue: isActive || isCompleted ? 1 : 0.25,
                duration: 250,
                useNativeDriver: false,
            }),
        ]).start();
    }, [isActive, isCompleted]);

    return (
        <Animated.View
            style={{
                width,
                height: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
                backgroundColor: isActive
                    ? ColorFactoryCON.WHITE
                    : isCompleted
                      ? ColorFactoryCON.MUTE
                      : ColorFactoryCON.CARD_BORDER,
                opacity,
            }}
        />
    );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface OnboardingScreenProgressBarStaticComponentProps {
    progress: number; // 0 to 1
}

export default function OnboardingScreenProgressBarStaticComponent({
    progress,
}: OnboardingScreenProgressBarStaticComponentProps): React.JSX.Element {
    const currentStep = Math.round(progress * (TOTAL_STEPS - 1));

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: EdgeInsetsCON.XS,
            }}
        >
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <StepDot
                    key={i}
                    isActive={i === currentStep}
                    isCompleted={i < currentStep}
                />
            ))}
        </View>
    );
}
