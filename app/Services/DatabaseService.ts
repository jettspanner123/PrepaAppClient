import { database } from "@/app/Configurations/FirebaseConfiguration";
import { get, push, ref, remove, set } from "firebase/database";

export interface WorkoutData {
    name: string;
    weekDay: string | null;
    exercises: string[];
    createdAt?: number;
}

export interface ExerciseData {
    name: string;
    muscleGroup: string;
    category: string;
    createdAt?: number;
}

export default class DatabaseService {
    private static instance: DatabaseService;

    private constructor() {}

    /**
     * Get the singleton instance of DatabaseService
     */
    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    /**
     * Save a new exercise for user jettspanner123 to the Realtime Database
     */
    public async saveExercise(exercise: ExerciseData): Promise<string> {
        const exercisesRef = ref(database, "users/jettspanner123/exercises");
        const newExerciseRef = push(exercisesRef);
        await set(newExerciseRef, {
            ...exercise,
            createdAt: Date.now(),
        });
        return newExerciseRef.key || "";
    }

    /**
     * Save a new workout to the Realtime Database
     * @param workout The workout details to persist
     * @returns The generated key of the new workout
     */
    public async saveWorkout(workout: WorkoutData): Promise<string> {
        const workoutsRef = ref(database, "workouts");
        const newWorkoutRef = push(workoutsRef);
        await set(newWorkoutRef, {
            ...workout,
            createdAt: Date.now(),
        });
        return newWorkoutRef.key || "";
    }

    /**
     * Fetch all saved workouts from the Realtime Database
     * @returns Record object of workouts or null
     */
    public async getWorkouts(): Promise<Record<string, WorkoutData> | null> {
        const workoutsRef = ref(database, "workouts");
        const snapshot = await get(workoutsRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, WorkoutData>;
        }
        return null;
    }

    /**
     * Fetch all saved exercises for user jettspanner123 from the Realtime Database
     */
    public async getExercises(): Promise<Record<string, ExerciseData> | null> {
        const exercisesRef = ref(database, "users/jettspanner123/exercises");
        const snapshot = await get(exercisesRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, ExerciseData>;
        }
        return null;
    }

    /**
     * Delete a workout by its unique ID
     * @param workoutId Unique key of the workout
     */
    public async deleteWorkout(workoutId: string): Promise<void> {
        const workoutRef = ref(database, `workouts/${workoutId}`);
        await remove(workoutRef);
    }
}
