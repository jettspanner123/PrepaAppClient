import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function OnboardingScreenInitialViewComponent(): React.JSX.Element {
    return (
        <ScrollView>
            <View
                style={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                }}
            >
                <Text className="text-white">Hello world</Text>
            </View>
        </ScrollView>
    );
}
