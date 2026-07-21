import { ExerciseDataType } from "@/app/Types/ExerciseDataType";
import { WorkoutDataType } from "@/app/Types/WorkoutDataType";
import { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";

export default interface UserCustomDataStateStoreInterface {
    customExercises: Record<string, ExerciseDataType> | null;
    setCustomExercises: (
        customExercises: Record<string, ExerciseDataType> | null,
    ) => void;
    customWorkouts: Record<string, WorkoutDataType> | null;
    setCustomWorkouts: (
        customWorkouts: Record<string, WorkoutDataType> | null,
    ) => void;
    schedule: Record<string, WorkoutCard> | null;
    setSchedule: (schedule: Record<string, WorkoutCard> | null) => void;
}
