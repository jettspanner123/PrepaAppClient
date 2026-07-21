export interface WorkoutDataType {
    id?: string;
    name: string;
    weekDay: string | null;
    exercises: string[];
    createdAt?: number;
}
