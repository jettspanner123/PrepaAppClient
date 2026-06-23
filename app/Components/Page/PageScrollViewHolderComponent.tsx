import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { ScrollView, View } from "react-native";

export default function PageScrollViewHolderComponent({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <ScrollView>
            <View
                style={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                }}
            >
                {children}
            </View>
        </ScrollView>
    );
}
