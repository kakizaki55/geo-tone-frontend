import { Pad } from '../index.js';
import styles from './DrumRow.css';

const DrumRow = ({ notes, setNotes }) => {
  return (
    <div className={styles.row}>
      {notes.map((midi, index) => {
        return (
          <Pad
            key={`step-${index}`}
            note={midi}
            index={index}
            drums={notes}
            setDrums={setNotes}
          />
        );
      })}
    </div>
  );
};

export default DrumRow;
