import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import React from "react";
import { View } from "react-native";

export default function SplashScreenController(): React.JSX.Element {
    return (
        <View style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }} />
    );
}
