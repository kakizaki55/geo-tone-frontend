import {
  sequencerInstrumentTypes,
  pianoInstrumentTypes,
} from '../../utils/toneUtils';
import styles from '../Project/Project.css';

export default function Dropdown({
  instrument,
  handleAddChannel,
  handleChangeType,
}) {
  switch (instrument) {
    case 'piano':
      return (
        <select
          onChange={handleChangeType}
          className={styles.dropDownPianoSelect}
        >
          {pianoInstrumentTypes.map((synth, index) => (
            <option key={synth} value={synth}>
              {pianoInstrumentTypes[index]}
            </option>
          ))}
        </select>
      );
    case 'sequencer':
      return (
        <select onChange={handleAddChannel} className={styles.addChannelSelect}>
          {sequencerInstrumentTypes.map((synth, index) => (
            <option key={synth} value={synth}>
              {sequencerInstrumentTypes[index]}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <select>
          <option>Instrument not provided.</option>
        </select>
      );
  }
}
