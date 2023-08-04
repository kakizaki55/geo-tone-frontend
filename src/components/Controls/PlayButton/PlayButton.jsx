import { motion } from 'framer-motion';
import styles from './PlayButton.css';

export default function PlayButton({
  start,
  setStart,
  active,
  cycleActive,
  play,
}) {
  return (
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
  );
}
