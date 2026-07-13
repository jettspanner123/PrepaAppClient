import React from "react";
import { View } from "react-native";
import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";

export default function SettingsScreenController(): React.JSX.Element {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: ColorFactoryCON.BLACK,
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                paddingTop: EdgeInsetsCON.SCREEN_TOP,
            }}
        >
            <StandardPageHeaderComponent text="Settings" />
        </View>
    );
}
