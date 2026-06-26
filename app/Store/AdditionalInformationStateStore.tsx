import { create } from "zustand";
import AdditionalInformationStateStoreInterface from "./Interfaces/AdditionalInformationStateStoreInterface";

const useAdditionalInformationStateStore =
    create<AdditionalInformationStateStoreInterface>((set) => ({
        name: "",
        setName: (name: string) => set({ name }),

        dateOfBirth: null,
        setDateOfBirth: (date) => set({ dateOfBirth: date }),

        gender: null,
        setGender: (gender) => set({ gender }),
    }));

export default useAdditionalInformationStateStore;
