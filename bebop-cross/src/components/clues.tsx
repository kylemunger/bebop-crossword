// Clues.tsx
import React from 'react';
import styles from '../styles/clues.module.css';

// Define the structure of a clue item
interface ClueItem {
  number: number;
  word: string;
  clue: string;
  row: number;
  col: number;
}

interface CluesProps {
  acrossClues: ClueItem[];
  downClues: ClueItem[];
}

const Clues: React.FC<CluesProps> = ({ acrossClues, downClues }) => {
  return (
    <div className={styles.cluesContainer}>
      <div className={styles.cluesColumn}>
        <h3>Across</h3>
        {acrossClues.map(({ number, clue }) => (
          <div key={`across-${number}`} className={styles.clue}>
            <strong>{number}.</strong> {clue}
          </div>
        ))}
      </div>
      <div className={styles.cluesColumn}>
        <h3>Down</h3>
        {downClues.map(({ number, clue }) => (
          <div key={`down-${number}`} className={styles.clue}>
            <strong>{number}.</strong> {clue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clues;

