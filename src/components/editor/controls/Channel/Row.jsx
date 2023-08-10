import styles from './Channel.css';
import Step from './Step';

export default function Row({ notes, handleNoteChange }) {
  return (
    <div className={styles.row}>
      {notes.map((note, index) => (
        <Step
          key={`step-${index}`}
          note={note}
          index={index}
          handleNoteChange={handleNoteChange}
        />
      ))}
    </div>
  );
}
