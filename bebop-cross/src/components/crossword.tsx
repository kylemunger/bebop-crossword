import React from 'react';
import styles from '../styles/crossword.module.css';

interface CrosswordProps {
  puzzle: string[][];
}

const Crossword: React.FC<CrosswordProps> = ({ puzzle }) => {
  const gridSize = puzzle.length; // Assuming a square grid
  let wordNumber = 1;

  const isStartOfWord = (row, col) => {
    const cell = puzzle[row][col];
    // A cell that is a black square is not the start of a word
    if (cell === '#') return false;

    const cellAbove = row > 0 ? puzzle[row - 1][col] : '#';
    const cellLeft = col > 0 ? puzzle[row][col - 1] : '#';
    const cellRight = col < puzzle[row].length - 1 ? puzzle[row][col + 1] : '#';
    const cellBelow = row < puzzle.length - 1 ? puzzle[row + 1][col] : '#';

    // A cell is the start of a word if:
    // It's on the top edge and there's a word below
    // It's on the left edge and there's a word to the right
    // The cell above is a black square and there's a word below
    // The cell to the left is a black square and there's a word to the right
    return (
      (cellAbove === '#' && cellBelow !== '#') ||
      (cellLeft === '#' && cellRight !== '#') ||
      (row === 0 && cellBelow !== '#') ||
      (col === 0 && cellRight !== '#')
    );
  };


  return (
    <div className={styles.crosswordGrid} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWordStart = isStartOfWord(rowIndex, colIndex);
          const displayNumber = isWordStart ? wordNumber++ : '';

          return (
            <div key={`${rowIndex}-${colIndex}`} className={styles.crosswordCell}>
              <div className={`${styles.cellContent} ${cell === '#' ? styles.blackSquare : ''}`}>
                {isWordStart && <span className={styles.cellNumber}>{displayNumber}</span>}
                {cell !== '#' ? cell : ''}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Crossword;
