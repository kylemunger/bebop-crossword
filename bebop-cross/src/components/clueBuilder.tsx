import React, { useState } from 'react';
import styles from '../styles/clueBuilder.module.css';
import Spinner from './spinner';

interface ClueBuilderProps {
    add_clue_to_dict: (clue: string, word: string) => void;
}

const ClueBuilder: React.FC<ClueBuilderProps> = ({ add_clue_to_dict }) => {
    const [loading, setLoading] = useState(false);
    const [word, setWord] = useState('');
    const [clue, setClue] = useState('');
    const [recommendedClues, setRecommendedClues] = useState<string[]>([]);
    const [recommendedCluesAndWords, setRecommendedCluesAndWords] = useState<{ clue: string; word: string }[]>([]);

    const handleAddWord = (added_clue: string, added_word: string) => {
        console.log("Word: ", added_word, "Clue: ", added_clue);
        handleClear();
        add_clue_to_dict(added_clue, added_word);
    };

    const handleRecommendClues = async () => {
        setLoading(true);
        try {
            const response = await fetch('api/suggest_clues_for_word', {
                method: 'POST',
                body: JSON.stringify({ word }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = JSON.parse(await response.json());
                console.log(typeof data);
                console.log(data);
                setRecommendedCluesAndWords([]); // Clear recommended clues
                setRecommendedClues(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecommendCluesAndWords = async () => {
        setLoading(true);
        try {
            const response = await fetch('api/suggest_clues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = JSON.parse(await response.json());
                console.log(typeof data);
                console.log(data);
                setRecommendedClues([]);
                setRecommendedCluesAndWords(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setWord(''); // Clear word
        setClue(''); // Clear clue
        setRecommendedClues([]); // Clear recommended clues
        setRecommendedCluesAndWords([]); // Clear recommended clues
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
            <div className={styles.buttonsContainer}>
                <button onClick={() => handleAddWord(clue, word)} className={styles.addButton}>Add Word</button>
                <button onClick={handleRecommendClues} className={styles.recommendButton}>Recommend Clues</button>
                <button onClick={handleRecommendCluesAndWords} className={styles.button}>Recommend Clues and Words</button>
                <button onClick={handleClear} className={styles.button}>Clear</button>
                {loading ? (<Spinner />) : (<div />)}
            </div>
            <div className={styles.recommendedCluesContainer}>
                {recommendedClues.map((clue, index) => (
                    <div key={index} className={styles.recommendedItem}>
                        <span>{clue}</span>
                        <button
                            onClick={() => handleAddWord(clue, word)}
                            className={styles.addButton}
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.recommendedCluesAndWordsContainer}>
                {recommendedCluesAndWords.map(({ clue, word }, index) => (
                    <div key={index} className={styles.recommendedItem}>
                        <span>Clue: {clue}, Word: {word}</span>
                        <button
                            onClick={() => handleAddWord(clue, word)}
                            className={styles.addButton}
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClueBuilder;
