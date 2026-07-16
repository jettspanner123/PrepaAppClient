export default class EdgeInsetsCON {
    // ─── Base scale (8px grid) ────────────────────────────────────────
    public static readonly XXS: number = 2;
    public static readonly XS: number = 4;
    public static readonly SM: number = 8;
    public static readonly MD: number = 12;
    public static readonly LG: number = 16;
    public static readonly XL: number = 24;
    public static readonly XXL: number = 32;

    // ─── Semantic aliases ─────────────────────────────────────────────
    /** Horizontal screen gutter */
    public static readonly SCREEN_H: number = 15;
    /** Top padding for hero / first section */
    public static readonly SCREEN_TOP: number = 64;
    /** Bottom padding to clear the FAB */
    public static readonly SCROLL_BOTTOM_CLEARANCE: number = 120;
    /** Card internal top padding (band) */
    public static readonly CARD_TOP: number = 28;
    /** Card internal bottom padding (body) */
    public static readonly CARD_BOTTOM: number = 20;
    /** Gap between cards in the grid */
    public static readonly CARD_GAP: number = 10;
    /** Curved cap height between card band and body */
    public static readonly CARD_CAP_HEIGHT: number = 24;
    /** FAB distance from bottom of screen */
    public static readonly FAB_BOTTOM: number = 24;

    // ─── Shadow configurations ────────────────────────────────────────
    public static readonly SHADOW_OFFSET_W: number = 0;
    public static readonly SHADOW_OFFSET_H: number = 6;
    public static readonly SHADOW_OPACITY: number = 0.6;
    public static readonly SHADOW_RADIUS: number = 8;
    public static readonly SHADOW_ELEVATION: number = 8;

    // ─── Component sizing ─────────────────────────────────────────────
    public static readonly TOGGLE_SIZE: number = 20;
}
