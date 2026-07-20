import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function SplashScreenController(): React.JSX.Element {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: ColorFactoryCON.BLACK,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                source={require("../../../assets/images/SplashScreen/splash-screen-image.png")}
                style={{
                    width: 280,
                    height: 280,
                }}
                contentFit="contain"
            />
        </View>
    );
}
