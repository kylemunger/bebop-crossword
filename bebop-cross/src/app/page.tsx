'use client';
import React, { useState } from 'react'
import Crossword from '../components/crossword'
import DictionaryManager from '../components/dictManager'
import Spinner from '../components/spinner'
import styles from '../styles/page.module.css'
import wordClues from './words'

interface WordItem {
  word: string;
  clue: string;
}

export default function Home() {
  var defaultPuzzleData = [['C', 'L', 'A', 'S', 'S', '#', 'A', 'C', 'T', '#', 'L'], ['L', '#', 'C', '#', 'N', '#', 'I', '#', 'I', 'C', 'E'], ['A', 'C', 'T', '#', 'O', '#', 'R', '#', 'N', '#', 'G'], ['S', '#', '#', 'D', 'R', 'Y', '#', 'T', '#', 'D', '#'], ['S', 'P', 'Y', '#', 'E', '#', 'G', 'R', 'A', 'I', 'N'], ['#', 'R', '#', 'I', '#', '#', '#', 'Y', '#', 'M', '#'], ['J', 'O', 'L', 'L', 'Y', '#', 'J', '#', 'L', 'E', 'G'], ['#', 'S', '#', 'L', '#', 'B', 'O', 'Y', '#', '#', 'I'], ['F', 'E', 'W', '#', 'S', '#', 'I', '#', 'W', 'A', 'R'], ['E', '#', 'A', '#', 'P', '#', 'N', '#', 'A', '#', 'L'], ['W', 'O', 'R', 'R', 'Y', '#', '#', 'T', 'R', 'Y', '#']];

  const [crosswordData, setCrosswordData] = useState(defaultPuzzleData);

  // initialize array of word objects with each word:str from words is given the clue "temp"
  const [wordList, setWordList] = useState(wordClues.reverse());
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const regeneratePuzzle = async () => {
    setLoading(true);
    try {

      const response = await fetch('api/generate', {
        method: 'POST',
        body: JSON.stringify({ words: wordList.map((w) => w.word) }),
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Bebop Crossword</h1>
      </div>
      <div className={styles.bigContentContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.crosswordContainer}>
            {loading ? (<Spinner />) : (<Crossword puzzle={crosswordData} cluesDict={wordList} />)}
          </div>
        </div>
        <div className={styles.dictionaryManagerContainer}>
          <DictionaryManager wordList={wordList} setWordList={setWordList} regeneratePuzzle={regeneratePuzzle} />
        </div>
      </div>
    </div>
  );
};
