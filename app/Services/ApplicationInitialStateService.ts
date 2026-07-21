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
                "Loading splash screen data: fetching custom exercises, workouts, and schedule...",
            );
            const exercisesData = await DatabaseService.getInstance().getExercises();
            const workoutsData = await DatabaseService.getInstance().getWorkouts();
            const scheduleData = await DatabaseService.getInstance().getSchedule();

            // Save the fetched data to the Zustand store
            useUserCustomDataStateStore.getState().setCustomExercises(exercisesData);
            useUserCustomDataStateStore.getState().setCustomWorkouts(workoutsData);
            useUserCustomDataStateStore.getState().setSchedule(scheduleData);

            console.log(
                "Successfully loaded custom exercises, workouts & schedule into Zustand store"
            );
            return true;
        } catch (error) {
            console.error(
                "Failed to load splash screen data during boot:",
                error,
            );
            return false;
        }
    }
}
