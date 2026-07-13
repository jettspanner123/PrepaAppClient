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

        graduationYear: null,
        setGraduationYear: (year) => set({ graduationYear: year }),

        collegeName: "",
        setCollegeName: (name: string) => set({ collegeName: name }),

        currentState: "",
        setCurrentState: (state: string) => set({ currentState: state }),

        hometownState: "",
        setHometownState: (state: string) => set({ hometownState: state }),
    }));

export default useAdditionalInformationStateStore;
