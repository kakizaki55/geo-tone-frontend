import styles from './Channel.css';

export default function Controls({ channelId, volume, setVolume, fx, setFx }) {
  // controls for each channel
  return (
    <div className={styles.controls}>
      <label>
        Volume
        <input
          id={`channel-${channelId}-volume`}
          name={`channel-${channelId}-volume`}
          type="range"
          min="-40"
          max="0"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </label>
      <label>
        Reverb
        <input
          id={`channel-${channelId}-reverb`}
          name={`channel-${channelId}-reverb`}
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={(e) => setFx({ ...fx, reverb: e.target.value })}
          value={fx.reverb}
        />
      </label>
    </div>
  );
}
