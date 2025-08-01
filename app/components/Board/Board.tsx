"use client"
import React, { useCallback, useState, useEffect } from "react";
import Guess from "../Guess/Guess";
import Keyboard from "../Keyboard/Keyboard";
import Message from "../Message/Message";
import styles from "./Board.module.css";
import { useTheme } from "../../context/ThemeContext";
import { WORD_LENGTH, TOTAL_GUESSES } from "../../../constants/constants";

interface Guess {
    guess: string;
    setGuess: React.Dispatch<React.SetStateAction<string>>;
}

const Board: React.FC = () => {
    const { inputMode } = useTheme();
    const [guesses, setGuesses] = useState<string[]>(
        Array(TOTAL_GUESSES).fill(Array(WORD_LENGTH).fill(" ").join(""))
    );
    const [gameOver, setGameOver] = useState(false);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [flipRow, setFlipRow] = useState<number | null>(null);
    const [solution, setSolution] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // In your parent component (e.g., Board.tsx)
    const [shakeRow, setShakeRow] = useState<number | null>(null);

    useEffect(()=>{
        fetch('valid-words.csv')
        .then(response => response.text())
        .then(data => {
        const words = data.split("\n");
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        setSolution(randomWord.toUpperCase());
        });
    }, []);
    
    console.log(currentGuessIndex)

    const typing = useCallback((key: string) => {
        if (currentGuessIndex < TOTAL_GUESSES) {
            const currentGuess = guesses[currentGuessIndex];
            const currentLetterPosition = currentGuess.indexOf(" ");
            const lastFilledPosition = currentGuess.indexOf(" ") === -1 
                ? WORD_LENGTH - 1 
                : currentGuess.indexOf(" ") - 1;
    
            if (key === 'Enter' && currentGuess.indexOf(" ") === -1) {
                fetch('word-bank.csv')
                .then(response => response.text())
                .then(data => {
                    data.replaceAll("\r", '')
                    const words = data.split("\n");
                    if (currentGuess === solution) {
                        setFlipRow(currentGuessIndex);
                        
                        // Reset states before triggering again
                        setShowMessage(false);
                        
                        // Use setTimeout to ensure state reset before triggering
                        setTimeout(() => {
                            setMessage("Impressive!");
                            setShowMessage(true);
                        }, 10);

                        setTimeout(() => {
                            setCurrentGuessIndex(TOTAL_GUESSES);
                        }, 500);
                    } else if (words.includes(currentGuess.toLowerCase())) {
                        setFlipRow(currentGuessIndex);
                        setTimeout(() => {
                            setCurrentGuessIndex(oldIndex => oldIndex + 1);
                            if (currentGuessIndex === TOTAL_GUESSES - 1) {
                                setMessage(solution);
                                setShowMessage(true);
                                setGameOver(true);
                            }
                        }, 500);
                    } else {
                        // Reset states before triggering again
                        setShowMessage(false);
                        setShakeRow(null);
                        
                        // Use setTimeout to ensure state reset before triggering
                        setTimeout(() => {
                            setMessage("Not in word list");
                            setShowMessage(true);
                            setShakeRow(currentGuessIndex);
                        }, 10);
                    }
                });
            } else if (key === 'Backspace') {
                setGuesses(prev => {
                    const newGuesses = [...prev];
                    const currentGuess = newGuesses[currentGuessIndex];
                    
                    if (lastFilledPosition >= 0) {
                        newGuesses[currentGuessIndex] = 
                            currentGuess.substring(0, lastFilledPosition) + 
                            " " + 
                            currentGuess.substring(lastFilledPosition + 1);
                    }
                    return newGuesses;
                });
            } else if (key.toUpperCase().match(/^[A-Z]$/) && currentGuess.replaceAll(' ', '').length < WORD_LENGTH) {
                setGuesses(prev => {
                    const newGuesses = [...prev];
                    newGuesses[currentGuessIndex] = 
                        currentGuess.substring(0, currentLetterPosition) + 
                        key.toUpperCase() + 
                        currentGuess.substring(currentLetterPosition + 1);
                    return newGuesses;
                });
            }
        }
    }, [currentGuessIndex, guesses, solution]);


    useEffect(() => {
        const handleTyping = (event: KeyboardEvent) => {
            if (inputMode === 'keyboard') {
                if (!event.ctrlKey && !event.altKey && !event.metaKey) {
                    typing(event.key);
                }
            }   
        };
        
        window.addEventListener('keydown', handleTyping);
        return () => window.removeEventListener('keydown', handleTyping);
    }, [currentGuessIndex, guesses, inputMode, typing]);


    return (
        <div className={styles.board}>
            <div className={styles.messages}>
                <Message text={message} show={showMessage} permanent={gameOver} />
            </div>
            {guesses.map((guess, index) =>
                <Guess 
                    key={index} 
                    guess={guess} 
                    solution={solution} 
                    guessed={index < currentGuessIndex} 
                    shouldShake={shakeRow === index}
                    shouldFlip={flipRow === index} 
                />
            )}
            <Keyboard 
                guesses={guesses.slice(0, 
                currentGuessIndex)} 
                solution={solution} 
                keyDown={typing} 
            />
        </div>
    );
}

export default Board;