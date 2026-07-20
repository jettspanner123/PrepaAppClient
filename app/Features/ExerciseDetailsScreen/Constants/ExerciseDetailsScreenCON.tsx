export default class ExerciseDetailsScreenCON {
    public static readonly PAGE_NAME: string = "ExerciseDetailsScreen";
    public static readonly PAGE_TITLE: string = "Exercise Details";
    public static readonly SCROLL_PADDING_TOP: number = 130;

    // Section labels
    public static readonly LABEL_EXERCISE_NAME: string = "Exercise Name";
    public static readonly LABEL_CHOOSE_MUSCLE_GROUP: string = "Muscle Group";
    public static readonly LABEL_CHOOSE_EQUIPMENT: string = "Equipment";
    public static readonly LABEL_CUSTOM_BADGE: string = "Custom";

    // CTAs
    public static readonly CTA_SAVE: string = "Save";
    public static readonly CTA_DELETE: string = "Delete";

    // Modal — Save
    public static readonly MODAL_SAVE_TITLE: string = "Save Changes?";
    public static readonly MODAL_SAVE_SUBTITLE: string =
        "Are you sure you want to save the changes to this exercise?";

    // Modal — Delete
    public static readonly MODAL_DELETE_TITLE: string = "Delete Exercise?";
    public static readonly MODAL_DELETE_SUBTITLE: string =
        "This will permanently remove the exercise. This action cannot be undone.";

    // Modal — Error
    public static readonly MODAL_ERROR_TITLE: string = "Something Went Wrong";
    public static readonly MODAL_ERROR_SUBTITLE: string =
        "An error occurred while saving your changes. Please try again.";
}

