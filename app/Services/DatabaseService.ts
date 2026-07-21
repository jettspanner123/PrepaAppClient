import { database } from "@/app/Configurations/FirebaseConfiguration";
import { ExerciseDataType } from "@/app/Types/ExerciseDataType";
import { WorkoutDataType } from "@/app/Types/WorkoutDataType";
import { WorkoutSessionDataType } from "@/app/Types/WorkoutSessionDataType";
import { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import { get, push, ref, remove, set } from "firebase/database";

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
    public async saveExercise(exercise: ExerciseDataType): Promise<string> {
        const exercisesRef = ref(database, "users/jettspanner123/exercises");
        const newExerciseRef = push(exercisesRef);
        await set(newExerciseRef, {
            ...exercise,
            createdAt: Date.now(),
        });
        return newExerciseRef.key || "";
    }

    /**
     * Save a new workout to the Realtime Database for user jettspanner123
     * @param workout The workout details to persist
     * @returns The generated key of the new workout
     */
    public async saveWorkout(workout: WorkoutDataType): Promise<string> {
        const workoutsRef = ref(database, "users/jettspanner123/workouts");
        const newWorkoutRef = push(workoutsRef);
        const workoutId = newWorkoutRef.key || "";
        await set(newWorkoutRef, {
            ...workout,
            id: workoutId,
            createdAt: Date.now(),
        });
        return workoutId;
    }

    /**
     * Save a completed workout session log to the Realtime Database
     */
    public async saveWorkoutSession(session: WorkoutSessionDataType): Promise<string> {
        const sessionsRef = ref(database, "users/jettspanner123/sessions");
        const newSessionRef = push(sessionsRef);
        await set(newSessionRef, {
            ...session,
            completedAt: Date.now(),
        });
        return newSessionRef.key || "";
    }

    /**
     * Fetch all saved workouts for user jettspanner123 from the Realtime Database
     * @returns Record object of workouts or null
     */
    public async getWorkouts(): Promise<Record<string, WorkoutDataType> | null> {
        const workoutsRef = ref(database, "users/jettspanner123/workouts");
        const snapshot = await get(workoutsRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, WorkoutDataType>;
        }
        return null;
    }

    /**
     * Fetch all saved exercises for user jettspanner123 from the Realtime Database
     */
    public async getExercises(): Promise<Record<string, ExerciseDataType> | null> {
        const exercisesRef = ref(database, "users/jettspanner123/exercises");
        const snapshot = await get(exercisesRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, ExerciseDataType>;
        }
        return null;
    }

    /**
     * Delete a workout by its unique ID for user jettspanner123
     * @param workoutId Unique key of the workout
     */
    public async deleteWorkout(workoutId: string): Promise<void> {
        const workoutRef = ref(database, `users/jettspanner123/workouts/${workoutId}`);
        await remove(workoutRef);
    }

    /**
     * Update an existing exercise for user jettspanner123 in the Realtime Database
     * @param exerciseId The Firebase key of the exercise to update
     * @param exercise The updated exercise payload
     */
    public async updateExercise(exerciseId: string, exercise: ExerciseDataType): Promise<void> {
        const exerciseRef = ref(database, `users/jettspanner123/exercises/${exerciseId}`);
        await set(exerciseRef, {
            ...exercise,
            updatedAt: Date.now(),
        });
    }

    /**
     * Delete a custom exercise for user jettspanner123 from the Realtime Database
     * @param exerciseId The Firebase key of the exercise to delete
     */
    public async deleteExercise(exerciseId: string): Promise<void> {
        const exerciseRef = ref(database, `users/jettspanner123/exercises/${exerciseId}`);
        await remove(exerciseRef);
    }

    /**
     * Fetch the weekly schedule for user jettspanner123 from the Realtime Database
     */
    public async getSchedule(): Promise<Record<string, WorkoutCard> | null> {
        const scheduleRef = ref(database, "users/jettspanner123/schedule");
        const snapshot = await get(scheduleRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, WorkoutCard>;
        }
        return null;
    }

    /**
     * Fetch all completed workout sessions for user jettspanner123 from the Realtime Database
     */
    public async getWorkoutSessions(): Promise<Record<string, WorkoutSessionDataType> | null> {
        const sessionsRef = ref(database, "users/jettspanner123/sessions");
        const snapshot = await get(sessionsRef);
        if (snapshot.exists()) {
            return snapshot.val() as Record<string, WorkoutSessionDataType>;
        }
        return null;
    }

    /**
     * Save/update the workout assignment for a specific day in user jettspanner123's schedule
     * @param dayId The ID of the day (e.g., 'mon', 'tue')
     * @param workout The assigned workout object
     */
    public async saveScheduleDay(dayId: string, workout: WorkoutCard): Promise<void> {
        const dayRef = ref(database, `users/jettspanner123/schedule/${dayId}`);
        await set(dayRef, workout);
    }
}
