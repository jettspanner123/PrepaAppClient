import React, { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import ProfileSelectionScreenFABStaticComponent from "./Components/static/ProfileSelectionScreenFABStaticComponent";
import ProfileSelectionScreenHeroStaticComponent from "./Components/static/ProfileSelectionScreenHeroStaticComponent";
import ProfileSelectionScreenCardListController from "./Controllers/ProfileSelectionScreenCardListController";

export default function ProfileSelectionScreenController(): React.JSX.Element {
    const handleProfileSelect = useCallback((id: string): void => {
        console.log("Selected profile id:", id);
    }, []);

    const handleAddProfile = useCallback((): void => {
        console.log("Add profile tapped");
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-cf-black" edges={[]}>
            {/* ScrollView fills the entire space */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
                showsVerticalScrollIndicator={false}
            >
                <ProfileSelectionScreenHeroStaticComponent />
                <ProfileSelectionScreenCardListController
                    onProfileSelect={handleProfileSelect}
                />
            </ScrollView>

            {/* FAB floats over the ScrollView without blocking its touch area */}
            <View
                style={{
                    position: "absolute",
                    bottom: EdgeInsetsCON.FAB_BOTTOM,
                    left: EdgeInsetsCON.SCREEN_H,
                    right: EdgeInsetsCON.SCREEN_H,
                }}
                pointerEvents="box-none"
            >
                <ProfileSelectionScreenFABStaticComponent
                    onPress={handleAddProfile}
                />
            </View>
        </SafeAreaView>
    );
}
