import { create } from "zustand";
import AuthenticationScreenOptions from "../Features/AuthenticationScreen/Models/AuthenticationScreenOptions";
import AuthenticationStateStoreInterface from "./Interfaces/AuthenticationStateStoreInterface";

const useAuthenticationStateStore = create<AuthenticationStateStoreInterface>(
    (set) => ({
        currentScreen: AuthenticationScreenOptions.LOGIN,
        setCurrentScreen: (screen: AuthenticationScreenOptions) =>
            set({ currentScreen: screen }),

        phoneNumber: "",
        setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),

        email: "",
        setEmail: (email: string) => set({ email }),

        registrationFullName: "",
        setRegistrationFullName: (name: string) =>
            set({ registrationFullName: name }),

        registrationDateOfBirth: null,
        setRegistrationDateOfBirth: (date) =>
            set({ registrationDateOfBirth: date }),
    }),
);

export default useAuthenticationStateStore;
