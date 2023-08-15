import styles from './KeyController.css';

const KeyController = ({ keys, setNotes }) => {
  return (
    <div>
      {keys.pianoChromatic.map((note) => (
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
      ))}
    </div>
  );
};

export default KeyController;
