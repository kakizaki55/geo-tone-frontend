import { motion } from 'framer-motion';
import styles from './Pad.css';

const Pad = (props) => {
  const { note, index, handleToggle } = props;

  return (
    <motion.button
      id={`step-${index}`}
      className={note ? styles.drumPadOn : styles.drumPadOff}
      onClick={handleToggle}
    />
  );
};

export default Pad;
