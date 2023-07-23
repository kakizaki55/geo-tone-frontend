import { instruments } from '../../utils/toneUtils';
import styles from '../Project/Project.css';

const listDisplay = ['pick your tone', 'Duo', 'Mono', 'Membrane'];

export default function Dropdown({ handleAddChannel }) {
  return (
    <select onChange={handleAddChannel} className={styles.addChannelSelect}>
      {instruments.map((synth, index) => (
        <option key={synth} value={synth}>
          {listDisplay[index]}
        </option>
      ))}
    </select>
  );
}
