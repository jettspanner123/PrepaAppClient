import { create } from "zustand";
import UserCustomDataStateStoreInterface from "./Interfaces/UserCustomDataStateStoreInterface";

const useUserCustomDataStateStore = create<UserCustomDataStateStoreInterface>(
    (set) => ({
        customExercises: null,
        setCustomExercises: (customExercises) => set({ customExercises }),
        customWorkouts: null,
        setCustomWorkouts: (customWorkouts) => set({ customWorkouts }),
        schedule: null,
        setSchedule: (schedule) => set({ schedule }),
    }),
);

export default useUserCustomDataStateStore;
