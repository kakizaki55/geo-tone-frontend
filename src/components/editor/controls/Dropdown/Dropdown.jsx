import { sequencerInstrumentsTypes } from '@utils/tone-constants';
import styles from './Dropdown.css';

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
