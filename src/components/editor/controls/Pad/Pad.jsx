import { motion } from 'framer-motion';
import { handleDrumChange } from '@utils/interface-utils.js';
import styles from './Pad.css';

const Pad = (props) => {
  const { note, index, drums, setDrums } = props;

  return (
    <motion.button
      id={`step-${index}`}
      className={note ? styles.drumPadOn : styles.drumPadOff}
      onClick={(e) => {
        handleDrumChange(e, drums, setDrums);
      }}
    />
  );
};

export default Pad;
