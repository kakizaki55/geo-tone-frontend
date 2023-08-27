import { Step } from '../index.js';
import styles from './SequencerRow.css';

const SequencerRow = ({ notes, handleChange }) => {
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

export default SequencerRow;
