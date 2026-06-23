import { create } from "zustand";
import OnboardingScreenOptions from "../Features/OnboardingScreen/Models/OnboardingScreenOptions";
import OnboardingStateStoreInterface from "./Interfaces/OnboardingStateStoreInterface";

const useOnboardingStateStore = create<OnboardingStateStoreInterface>(
    (set) => ({
        currentScreen: OnboardingScreenOptions.INITIAL_SCREEN,
        setCurrentScreen: (option: OnboardingScreenOptions) =>
            set({ currentScreen: option }),
    }),
);

export default useOnboardingStateStore;
