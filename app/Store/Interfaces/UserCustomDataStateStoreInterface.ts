import { ExerciseDataType } from "@/app/Types/ExerciseDataType";

export default interface UserCustomDataStateStoreInterface {
    customExercises: Record<string, ExerciseDataType> | null;
    setCustomExercises: (
        customExercises: Record<string, ExerciseDataType> | null,
    ) => void;
}
