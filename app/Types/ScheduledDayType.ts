import { WorkoutCard } from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";

export type DayOfWeekType =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export interface ScheduledDayType {
    day: DayOfWeekType;
    workout: WorkoutCard | null;
}
