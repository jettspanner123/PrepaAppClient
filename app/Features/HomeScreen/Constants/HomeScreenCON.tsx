export default class HomeScreenCON {
    public static readonly PAGE_NAME: string = "HomeScreen";

    // ─── Workout Screen ───────────────────────────────────────────────
    public static readonly WORKOUT_WELCOME_LABEL: string = "Welcome Back";
    public static readonly WORKOUT_HERO_HEADLINE: string = "Forge Ahead.";
    public static readonly WORKOUT_SECTION_LABEL: string = "TODAY'S FORGE";
    public static readonly WORKOUT_VIEW_ALL: string = "View All";
    public static readonly WORKOUT_CRAVE_LABEL: string = "Crave Something Else";
    public static readonly WORKOUT_CREATE_CTA: string = "Create Workout";
    public static readonly WORKOUT_AI_INSIGHT: string =
        "Deadlifts got 100kg last time for 10 reps. Today's goal is 100kg for 11 reps.";

    public static readonly WORKOUT_TODAY_TAGS: string[] = [
        "STRENGTH",
        "HYPERTROPHY",
    ];
    public static readonly WORKOUT_TODAY_TITLE: string =
        "Back & Shoulders: Power V";
    public static readonly WORKOUT_TODAY_DESCRIPTION: string =
        "Advanced volume training focusing on structural aesthetics and functional torque.";
    public static readonly WORKOUT_START_CTA: string = "START SESSION";

    // ─── Stat tiles ───────────────────────────────────────────────────
    public static readonly STAT_STEPS_LABEL: string = "Total Steps";
    public static readonly STAT_STEPS_VALUE: string = "8,432";
    public static readonly STAT_STEPS_UNIT: string = "STEPS";

    public static readonly STAT_PROTEIN_LABEL: string = "Protein Rem.";
    public static readonly STAT_PROTEIN_VALUE: string = "42";
    public static readonly STAT_PROTEIN_UNIT: string = "G";

    public static readonly STAT_HEART_LABEL: string = "Avg Heart Rate";
    public static readonly STAT_HEART_VALUE: string = "142";
    public static readonly STAT_HEART_UNIT: string = "BPM";

    public static readonly STAT_ACTIVE_LABEL: string = "Active Time";
    public static readonly STAT_ACTIVE_VALUE: string = "58";
    public static readonly STAT_ACTIVE_UNIT: string = "MIN";

    // ─── Calories card ────────────────────────────────────────────────
    public static readonly CALORIES_LABEL: string = "DAILY CALORIES";
    public static readonly CALORIES_VALUE: string = "2,482";
    public static readonly CALORIES_UNIT: string = "KCAL";

    public static readonly CALORIES_BARS: number[] = [
        0.5, 0.67, 0.83, 1, 0.75, 0.58, 0.92,
    ];
}
