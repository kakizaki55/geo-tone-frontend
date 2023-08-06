import styles from './EffectFader.css';

export default function EffectFader(props) {
  const {
    id,
    effect,
    min = 0.0,
    max = 1.0,
    step = 0.1,
    value,
    handleChange,
  } = props;

  return (
    <label className={styles.fader}>
      {effect}
      <input
        id={`${id}-${effect}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}

// export default EffectFader;
