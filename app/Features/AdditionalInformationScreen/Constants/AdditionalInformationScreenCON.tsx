export default class AdditionalInformationScreenCON {
    public static readonly PAGE_NAME: string = "AdditionalInformationScreen";

    // ─── Initial View ─────────────────────────────────────────────────
    public static readonly INITIAL_TITLE: string = "Let's Know\nYou Better";
    public static readonly INITIAL_SUBTITLE: string =
        "We need a few more details to personalise your experience. This will only take a moment.";
    public static readonly INITIAL_STEP_LABEL: string = "What's ahead";

    public static readonly INITIAL_STEPS: {
        step: string;
        description: string;
        accentColor: string;
    }[] = [
        {
            step: "Personal Info",
            description: "Your age, gender and background.",
            accentColor: "#1eaa52",
        },
        {
            step: "Additional Info",
            description: "Study habits and availability.",
            accentColor: "#1eaa52",
        },
    ];

    // ─── Personal Info View ───────────────────────────────────────────
    public static readonly PERSONAL_INFO_TITLE: string = "Personal\nInfo";
    public static readonly PERSONAL_INFO_SUBTITLE: string =
        "Tell us about yourself so we can tailor your prep plan to your needs.";

    public static readonly LABEL_NAME: string = "Full Name";
    public static readonly PLACEHOLDER_NAME: string = "e.g. Uddeshya Singh";
    public static readonly LABEL_DATE_OF_BIRTH: string = "Date of Birth";

    public static readonly LABEL_GENDER: string = "Gender";
    public static readonly GENDER_OPTIONS: string[] = [
        "Male",
        "Female",
        "Other",
        "Prefer not to say",
    ];

    // ─── Additional Info View ─────────────────────────────────────────
    public static readonly ADDITIONAL_INFO_TITLE: string = "Additional\nInfo";
    public static readonly ADDITIONAL_INFO_SUBTITLE: string =
        "A couple more details to help us build the most accurate prep schedule for you.";

    public static readonly LABEL_GRADUATION_YEAR: string = "Graduation Year";

    public static readonly LABEL_COLLEGE_NAME: string = "College Name";
    public static readonly PLACEHOLDER_COLLEGE_NAME: string =
        "e.g. IIM Ahmedabad";

    public static readonly LABEL_CURRENT_STATE: string =
        "Current State of Residence";
    public static readonly PLACEHOLDER_CURRENT_STATE: string =
        "e.g. Maharashtra";

    public static readonly LABEL_HOMETOWN_STATE: string = "Hometown State";
    public static readonly PLACEHOLDER_HOMETOWN_STATE: string =
        "e.g. Uttar Pradesh";

    public static readonly INDIAN_STATES: string[] = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
    ];

    // ─── Save View ────────────────────────────────────────────────────
    public static readonly SAVE_TITLE: string = "All\nDone!";
    public static readonly SAVE_SUBTITLE: string =
        "Your profile is complete. Tap below to save and jump into your personalised prep journey.";

    public static readonly SAVE_ITEMS: {
        label: string;
        description: string;
    }[] = [
        {
            label: "Personal Info",
            description: "Age, gender & background saved.",
        },
        { label: "Additional Info", description: "Study habits confirmed." },
    ];
}
