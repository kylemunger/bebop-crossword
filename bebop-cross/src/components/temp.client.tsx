import React, { useState } from 'react';
import styles from '../styles/temp.module.css';

const Grid = () => {
  // Create an array of 100 elements for the 10x10 grid
  const squares = new Array(100).fill(null);

  return (
    <div className={styles.grid}>
      {squares.map((_, index) => (
        <div key={index} className={styles.square}></div>
      ))}
    </div>
  );
};

const GridInteractive = () => {
  const [values, setValues] = useState(Array(100).fill('')); // State to store the values

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value.slice(0, 1); // Store only the first character
    setValues(newValues);
  };

  return (
    <div className={styles.gridInteractive}>
      {values.map((value, index) => (
        <input
          key={index}
          className={styles.squareInteractive}
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Bebop Crossword</h1>
    </div>
  );
};

export { Grid, GridInteractive, Header };
