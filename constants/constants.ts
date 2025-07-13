export const WORD_LENGTH = 5;
export const TOTAL_GUESSES = 6;
export const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    , ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    , ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

type Setting = {
    id: string;
    title: string;
    subtitle?: string;
}

export const settings: Setting[] = [
    {
        id: "hard-mode",
        title: "Hard Mode",
        subtitle: "Any revealed hints must be used in subsequent guesses"
    },
    {
        id: "dark-theme",
        title: "Dark Theme"
    },
    {
        id: "high-contrast-mode",
        title: "High Contrast Mode",
        subtitle: "Contrast and colorblindness improvements"
    },
    {
        id: "input-only",
        title: "Onscreen Keyboard Input Only",
        subtitle: "Ignore key input except from the onscreen keyboard. Most helpful for users using speech recognition or other assistive devices."
    }
]