import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function PageScrollViewHolderComponent({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
