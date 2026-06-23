/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            // ─── ColorFactoryCON ──────────────────────────────────────────
            colors: {
                "cf-black": "#000000",
                "cf-ink": "#111111",
                "cf-card-bg": "#0a0a0a",
                "cf-card-band": "#1a1a1a",
                "cf-card-border": "#2a2a2a",
                "cf-white": "#ffffff",
                "cf-mute": "#707072",
                "cf-shadow": "#000000",
            },
            // ─── EdgeInsetsCON ────────────────────────────────────────────
            spacing: {
                "ei-xxs": 2,
                "ei-xs": 4,
                "ei-sm": 8,
                "ei-md": 12,
                "ei-lg": 16,
                "ei-xl": 24,
                "ei-xxl": 32,
                "ei-screen-h": 24,
                "ei-screen-top": 64,
                "ei-scroll-clearance": 120,
                "ei-card-top": 28,
                "ei-card-bottom": 20,
                "ei-card-gap": 16,
                "ei-card-cap": 24,
                "ei-fab-bottom": 6,
            },
            borderRadius: {
                "ei-xl": 24,
                "ei-cap": 16,
            },
        },
    },
    plugins: [],
};
