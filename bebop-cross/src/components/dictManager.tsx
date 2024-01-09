import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import styles from '../styles/dictManager.module.css';
import ClueBuilder from './clueBuilder';

interface WordItem {
  word: string;
  clue: string;
}

interface DictionaryManagerProps {
  wordList: WordItem[];
  setWordList: React.Dispatch<React.SetStateAction<WordItem[]>>;
  regeneratePuzzle: () => void;
}

const DictionaryManager: React.FC<DictionaryManagerProps> = ({ wordList, setWordList, regeneratePuzzle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState<WordItem[]>(wordList);

  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(wordList, { keys: ["word"], includeScore: true });
      const result = fuse.search(searchTerm.toLowerCase());
      setFilteredWords(result.map(item => item.item));
    } else {
      setFilteredWords(wordList);
    }
  }, [searchTerm, wordList]);


  const addWord = (newClue: string, newWord: string) => {
    const newWordItem = { word: newWord, clue: newClue };
    if (newWord && !wordList.some(item => item.word === newWord)) {
      setWordList([...wordList, newWordItem]);
    }
  };

  const renderWord = (word: any) => {
    const searchChars = searchTerm.toLowerCase().split('');
    const wordChars = word.toLowerCase().split('');

    return wordChars.map((char: any, index: any) => (
      <span key={index} className={searchChars.includes(char) ? styles.highlightedChar : ''}>{char}</span>
    ));

  };

  const deleteWord = (word: string) => {
    setWordList(wordList.filter(item => item.word !== word));
  };

  return (
    <div className={styles.container}>
      <button className={styles.regenerateButton} onClick={regeneratePuzzle}>Regenerate Puzzle</button>
      <ClueBuilder add_clue_to_dict={ addWord }/>
      <div className={styles.searchContainer}>
        <input
          className={styles.inputField}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a word"
        />
      </div>
      <ul className={styles.wordList}>
        {filteredWords.map(item => (
          <li key={item.word} className={styles.wordContainer}>
            <div className={styles.wordTitleContainer}>
              {renderWord(item.word)}
            </div>
            <div className={styles.descriptionAndDeleteContainer}>
              <p className={styles.wordDescription}>
                {item.clue}
              </p>
              <button className={styles.deleteButton} onClick={() => deleteWord(item.word)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DictionaryManager;
