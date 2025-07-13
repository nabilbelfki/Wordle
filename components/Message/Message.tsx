import React, { useEffect } from "react";
import styles from "./Message.module.css";

interface MessageProps {
    show?: boolean;       // Control visibility (default: false)
    text: string;        // Message content
    duration?: number;   // Auto-hide after milliseconds (undefined = infinite)
    onHide?: () => void; // Callback when auto-hide completes
}

const Message: React.FC<MessageProps> = ({ 
    show = false, 
    text, 
    duration, 
    onHide 
}) => {
    useEffect(() => {
        if (!show || !duration) return;

        const timer = setTimeout(() => {
            onHide?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [show, duration, onHide]);

    if (!show) return null;

    return (
        <div className={styles.message}>
            {text}
        </div>
    );
};

export default Message;