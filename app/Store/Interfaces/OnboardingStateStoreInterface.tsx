import { FullDate } from "@/app/Components/Shared/StandardFullDateInputComponent";
import OnboardingScreenOptions from "@/app/Features/OnboardingScreen/Models/OnboardingScreenOptions";

export interface BasicInfoFields {
    name: string;
    courseName: string;
    profileName: string;
}

export interface CourseInfoFields {
    studyingFor: string;
    attemptYear: number | null;
}

export interface DateInfoFields {
    startDate: FullDate | null;
    examDate: FullDate | null;
}

export default interface OnboardingStateStoreInterface {
    currentScreen: OnboardingScreenOptions;
    setCurrentScreen: (option: OnboardingScreenOptions) => void;

    basicInfo: BasicInfoFields;
    setBasicInfo: (fields: Partial<BasicInfoFields>) => void;

    courseInfo: CourseInfoFields;
    setCourseInfo: (fields: Partial<CourseInfoFields>) => void;

    dateInfo: DateInfoFields;
    setDateInfo: (fields: Partial<DateInfoFields>) => void;
}
