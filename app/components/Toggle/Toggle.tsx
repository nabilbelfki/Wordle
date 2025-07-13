"use client"
import React from "react";
import styles from "./Toggle.module.css";

interface ToggleProps {
  isOn?: boolean;        // Made optional
  handleToggle?: () => void;  // Made optional
}

const Toggle: React.FC<ToggleProps> = ({ isOn = false, handleToggle = () => {} }) => {
  return (
    <button 
      className={`${styles.toggle} ${isOn ? styles.on : ''}`} 
      onClick={handleToggle}
      aria-label={isOn ? "Toggle on" : "Toggle off"}
    >
      <div className={styles.switch}></div>
    </button>
  );
};

export default Toggle;