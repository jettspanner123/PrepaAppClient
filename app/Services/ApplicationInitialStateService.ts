import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import DatabaseService from "./DatabaseService";

export default class ApplicationInitialStateService {
    private constructor() {}

    public static current = new ApplicationInitialStateService();

    /**
     * Load initial database payload during splash screen display
     */
    public async loadSplashScreenData(): Promise<boolean> {
        try {
            console.log(
                "Loading splash screen data: fetching custom exercises...",
            );
            const data = await DatabaseService.getInstance().getExercises();

            // Save the fetched custom exercises to the Zustand store
            useUserCustomDataStateStore.getState().setCustomExercises(data);

            console.log(
                "Successfully loaded custom exercises into Zustand store:",
                JSON.stringify(data, null, 2),
            );
            return true;
        } catch (error) {
            console.error(
                "Failed to load custom exercises during boot:",
                error,
            );
            return false;
        }
    }
}
