import { globalParams } from '@utils/tone-constants.js';
import styles from './BPMCounter.css';

const BPMCounter = (props) => {
  const { project, handleSongBPM } = props;
  const { bpm } = globalParams;

  return (
    <label className={styles.label}>
      BPM
      <input
        id="global-bpm"
        type="number"
        min={bpm.min}
        max={bpm.max}
        step={bpm.step}
        value={project.bpm}
        onChange={handleSongBPM}
        className={styles.bpmCounter}
      />
    </label>
  );
};

export default BPMCounter;
