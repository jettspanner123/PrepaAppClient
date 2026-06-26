import AuthenticationScreenOptions from "@/app/Features/AuthenticationScreen/Models/AuthenticationScreenOptions";

export default interface AuthenticationStateStoreInterface {
    currentScreen: AuthenticationScreenOptions;
    setCurrentScreen: (screen: AuthenticationScreenOptions) => void;

    phoneNumber: string;
    setPhoneNumber: (phone: string) => void;

    email: string;
    setEmail: (email: string) => void;

    registrationFullName: string;
    setRegistrationFullName: (name: string) => void;

    registrationDateOfBirth:
        | import("@/app/Components/Shared/StandardFullDateInputComponent").FullDate
        | null;
    setRegistrationDateOfBirth: (
        date:
            | import("@/app/Components/Shared/StandardFullDateInputComponent").FullDate
            | null,
    ) => void;
}
