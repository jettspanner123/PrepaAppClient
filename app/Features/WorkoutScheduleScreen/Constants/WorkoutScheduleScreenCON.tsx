export type DayType = "assigned" | "rest" | "unassigned";

export interface ScheduleDay {
    id: string;
    index: string;
    day: string;
    label: string;
    sublabel: string;
    type: DayType;
    time?: string;
}

export default class WorkoutScheduleScreenCON {
    public static readonly PAGE_NAME: string = "WorkoutScheduleScreen";
    public static readonly PAGE_TITLE: string = "Weekly Schedule";
    public static readonly PAGE_SUBTITLE: string = "Weekly Cycle";
    public static readonly SCROLL_PADDING_TOP: number = 130;
    public static readonly LABEL_ASSIGN: string = "Assign Workout";
    public static readonly CTA_EDIT: string = "Edit";
    public static readonly CTA_MAP: string = "Map";

    public static readonly DAYS: ScheduleDay[] = [
        {
            id: "mon",
            index: "01",
            day: "Monday",
            label: "Push Day A",
            sublabel: "Strength",
            type: "assigned",
            time: "07:00 AM",
        },
        {
            id: "tue",
            index: "02",
            day: "Tuesday",
            label: "Pull Day A",
            sublabel: "Volume",
            type: "assigned",
            time: "06:30 AM",
        },
        {
            id: "wed",
            index: "03",
            day: "Wednesday",
            label: "Rest Day",
            sublabel: "Recovery",
            type: "rest",
        },
        {
            id: "thu",
            index: "04",
            day: "Thursday",
            label: "Legs A",
            sublabel: "Posterior Chain",
            type: "assigned",
            time: "07:00 AM",
        },
        {
            id: "fri",
            index: "05",
            day: "Friday",
            label: "Upper Body B",
            sublabel: "Accessory",
            type: "assigned",
            time: "05:00 PM",
        },
        {
            id: "sat",
            index: "06",
            day: "Saturday",
            label: "",
            sublabel: "",
            type: "unassigned",
        },
        {
            id: "sun",
            index: "07",
            day: "Sunday",
            label: "Rest Day",
            sublabel: "Mobility",
            type: "rest",
        },
    ];
}
