
export default interface AdditionalInformationStateStoreInterface {
    name: string;
    setName: (name: string) => void;

    gender: string | null;
    setGender: (gender: string | null) => void;
}
