import React, { useState } from 'react';
import styles from '../styles/clueBuilder.module.css';

const ClueBuilder = () => {
    const [word, setWord] = useState('');
    const [clue, setClue] = useState('');
    const [recommendedClues, setRecommendedClues] = useState<string[]>([]);

    const handleAddWord = () => {
        console.log("Word: ", word, "Clue: ", clue);
        // Add logic to handle the word addition
    };

    const handleRecommendClues = () => {
        // Dummy recommended clues for demonstration
        setRecommendedClues([
            "First recommended clue",
            "Second recommended clue",
            "Third recommended clue"
        ]);
    };

    return (
        <div className={styles.clueBuilderContainer}>
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter word"
                className={styles.inputField}
            />
            <input
                type="text"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                placeholder="Enter clue"
                className={styles.inputField}
            />
            <button onClick={handleAddWord} className={styles.addButton}>Add Word</button>
            <button onClick={handleRecommendClues} className={styles.recommendButton}>Recommend Clues</button>
            <div className={styles.recommendedCluesContainer}>
                {recommendedClues.map((recommendedClue, index) => (
                    <div key={index} className={styles.recommendedClue}>
                        {recommendedClue}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClueBuilder;
