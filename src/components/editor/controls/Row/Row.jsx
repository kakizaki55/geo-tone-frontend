import { Step } from '../index.js';
import styles from './Row.css';

const Row = ({ notes, handleChange }) => {
  return (
    <div className={styles.row}>
      {notes.map((note, index) => (
        <Step
          key={`step-${index}`}
          note={note}
          index={index}
          handleClick={handleChange}
        />
      ))}
    </div>
  );
};

export default Row;
