"use client";
import React, { useEffect, useState} from "react";
import Letter from "./../Letter/Letter";
import styles from "./Guess.module.css";

interface GuessProps {
    guess: string;
    solution: string;
    guessed: boolean;
    shouldShake?: boolean;
    shouldFlip?: boolean;  // Add this prop
}

const Guess: React.FC<GuessProps> = ({ guess, solution, guessed, shouldShake, shouldFlip }) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (shouldShake) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [shouldShake]);

    return (
        <div className={`${styles.guess} ${shake ? styles.shake : ''}`}>
            {guess.split("").map((letter, index) => 
                <Letter 
                    key={index} 
                    letter={letter} 
                    state={
                        letter == ' ' 
                        ? 'new' : ( 
                            !guessed 
                            ? "typed" 
                            : (
                                solution[index] === letter 
                                ? "correct" 
                                : (
                                    solution.includes(letter) 
                                    ? 'present' 
                                    : 'absent' 
                                )
                            )
                        )
                    }
                    shouldFlip={shouldFlip && guessed}  // Only flip when guessed
                />
            )}
        </div>
    );
};

export default Guess;