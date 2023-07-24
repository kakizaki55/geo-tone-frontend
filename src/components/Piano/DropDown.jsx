import { pianoInstrumentType, } from '../../utils/toneUtils';
import styles from './DropDown.css';

export default function Dropdown({ handleChangeType }) {
  return (
    <select onChange={ handleChangeType } className={styles.dropDownPianoSelect}>
      {pianoInstrumentType.map((synth, index) => (
        <option key={synth} value={synth}>
          {pianoInstrumentType[index]}
        </option>
      ))}
    </select>
  );
}