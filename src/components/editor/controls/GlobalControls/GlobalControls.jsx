import { motion, useCycle } from 'framer-motion';
import { useProject } from '../../../../context/ProjectContext';
import { playVariants as play } from '../../../../utils/framer-utils';
import styles from './GlobalControls.css';

export default function GlobalControls({ start, setStart, volume, setVolume }) {
  const {
    project: { project },
    handleSongBPM,
  } = useProject();

  const [active, cycleActive] = useCycle('play', 'stop');

  return (
    <div id="global-controls" className={styles.container}>
      <motion.button
        className={styles.playButton}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          cycleActive();
          setStart(!start);
        }}
        animate={active}
        variants={play}
      >
        {start ? 'stop' : 'play'}
      </motion.button>
      <label className={styles.label}>
        Project Volume
        <input
          type="range"
          min="-48"
          max="0"
          step="1"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label>

      <label className={styles.label}>
        BPM
        <input
          type="number"
          min="0"
          max="440"
          step="10"
          value={project.bpm}
          onChange={handleSongBPM}
          className={styles.bpmCounter}
        />
      </label>
    </div>
  );
}
