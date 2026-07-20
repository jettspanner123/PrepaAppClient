import { WorkoutSetType } from "./WorkoutSetType";

export interface WorkoutExerciseType {
    id: string;
    index: number;
    category: string;
    name: string;
    sets: WorkoutSetType[];
}
