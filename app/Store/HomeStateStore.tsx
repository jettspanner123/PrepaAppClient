import { create } from "zustand";
import HomeScreenOptions from "../Features/HomeScreen/Models/HomeScreenOptions";
import HomeStateStoreInterface from "./Interfaces/HomeStateStoreInterface";

const useHomeStateStore = create<HomeStateStoreInterface>((set) => ({
    currentTab: HomeScreenOptions.WORKOUT,
    setCurrentTab: (tab: HomeScreenOptions) => set({ currentTab: tab }),
}));

export default useHomeStateStore;
