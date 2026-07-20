import { WorkoutExerciseType } from "./WorkoutExerciseType";

export interface WorkoutSessionDataType {
    workoutId: string;
    workoutName: string;
    exercises: WorkoutExerciseType[];
    durationSeconds: number;
    completedAt?: number;
}
