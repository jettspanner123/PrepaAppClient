export default class CreateWorkoutScreenCON {
    public static readonly PAGE_NAME: string = "CreateWorkoutScreen";
    public static readonly PAGE_TITLE: string = "New Workout";
    public static readonly LABEL_WORKOUT_NAME: string = "Workout Name";
    public static readonly PLACEHOLDER_WORKOUT_NAME: string =
        "e.g. Leg Day Power";
    public static readonly LABEL_SELECT_EXERCISES: string = "Select Exercises";
    public static readonly PLACEHOLDER_SEARCH: string = "Search exercises...";
    public static readonly CTA_SAVE: string = "Save Workout";
    public static readonly SEARCH_FOCUS_SCROLL_Y: number = 220;
    public static readonly SCROLL_PADDING_TOP: number = 130;

    public static readonly MUSCLE_GROUPS: string[] = [
        "Chest",
        "Back",
        "Shoulders",
        "Arms",
        "Legs",
        "Core",
        "Traps",
        "Full Body",
        "Cardio",
    ];
}
