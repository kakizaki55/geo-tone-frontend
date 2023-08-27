import { Pad } from '../index.js';
import styles from './DrumRow.css';

const DrumRow = ({ notes, togglePad }) => {
  return (
    <div className={styles.row}>
      {notes.map((midi, index) => {
        return (
          <Pad
            key={`step-${index}`}
            note={midi}
            index={index}
            handleToggle={togglePad}
          />
        );
      })}
    </div>
  );
};

export default DrumRow;
