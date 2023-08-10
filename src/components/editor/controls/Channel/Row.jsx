import styles from './Channel.css';
import Step from './Step';
import Sequencer from '@components/Sequencer/Sequencer.jsx';

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
