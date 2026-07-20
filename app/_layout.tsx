import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "../global.css";
import ApplicationInitialStateService from "./Services/ApplicationInitialStateService";

// Prevent the splash screen from auto-hiding immediately on launch
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
    const [fontsLoaded, fontsError] = useFonts({
        Anton: require("../assets/fonts/Anton-Regular.ttf"),
    });

    const [isAppReady, setIsAppReady] = useState<boolean>(false);

    useEffect(() => {
        async function prepare(): Promise<void> {
            try {
                // Fetch the custom database exercises during native splash display
                await ApplicationInitialStateService.current.loadSplashScreenData();
            } catch (e) {
                console.warn(
                    "Failed to load initial application state during splash screen:",
                    e,
                );
            } finally {
                setIsAppReady(true);
            }
        }
        prepare();
    }, []);

    useEffect(() => {
        if ((fontsLoaded || fontsError) && isAppReady) {
            // Once resources are loaded, dismiss the splash screen
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontsError, isAppReady]);

    if ((!fontsLoaded && !fontsError) || !isAppReady) {
        // Return null to keep the native splash screen visible
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "#000000",
                },
            }}
        />
    );
}
