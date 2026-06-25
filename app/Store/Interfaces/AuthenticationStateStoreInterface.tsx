import AuthenticationScreenOptions from "@/app/Features/AuthenticationScreen/Models/AuthenticationScreenOptions";

export default interface AuthenticationStateStoreInterface {
    currentScreen: AuthenticationScreenOptions;
    setCurrentScreen: (screen: AuthenticationScreenOptions) => void;

    loginPhone: string;
    setLoginPhone: (phone: string) => void;

    registrationPhone: string;
    setRegistrationPhone: (phone: string) => void;
}
