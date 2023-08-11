import { globalParams } from '@utils/tone-constants.js';
import styles from './VolumeFader.css';

const VolumeFader = (props) => {
  const { id, value, handleChange, isGlobal = false } = props;
  const { volume } = globalParams;

  return (
    <label className={styles.label}>
      {isGlobal ? 'Project Volume' : 'Volume'}
      <input
        id={`${id}-volume`}
        type="range"
        min={volume.min}
        max={volume.max}
        step={volume.step}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default VolumeFader;