import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import styles from '../styles/dictManager.module.css';
import ClueBuilder from './clueBuilder';

interface DictionaryManagerProps {
  wordList: string[];
  setWordList: React.Dispatch<React.SetStateAction<string[]>>;
  regeneratePuzzle: () => void;
}

const DictionaryManager: React.FC<DictionaryManagerProps> = ({ wordList, setWordList, regeneratePuzzle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState(wordList.map(item => item.toLowerCase()));

  // const [newWord, setNewWord] = useState('');
  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(wordList, { includeScore: true });
      const result = fuse.search(searchTerm);
      setFilteredWords(result.map(item => item.item));
    } else {
      setFilteredWords(wordList);
    }
  }, [searchTerm, wordList]);

  const addWord = () => {
    if (searchTerm && !wordList.includes(searchTerm)) {
      setWordList([...wordList, searchTerm]);
      setSearchTerm('');
    }
  };

  const renderWord = (word:any) => {
    const searchChars = searchTerm.split('');
    const wordChars = word.split('');

    return wordChars.map((char:any, index:any) => (
      <span key={index} className={searchChars.includes(char) ? styles.highlightedChar : ''}>{char}</span>
    ));

  };

  const deleteWord = (word: string) => {
    setWordList(wordList.filter(w => w !== word));
  };

  return (
    <div className={styles.container}>
      <button className={styles.regenerateButton} onClick={regeneratePuzzle}>Regenerate Puzzle</button>
      <ClueBuilder />
      <div className={styles.searchContainer}>
        <input
          className={styles.inputField}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a word"
        />
      </div>
      <ul className={styles.wordList}>
        {filteredWords.map(word => (
          <li key={word} className={styles.wordContainer}>
            <div className={styles.wordTitleContainer}>
              {renderWord(word)}
            </div>
            <div className={styles.descriptionAndDeleteContainer}>
              <p className={styles.wordDescription}>
                Placeholder clue for {word} - clue generation coming soon :) {/* Replace this with actual description */}
              </p>
              <button className={styles.deleteButton} onClick={() => deleteWord(word)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DictionaryManager;
