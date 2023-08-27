import { motion, useCycle } from 'framer-motion';
import { playVariants } from '@utils/framer-constants';
import styles from './PlayButton.css';

const PlayButton = ({ start, setStart }) => {
  const [active, cycleActive] = useCycle('play', 'stop');

  return (
    <motion.button
      className={styles.playButton}
      whileHover={{ scale: 1.1 }}
      onClick={() => {
        cycleActive();
        setStart(!start);
      }}
      animate={active}
      variants={playVariants}
    >
      {start ? 'stop' : 'play'}
    </motion.button>
  );
};

export default PlayButton;
