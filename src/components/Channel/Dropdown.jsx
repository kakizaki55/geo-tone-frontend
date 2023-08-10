import { sequencerInstrumentsTypes } from '../../utils/tone-utils';
import styles from '../Project/Project.css';

export default function Dropdown({ handleAddChannel }) {
  return (
    <select onChange={handleAddChannel} className={styles.addChannelSelect}>
      {sequencerInstrumentsTypes.map((synth, index) => (
        <option key={synth} value={synth}>
          {sequencerInstrumentsTypes[index]}
        </option>
      ))}
    </select>
  );
}
