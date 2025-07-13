"use client"
import React, { useEffect, useState } from "react";
import styles from "./Letter.module.css";

interface LetterProps {
    letter: string;
    state: "new" | "typed" | "correct" | "present" | "absent";
    flipDelay?: number; // Add flipDelay prop
}

const Letter: React.FC<LetterProps> = ({ letter, state, flipDelay }) => {
    const [flipped, setFlipped] = useState(false);
    const [displayLetter, setDisplayLetter] = useState(letter);
    const [displayState, setDisplayState] = useState<LetterProps["state"]>(state);

    useEffect(() => {
        setDisplayLetter(letter);
        setDisplayState(state);

        if (flipDelay !== undefined) {
            const timer = setTimeout(() => {
                setFlipped(true);
                // Update the displayed state halfway through animation
                setTimeout(() => {
                    setDisplayLetter(letter);
                    setDisplayState(state);
                }, 250); // Half of 500ms animation
            }, flipDelay);

            return () => clearTimeout(timer);
        }
    }, [flipDelay, letter, state]);

    return (
        <div className={`${styles.letter} ${flipped ? styles.flip : ''} ${styles[displayState]}`}>
            {displayLetter.trim() === '' ? '\u00A0' : displayLetter}
        </div>
    );
};

export default Letter;