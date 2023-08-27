import styles from './PianoKey.css';

const PianoKey = ({ note, setNotes }) => {
  return (
    <button
      key={`piano-${note}`}
      onMouseDown={() => setNotes([{ name: note }])}
      onMouseUp={() => setNotes(null)}
      value={note}
      className={
        note.length === 2 ? styles.pianoKeyWhite : styles.pianoKeyBlack
      }
    >
      {note}
    </button>
  );
};

export default PianoKey;
