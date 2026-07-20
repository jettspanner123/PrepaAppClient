import { WorkoutExerciseType } from "@/app/Types/WorkoutExerciseType";

export default class WorkoutEngineScreenCON {
    public static readonly PAGE_NAME: string = "WorkoutEngineScreen";

    public static readonly LABEL_ACTIVE_SESSION: string = "Active Session";
    public static readonly LABEL_ELAPSED_TIME: string = "Elapsed Time";
    public static readonly LABEL_SET: string = "SET";
    public static readonly LABEL_LBS: string = "LBS";
    public static readonly LABEL_REPS: string = "REPS";
    public static readonly CTA_FINISH: string = "COMPLETE";
    public static readonly CTA_ADD_SET: string = "+ Add Set";
    public static readonly CTA_START: string = "Start Workout";
    public static readonly CTA_PAUSE: string = "Pause";
    public static readonly CTA_RESUME: string = "Resume";
    public static readonly CTA_STOP: string = "Stop";

    public static readonly MODAL_START_TITLE: string = "Start Workout?";
    public static readonly MODAL_START_SUBTITLE: string =
        "Timer will begin and your session will be tracked.";
    public static readonly MODAL_STOP_TITLE: string = "Stop Workout?";
    public static readonly MODAL_STOP_SUBTITLE: string =
        "This will end your session. All progress will be saved.";
    public static readonly MODAL_COMPLETE_TITLE: string = "Complete Workout?";
    public static readonly MODAL_COMPLETE_SUBTITLE: string =
        "Are you sure you want to complete this workout? You won't be able to update it later.";

    public static readonly SESSION_TITLE_LINE1: string = "Workout";
    public static readonly SESSION_TITLE_LINE2: string = "Session";

    public static readonly EXERCISES: WorkoutExerciseType[] = [
        {
            id: "1",
            index: 1,
            category: "Main Lift",
            name: "Deadlift",
            sets: [
                {
                    id: "1-1",
                    setNumber: 1,
                    totalSets: 1,
                    weightPlaceholder: "225",
                    repsPlaceholder: "5",
                    completed: false,
                },
            ],
        },
        {
            id: "2",
            index: 2,
            category: "Secondary Lift",
            name: "Overhead Press",
            sets: [
                {
                    id: "2-1",
                    setNumber: 1,
                    totalSets: 1,
                    weightPlaceholder: "135",
                    repsPlaceholder: "8",
                    completed: false,
                },
            ],
        },
        {
            id: "3",
            index: 3,
            category: "Accessory",
            name: "Pull-Ups",
            sets: [
                {
                    id: "3-1",
                    setNumber: 1,
                    totalSets: 1,
                    weightPlaceholder: "BW",
                    repsPlaceholder: "AMRAP",
                    completed: false,
                },
            ],
        },
    ];
}
