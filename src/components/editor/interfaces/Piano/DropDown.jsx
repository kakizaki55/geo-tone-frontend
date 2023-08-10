import { pianoInstrumentType } from '@utils/tone-constants.js';
import styles from './Piano.css';

export default function Dropdown({ handleChangeType }) {
  return (
    <select onChange={handleChangeType} className={styles.dropDownPianoSelect}>
      {pianoInstrumentType.map((synth, index) => (
        <option key={synth} value={synth}>
          {pianoInstrumentType[index]}
        </option>
      ))}
    </select>
  );
}
