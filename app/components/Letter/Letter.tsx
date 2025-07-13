import React, { useEffect, useState } from "react";
import styles from "./Letter.module.css";

interface LetterProps {
    letter: string;
    state: "new" | "typed" | "correct" | "present" | "absent";
    shouldFlip?: boolean;
}

const Letter: React.FC<LetterProps> = ({ letter, state, shouldFlip }) => {
    const [flipped, setFlipped] = useState(false);
    const [displayLetter, setDisplayLetter] = useState(letter);
    const [displayState, setDisplayState] = useState<LetterProps["state"]>(state);

    useEffect(() => {
        // Always update the display letter and state
        setDisplayLetter(letter);
        setDisplayState(state);

        if (shouldFlip) {
            setFlipped(true);
            // For the flip animation, we'll temporarily show the old state
            setTimeout(() => {
                setDisplayLetter(letter);
                setDisplayState(state);
            }, 250); // Half of 500ms animation
        } else {
            setFlipped(false);
        }
    }, [shouldFlip, letter, state]);

    return (
        <div className={`${styles.letter} ${flipped ? styles.flip : ''} ${styles[displayState]}`}>
            {displayLetter.trim() === '' ? '\u00A0' : displayLetter}
        </div>
    );
};

export default Letter;