import styles from './Channel.css';

export default function Controls({
  channelId,
  volume,
  setVolume,
  fx,
  setFx,
  bitcrusher,
  setBitcrusher,
  delay,
  setDelay,
  setKeyArray,
}) {
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
          max="0.75"
          step="0.05"
          onChange={(e) => setFx({ ...fx, reverb: e.target.value })}
          value={fx.reverb}
        />
      </label>
      <label>
        Bit Crusher
        <input
          id={`channel-${channelId}-bitcrusher`}
          name={`channel-${channelId}-bitcrusher`}
          type="range"
          min="0.0"
          max="1"
          step="0.05"
          onChange={(e) => setBitcrusher(e.target.value)}
          value={bitcrusher}
        />
      </label>
      <label>
        Delay
        <input
          id={`channel-${channelId}-delay`}
          name={`channel-${channelId}-delay`}
          type="range"
          min="0.0"
          max="1"
          step="0.05"
          onChange={(e) => setDelay(e.target.value)}
          value={delay}
        />
      </label>
    </div>
  );
}
