// components/Toggle/Toggle.tsx
"use client"
import React from "react";
import styles from "./Toggle.module.css";

interface ToggleProps {
    isOn: boolean;
    handleToggle: () => void;
    disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, handleToggle, disabled = false }) => {
    return (
        <button 
            className={`${styles.toggle} ${isOn ? styles.on : ''} ${disabled ? styles.disabled : ''}`} 
            onClick={handleToggle}
            disabled={disabled}
            aria-label={isOn ? "Toggle on" : "Toggle off"}
        >
            <div className={styles.switch}></div>
        </button>
    );
};

export default Toggle;