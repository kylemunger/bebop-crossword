import React from 'react';
import styles from '../styles/crossword.module.css';
import Clues from './clues';

interface CrosswordProps {
  puzzle: string[][];
  cluesDict: { word: string; clue: string }[];
}

const Crossword: React.FC<CrosswordProps> = ({ puzzle, cluesDict }) => {
  const gridSize = puzzle.length; // Assuming a square grid
  let wordNumber = 1;

  const extractWordsAndClues = (puzzle:string[][], cluesDict:{ word: string; clue: string }[]) => {
    const acrossWords = [];
    const downWords = [];
    let number = 1;

    for (let row = 0; row < puzzle.length; row++) {
      for (let col = 0; col < puzzle[row].length; col++) {
        if (isStartOfWord(row, col)) {
          let word = ''; // Declare word outside the if blocks

          // Check for horizontal words (across)
          if (col === 0 || puzzle[row][col - 1] === '#') {
            word = extractWord(puzzle, row, col, 'across').toLowerCase(); // Modify word
            if (word) {
              const clueItem = cluesDict.find(item => item.word.toLowerCase() === word);
              const clue = clueItem ? clueItem.clue : 'Clue not found';
              acrossWords.push({ number, word, clue, row, col });
            }
          }

          // Check for vertical words (down)
          if (row === 0 || puzzle[row - 1][col] === '#') {
            word = extractWord(puzzle, row, col, 'down').toLowerCase(); // Modify word
            if (word) {
              const clueItem = cluesDict.find(item => item.word.toLowerCase() === word);
              const clue = clueItem ? clueItem.clue : 'Clue not found';
              downWords.push({ number, word, clue, row, col });
            }
          }

          // Only increment the number if we have found a word
          if (word) number++;
        }
      }
    }

    return { acrossWords, downWords };
  };

  const extractWord = (puzzle: string | any[], startRow: number, startCol: number, direction: string) => {
    let word = '';
    let row = startRow;
    let col = startCol;
    let hasNext = true;

    while (hasNext) {
      word += puzzle[row][col];
      if (direction === 'across') {
        hasNext = col + 1 < puzzle[row].length && puzzle[row][col + 1] !== '#';
        col++;
      } else {
        hasNext = row + 1 < puzzle.length && puzzle[row + 1][col] !== '#';
        row++;
      }
    }

    // Return the word if it has more than one character, otherwise return an empty string
    return word.length > 1 ? word : '';
  };


  const isStartOfWord = (row: number, col: number) => {
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

  const { acrossWords, downWords } = extractWordsAndClues(puzzle, cluesDict);

  return (
    <div>
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
      <Clues acrossClues={acrossWords} downClues={downWords} />
    </div>
  );
}

export default Crossword;
