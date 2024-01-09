import React from 'react';
import styles from '../styles/suggestionsBox.module.css';

const SuggestionsBox = ({ suggestions }) => {
    return (
        <div className={styles.suggestionsBox}>
            <ul className={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                    <li key={index} className={styles.suggestionItem}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SuggestionsBox;
