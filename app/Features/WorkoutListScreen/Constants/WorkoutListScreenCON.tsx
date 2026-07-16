export interface WorkoutExerciseItem {
    name: string;
}

export interface WorkoutCard {
    id: string;
    tags: string[];
    title: string;
    description: string;
    exercises: WorkoutExerciseItem[];
}

export default class WorkoutListScreenCON {
    public static readonly PAGE_NAME: string = "WorkoutListScreen";
    public static readonly PAGE_TITLE: string = "All\nWorkouts";
    public static readonly PAGE_SUBTITLE: string = "Choose a session to begin.";
    public static readonly CTA_START: string = "Start Session";

    public static readonly WORKOUTS: WorkoutCard[] = [
        {
            id: "back",
            tags: ["Strength", "Volume"],
            title: "Back Day",
            description:
                "Deadlifts, rows and pulldowns targeting thickness and width.",
            exercises: [
                { name: "Deadlift" },
                { name: "Seated Rowing" },
                { name: "Dumbbell Rowing" },
                { name: "Lat Pulldowns" },
            ],
        },
        {
            id: "chest",
            tags: ["Strength", "Hypertrophy"],
            title: "Chest Day",
            description:
                "Flat bench, incline press and cable flyes for full chest development.",
            exercises: [
                { name: "Bench Press" },
                { name: "Incline Smith Machine Press" },
                { name: "Incline Dumbbell Press" },
                { name: "Cable Fly / Pec Dec" },
            ],
        },
        {
            id: "shoulders",
            tags: ["Strength", "Stability"],
            title: "Shoulders Day",
            description:
                "Overhead press, lateral raises and rear delt work for capped delts.",
            exercises: [
                { name: "Shoulder Press (Standing or Dumbbell)" },
                { name: "Lateral Raises" },
                { name: "Reverse Pec Dec" },
                { name: "Cable Side Raises" },
                { name: "Dumbbell Rear Delt Fly" },
            ],
        },
        {
            id: "legs-strength",
            tags: ["Strength", "Power"],
            title: "Legs — Strength",
            description:
                "Back squats, RDL and split squats for raw lower body strength.",
            exercises: [
                { name: "Back Squat" },
                { name: "Romanian Deadlift" },
                { name: "Bulgarian Split Squat" },
                { name: "Leg Extension" },
                { name: "Standing Calf Raise" },
            ],
        },
        {
            id: "arms",
            tags: ["Hypertrophy", "Isolation"],
            title: "Arms Day",
            description:
                "Curls, skull crushers and extensions for peak arm development.",
            exercises: [
                { name: "Close-Grip Bench Press" },
                { name: "EZ Bar Curls" },
                { name: "Skull Crushers" },
                { name: "Hammer Curls" },
                { name: "Overhead Tricep Extensions" },
                { name: "Incline Dumbbell Curls" },
            ],
        },
        {
            id: "legs-hypertrophy",
            tags: ["Hypertrophy", "Volume"],
            title: "Legs — Hypertrophy",
            description:
                "High volume squats, press and lunges for complete leg hypertrophy.",
            exercises: [
                { name: "High-Bar Squat" },
                { name: "Leg Press" },
                { name: "Walking Lunges" },
                { name: "Romanian Deadlift" },
                { name: "Leg Curls" },
                { name: "Leg Extension" },
                { name: "Calf Raise" },
            ],
        },
    ];
}
