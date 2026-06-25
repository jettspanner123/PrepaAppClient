import { create } from "zustand";
import AuthenticationScreenOptions from "../Features/AuthenticationScreen/Models/AuthenticationScreenOptions";
import AuthenticationStateStoreInterface from "./Interfaces/AuthenticationStateStoreInterface";

const useAuthenticationStateStore = create<AuthenticationStateStoreInterface>(
    (set) => ({
        currentScreen: AuthenticationScreenOptions.LOGIN,
        setCurrentScreen: (screen: AuthenticationScreenOptions) =>
            set({ currentScreen: screen }),

        loginPhone: "",
        setLoginPhone: (phone: string) => set({ loginPhone: phone }),

        registrationPhone: "",
        setRegistrationPhone: (phone: string) =>
            set({ registrationPhone: phone }),

        registrationFullName: "",
        setRegistrationFullName: (name: string) =>
            set({ registrationFullName: name }),

        registrationDateOfBirth: null,
        setRegistrationDateOfBirth: (date) =>
            set({ registrationDateOfBirth: date }),
    }),
);

export default useAuthenticationStateStore;
