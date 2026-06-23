export default class OnboardingScreenCON {
    public static readonly PAGE_NAME: string = "OnboardingScreen";

    public static readonly TITLE: string = "Welcome";
    public static readonly SUBTITLE: string = "Let's get you set up.";

    public static readonly CTA_LABEL: string = "Get Started";

    // ─── Initial View ─────────────────────────────────────────────────
    public static readonly INITIAL_TITLE: string = "A Quick Assessment.";
    public static readonly INITIAL_SUBTITLE: string =
        "We'll ask you a few quick questions to set up your profile.";
    public static readonly INITIAL_STEP_LABEL: string = "What's ahead";

    public static readonly INITIAL_STEPS: {
        step: string;
        description: string;
    }[] = [
        {
            step: "Basic Info",
            description: "Your name, course and profile name.",
        },
        {
            step: "Course Info",
            description: "Details about what you're studying.",
        },
        {
            step: "Key Dates",
            description: "Your exam date and study start date.",
        },
    ];

    // ─── Basic Information View ───────────────────────────────────────
    public static readonly BASIC_INFO_TITLE: string = "Basic Information";
    public static readonly BASIC_INFO_SUBTITLE: string =
        "Tell us a bit about yourself. We'll use this information for your custom profile.";

    public static readonly LABEL_NAME: string = "Full Name";
    public static readonly PLACEHOLDER_NAME: string = "e.g. Uddeshya Singh";

    public static readonly LABEL_COURSE_NAME: string = "Course Name";
    public static readonly PLACEHOLDER_COURSE_NAME: string = "e.g. MBA, B.Tech";

    public static readonly LABEL_PROFILE_NAME: string = "Profile Name";
    public static readonly PLACEHOLDER_PROFILE_NAME: string =
        "e.g. My Study Profile";

    // ─── Course Information View ──────────────────────────────────────
    public static readonly COURSE_INFO_TITLE: string = "Course\nInformation";
    public static readonly COURSE_INFO_SUBTITLE: string =
        "Tell us what you're preparing for.\nWe'll tailor your experience around it.";

    public static readonly LABEL_STUDYING_FOR: string =
        "What are you studying for";
    public static readonly PLACEHOLDER_STUDYING_FOR: string =
        "e.g. CAT 2025, GMAT, GRE";

    public static readonly LABEL_ATTEMPT_YEAR: string =
        "Which year will you be attempting?";

    // ─── Date Information View ────────────────────────────────────────
    public static readonly DATE_INFO_TITLE: string = "Date\nInformation";
    public static readonly DATE_INFO_SUBTITLE: string =
        "Help us understand your timeline. Setting the right dates ensures your prep plan is paced perfectly for your goal.";

    public static readonly LABEL_EXAM_YEAR: string = "Which year is your exam";
    public static readonly LABEL_START_YEAR: string =
        "Which year are you starting prep";
    public static readonly LABEL_START_DATE: string =
        "When are you starting preparation?";
    public static readonly LABEL_EXAM_DATE: string = "When is the exam?";
}
