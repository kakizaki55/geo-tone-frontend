import { oscillators, instruments } from '../../utils/toneUtils';
import styles from './Channel.css';

export default function Dropdown({
  handleAddChannel,
  instrument,
  setInstrument,
  oscillator,
  setOscillator,
}) {
  if (!handleAddChannel) {
    return (
      <div className={styles.container}>
        <select
          className={styles.dropdown}
          defaultValue={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        >
          {instruments.map((synth) => (
            <option key={synth} value={synth}>
              {synth}
            </option>
          ))}
        </select>
        <select
          className={styles.dropdown}
          defaultValue={oscillator}
          onChange={(e) => setOscillator(e.target.value)}
        >
          {oscillators.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <select onChange={handleAddChannel}>
        {instruments.map((synth) => (
          <option key={synth} value={synth}>
            {synth}
          </option>
        ))}
      </select>
    );
  }
}
