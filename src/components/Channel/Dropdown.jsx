import { instruments } from '../../utils/toneUtils';

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
