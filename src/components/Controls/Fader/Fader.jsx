import styles from './Fader.css';

const Fader = (props) => {
  const { id, name, min, max, value, handleChange } = props;

  return (
    <label className={styles.fader}>
      {name}
      <input
        id={`${id}-${name}`}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default Fader;
