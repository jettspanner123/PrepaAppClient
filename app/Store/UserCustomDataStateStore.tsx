import { create } from "zustand";
import UserCustomDataStateStoreInterface from "./Interfaces/UserCustomDataStateStoreInterface";

const useUserCustomDataStateStore = create<UserCustomDataStateStoreInterface>(
    (set) => ({
        customExercises: null,
        setCustomExercises: (customExercises) => set({ customExercises }),
    }),
);

export default useUserCustomDataStateStore;
