import { PianoKey } from '../index.js';
import styles from './KeyController.css';

const KeyController = ({ keys, setNotes }) => {
  return (
    <div className={styles.keyController}>
      {keys.pianoChromatic.map((note) => (
        <PianoKey
          key={`keycontroller-${note}`}
          note={note}
          setNotes={setNotes}
        />
      ))}
    </div>
  );
};

export default KeyController;
