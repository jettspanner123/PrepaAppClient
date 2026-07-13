import HomeScreenOptions from "@/app/Features/HomeScreen/Models/HomeScreenOptions";

export default interface HomeStateStoreInterface {
    currentTab: HomeScreenOptions;
    setCurrentTab: (tab: HomeScreenOptions) => void;
}
