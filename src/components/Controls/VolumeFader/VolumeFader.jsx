import styles from './VolumeFader.css';

export default function VolumeFader({ isGlobal = false, volume, setVolume }) {
  return (
    <label className={styles.label}>
      {isGlobal ? 'Project Volume' : 'Volume'}
      <input
        type="range"
        min="-48"
        max="0"
        step="1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </label>
  );
}
