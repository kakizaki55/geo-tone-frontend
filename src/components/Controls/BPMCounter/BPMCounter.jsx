import styles from './BPMCounter.css';

export default function Counter({ project, handleSongBPM }) {
  return (
    <label className={styles.label}>
      BPM
      <input
        type="number"
        min="0"
        max="440"
        step="10"
        value={project.bpm}
        onChange={handleSongBPM}
        className={styles.bpmCounter}
      />
    </label>
  );
}
