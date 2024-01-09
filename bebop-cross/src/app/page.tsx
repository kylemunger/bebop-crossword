'use client';
import React, { useState } from 'react'
import Crossword from '../components/crossword'
import DictionaryManager from '../components/dictManager'
import Spinner from '../components/spinner'
import SuggestionsBox from '../components/suggestionsBox'
import styles from '../styles/page.module.css'
import words from './words'

export default function Home() {
  var defaultPuzzleData = [['C', 'L', 'A', 'S', 'S', '#', 'A', 'C', 'T', '#', 'L'], ['L', '#', 'C', '#', 'N', '#', 'I', '#', 'I', 'C', 'E'], ['A', 'C', 'T', '#', 'O', '#', 'R', '#', 'N', '#', 'G'], ['S', '#', '#', 'D', 'R', 'Y', '#', 'T', '#', 'D', '#'], ['S', 'P', 'Y', '#', 'E', '#', 'G', 'R', 'A', 'I', 'N'], ['#', 'R', '#', 'I', '#', '#', '#', 'Y', '#', 'M', '#'], ['J', 'O', 'L', 'L', 'Y', '#', 'J', '#', 'L', 'E', 'G'], ['#', 'S', '#', 'L', '#', 'B', 'O', 'Y', '#', '#', 'I'], ['F', 'E', 'W', '#', 'S', '#', 'I', '#', 'W', 'A', 'R'], ['E', '#', 'A', '#', 'P', '#', 'N', '#', 'A', '#', 'L'], ['W', 'O', 'R', 'R', 'Y', '#', '#', 'T', 'R', 'Y', '#']];

  const [crosswordData, setCrosswordData] = useState(defaultPuzzleData);
  const [wordList, setWordList] = useState(words);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const regeneratePuzzle = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        body: JSON.stringify({ words: wordList }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = JSON.parse(await response.json());
        console.log(typeof data);
        console.log(data);
        if (data.length !== 0) {
          setCrosswordData(data);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const genwords = async () => {
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateDescriptions = () => {
    // Logic to generate suggestions (for demonstration, using placeholder data)
    const newSuggestions = [
      "Definition 1",
      "Definition 2",
      "Definition 3",
      "Definition 4",
      "Definition 5"
    ];

    // set new suggestions
    setSuggestions(newSuggestions);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Bebop Crossword</h1>
      </div>
      <div className={styles.bigContentContainer}>
        <div className={styles.dictionaryManagerContainer}>
          <DictionaryManager wordList={wordList} setWordList={setWordList} regeneratePuzzle={regeneratePuzzle} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.crosswordContainer}>
            {loading ? (<Spinner />) : (<Crossword puzzle={crosswordData} />)}
          </div>
        </div>
      </div>
    </div>
  )
};
