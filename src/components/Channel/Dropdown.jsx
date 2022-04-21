import { instruments } from '../../utils/toneUtils';
import styles from './Channel.css';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
} from '../../utils/toneUtils';

export default function Dropdown({ handleAddChannel }) {
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
