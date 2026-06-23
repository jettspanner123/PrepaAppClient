export default class ProfileSelectionScreenCON {
    public static readonly PAGE_NAME: string = "ProfileSelectionScreen";

    public static readonly SCREEN_TITLE: string = "Who's using the app?";
    public static readonly SCREEN_SUBTITLE: string =
        "Select a profile to continue.";

    public static readonly ADD_PROFILE_LABEL: string = "Create New Profile";

    public static readonly PROFILES: {
        id: string;
        name: string;
        initials: string;
    }[] = [
        { id: "1", name: "Uddeshya", initials: "U" },
        { id: "2", name: "Vanshika", initials: "V" },
    ];
}
