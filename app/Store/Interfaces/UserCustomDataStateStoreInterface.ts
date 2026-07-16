import { ExerciseData } from "@/app/Services/DatabaseService";

export default interface UserCustomDataStateStoreInterface {
    customExercises: Record<string, ExerciseData> | null;
    setCustomExercises: (
        customExercises: Record<string, ExerciseData> | null,
    ) => void;
}
