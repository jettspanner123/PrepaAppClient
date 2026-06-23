import OnboardingScreenOptions from "@/app/Features/OnboardingScreen/Models/OnboardingScreenOptions";

export default interface OnboardingStateStoreInterface {
    currentScreen: OnboardingScreenOptions;
    setCurrentScreen: (option: OnboardingScreenOptions) => void;
}
