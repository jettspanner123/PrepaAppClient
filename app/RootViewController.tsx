import React, { useEffect, useState } from "react";
import HomeScreenController from "./Features/HomeScreen/HomeScreenController";
import SplashScreenController from "./Features/SplashScreen/SplashScreenController";
import ApplicationInitialStateService from "./Services/ApplicationInitialStateService";

export default function RootScreenController(): React.JSX.Element {
    const [isSplashActive, setIsSplashActive] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const initializeApp = async (): Promise<void> => {
            try {
                const isLoaded =
                    await ApplicationInitialStateService.current.loadSplashScreenData();
                if (isLoaded && isMounted) {
                    setIsSplashActive(false);
                }
            } catch (error) {
                console.error(
                    "Failed to load initial application state:",
                    error,
                );
            }
        };

        initializeApp();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isSplashActive) {
        return <SplashScreenController />;
    }

    return <HomeScreenController />;
}
