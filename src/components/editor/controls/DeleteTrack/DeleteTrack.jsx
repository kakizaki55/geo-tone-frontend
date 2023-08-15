import { motion } from 'framer-motion';
import styles from './DeleteTrack.css';

const DeleteTrack = (props) => {
  const { handleClick } = props;

  return (
    <motion.button onClick={handleClick} className={styles.deleteButton}>
      Delete Channel
    </motion.button>
  );
};

export default DeleteTrack;
