import React from 'react';
import { BeatLoader } from 'react-spinners';
import styles from '../styles/spinner.module.css';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <BeatLoader color={'#FFFFFF'} />
    </div>
  );
}

export default Spinner;


