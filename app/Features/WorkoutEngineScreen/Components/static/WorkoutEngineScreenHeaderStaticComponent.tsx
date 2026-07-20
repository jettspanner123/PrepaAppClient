import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutEngineScreenCON from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

interface WorkoutEngineScreenHeaderStaticComponentProps {
    isRunning: boolean;
    elapsed: number;
    onTick: () => void;
    titleLine1?: string;
    titleLine2?: string;
}

function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (v: number): string => String(v).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function WorkoutEngineScreenHeaderStaticComponent({
    isRunning,
    elapsed,
    onTick,
    titleLine1 = WorkoutEngineScreenCON.SESSION_TITLE_LINE1,
    titleLine2 = WorkoutEngineScreenCON.SESSION_TITLE_LINE2,
}: WorkoutEngineScreenHeaderStaticComponentProps): React.JSX.Element {
    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(onTick, 1000);
        return () => clearInterval(interval);
    }, [isRunning, onTick]);

    return (
        <View
            style={{
                paddingBottom: EdgeInsetsCON.XL,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                marginBottom: EdgeInsetsCON.XXL,
            }}
        >
            {/* Active session badge */}
            <View
                style={{
                    alignSelf: "flex-start",
                    backgroundColor: ColorFactoryCON.WHITE,
                    paddingHorizontal: EdgeInsetsCON.MD,
                    paddingVertical: EdgeInsetsCON.XXS,
                    marginBottom: EdgeInsetsCON.SM,
                }}
            >
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: ColorFactoryCON.BLACK,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                    }}
                >
                    {WorkoutEngineScreenCON.LABEL_ACTIVE_SESSION}
                </Text>
            </View>

            {/* Title — full width */}
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    lineHeight: 52,
                }}
            >
                {titleLine1}
            </Text>
            <Text
                style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    lineHeight: 52,
                    marginBottom: EdgeInsetsCON.LG,
                }}
            >
                {titleLine2}
            </Text>

            {/* Timer — on its own line below the title */}
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: EdgeInsetsCON.XXS,
                }}
            >
                {WorkoutEngineScreenCON.LABEL_ELAPSED_TIME}
            </Text>
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "700",
                    color: isRunning
                        ? ColorFactoryCON.WHITE
                        : ColorFactoryCON.MUTE,
                    letterSpacing: 3,
                    fontVariant: ["tabular-nums"],
                }}
            >
                {formatTime(elapsed)}
            </Text>
        </View>
    );
}
