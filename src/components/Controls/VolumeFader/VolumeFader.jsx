import styles from './VolumeFader.css';

export default function VolumeFader({
  id,
  volume,
  setVolume,
  isGlobal = false,
}) {
  return (
    <label className={styles.label}>
      {isGlobal ? 'Project Volume' : 'Volume'}
      <input
        id={isGlobal ? 'global-volume' : id}
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
