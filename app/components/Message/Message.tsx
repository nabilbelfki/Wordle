import React, { useEffect, useState } from "react";
import styles from "./Message.module.css";

interface MessageProps {
    text: string;
    show?: boolean;
    permanent?: boolean;  // Add this prop
}

const Message: React.FC<MessageProps> = ({ text, show = false, permanent = false }) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        if (permanent) {
            setIsVisible(show);
        } else {
            setIsVisible(show);
            if (show) {
                const timer = setTimeout(() => setIsVisible(false), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [show, permanent]);

    if (!isVisible) return null;

    return <div className={styles.message}>{text}</div>;
};

export default Message;