import { create } from "zustand";
import OnboardingScreenOptions from "../Features/OnboardingScreen/Models/OnboardingScreenOptions";
import OnboardingStateStoreInterface from "./Interfaces/OnboardingStateStoreInterface";

const useOnboardingStateStore = create<OnboardingStateStoreInterface>(
    (set) => ({
        currentScreen: OnboardingScreenOptions.INITIAL_SCREEN,
        setCurrentScreen: (option: OnboardingScreenOptions) =>
            set({ currentScreen: option }),

        basicInfo: { name: "", courseName: "", profileName: "" },
        setBasicInfo: (fields) =>
            set((state) => ({ basicInfo: { ...state.basicInfo, ...fields } })),

        courseInfo: { studyingFor: "", attemptYear: null },
        setCourseInfo: (fields) =>
            set((state) => ({
                courseInfo: { ...state.courseInfo, ...fields },
            })),

        dateInfo: { startDate: null, examDate: null },
        setDateInfo: (fields) =>
            set((state) => ({ dateInfo: { ...state.dateInfo, ...fields } })),
    }),
);

export default useOnboardingStateStore;
