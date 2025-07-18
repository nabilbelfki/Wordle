"use client"
import Toggle from "../Toggle/Toggle";
import React, { useState } from "react";
import styles from "./Settings.module.css";
import { settings } from "../../../constants/constants";
import { useTheme } from "../../context/ThemeContext";

const Settings: React.FC = () => {
    const [isPopupShowing, setIsPopupShowing] = useState(false);
    const { 
        theme, 
        inputMode, 
        contrastMode,
        toggleTheme, 
        toggleInputMode,
        toggleContrastMode
    } = useTheme();

    return (
        <div className={styles.settings}>
            <svg 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                height="32" 
                viewBox="0 0 32 32" 
                width="32" 
                data-testid="icon-settings"
                onClick={() => setIsPopupShowing(!isPopupShowing)}
            >
                <path fill="var(--color-tone-1)" d="M26.8666 17.3372C26.918 16.9086 26.9523 16.4629 26.9523 16C26.9523 15.5371 26.918 15.0914 26.8494 14.6628L29.7466 12.3999C30.0038 12.1942 30.0724 11.8171 29.9181 11.5256L27.1752 6.77693C27.0037 6.46836 26.6437 6.3655 26.3351 6.46836L22.9236 7.83982C22.2036 7.29123 21.4493 6.84551 20.6093 6.50264L20.095 2.86827C20.0436 2.52541 19.7521 2.2854 19.4093 2.2854H13.9234C13.5806 2.2854 13.3063 2.52541 13.2548 2.86827L12.7405 6.50264C11.9005 6.84551 11.1291 7.30838 10.4262 7.83982L7.01469 6.46836C6.70611 6.34835 6.3461 6.46836 6.17467 6.77693L3.43175 11.5256C3.26031 11.8342 3.32889 12.1942 3.60318 12.3999L6.50039 14.6628C6.43182 15.0914 6.38039 15.5543 6.38039 16C6.38039 16.4457 6.41467 16.9086 6.48325 17.3372L3.58603 19.6001C3.32889 19.8058 3.26031 20.183 3.4146 20.4744L6.15752 25.2231C6.32896 25.5317 6.68896 25.6345 6.99754 25.5317L10.4091 24.1602C11.1291 24.7088 11.8834 25.1545 12.7234 25.4974L13.2377 29.1317C13.3063 29.4746 13.5806 29.7146 13.9234 29.7146H19.4093C19.7521 29.7146 20.0436 29.4746 20.0779 29.1317L20.5921 25.4974C21.4322 25.1545 22.2036 24.6916 22.9065 24.1602L26.318 25.5317C26.6266 25.6517 26.9866 25.5317 27.158 25.2231L29.9009 20.4744C30.0724 20.1658 30.0038 19.8058 29.7295 19.6001L26.8666 17.3372V17.3372ZM16.6663 21.143C13.8377 21.143 11.5234 18.8286 11.5234 16C11.5234 13.1714 13.8377 10.857 16.6663 10.857C19.495 10.857 21.8093 13.1714 21.8093 16C21.8093 18.8286 19.495 21.143 16.6663 21.143Z"></path>
            </svg>
            {isPopupShowing && (
                <div className={styles.background} onClick={() => setIsPopupShowing(false)}>
                    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.title}>SETTINGS</div>
                        <div className={styles.close} onClick={() => setIsPopupShowing(false)}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" data-testid="icon-close"><path fill="var(--color-tone-1)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                        </div>
                        {settings.map((setting, index) => (
                            <div key={index} className={styles.setting}>
                                <div className={styles['title-and-subtitle']}>
                                    <div className={styles['setting-title']}>{setting.title}</div>
                                    {setting.subtitle && (
                                        <div className={styles['setting-subtitle']}>{setting.subtitle}</div>
                                    )}
                                </div>
                                {setting.id === 'dark-theme' ? (
                                    <Toggle 
                                        isOn={theme === 'dark'} 
                                        handleToggle={toggleTheme} 
                                    />
                                ) : setting.id === 'input-mode' ? (
                                    <Toggle 
                                        isOn={inputMode === 'onscreen-only'} 
                                        handleToggle={toggleInputMode} 
                                    />
                                ) : setting.id === 'high-contrast-mode' ? (
                                    <Toggle 
                                        isOn={contrastMode === 'high-contrast'} 
                                        handleToggle={toggleContrastMode} 
                                    />
                                ) : (
                                    <Toggle 
                                        isOn={false} 
                                        handleToggle={() => {}} 
                                        disabled
                                    />
                                )}
                            </div>
                        ))}
                        <div className={styles.copyright}><span>© 2025 Nabil Belfki LLC</span><span>#1337</span></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;