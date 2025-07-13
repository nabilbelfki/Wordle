"use client";
import React from "react";
import Key from "../Key/Key";
import styles from "./Keyboard.module.css";
import { keyboardRows } from "../../../constants/constants";

interface KeyboardProps {
    guesses: string[];
    solution: string;
    keyDown: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({guesses, solution, keyDown}) => {
    const keys = new Map();
    guesses.forEach(guess => {
        guess.split("").forEach((letter, index) => {
            let state = "absent";
            if (solution[index] === letter) state = "correct";
            else if (solution.includes(letter)) state = "present";
            keys.set(letter, state);
        });
    });

    return (
        <div className={styles.keyboard}>
           {keyboardRows.map((keyboardRow, index) =>
           <div key={index} className={styles.row}>
               {keyboardRow.map((key,index) => 
                   <Key key={index} letter={key} state={keys.has(key) ? keys.get(key) : 'new'} keyDown={keyDown}/>
               )}
           </div>
           )}
        </div>
    );
}

export default Keyboard;