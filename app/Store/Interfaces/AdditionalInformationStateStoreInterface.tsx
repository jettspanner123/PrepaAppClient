export default interface AdditionalInformationStateStoreInterface {
    name: string;
    setName: (name: string) => void;

    gender: string | null;
    setGender: (gender: string | null) => void;

    graduationYear: number | null;
    setGraduationYear: (year: number | null) => void;

    collegeName: string;
    setCollegeName: (name: string) => void;

    currentState: string;
    setCurrentState: (state: string) => void;

    hometownState: string;
    setHometownState: (state: string) => void;
}
