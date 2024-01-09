import React from 'react';
import styles from '../styles/crossword.module.css';

interface CrosswordProps {
  puzzle: string[][];
}

const Crossword: React.FC<CrosswordProps> = ({ puzzle }) => {
  const gridSize = puzzle.length; // Assuming a square grid

  return (
    <div className={styles.crosswordGrid} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className={styles.crosswordCell}>
            <div className={`${styles.cellContent} ${cell === '#' ? styles.blackSquare : ''}`}>
              {cell !== '#' ? cell : ''}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Crossword;
