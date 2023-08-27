import { shapeVariants } from '@utils/framer-constants.js';
import { motion, useCycle } from 'framer-motion';
import classNames from 'classnames';
import styles from './Step.css';

const Step = ({ note, index, handleClick }) => {
  const [currentShape, cycleCurrentShape] = useCycle(
    'circle',
    'triangle',
    'square',
    'rhombus',
    'pentagon',
    'hexagon',
    'octagon'
  );

  const setPitchColor = (string) => {
    return {
      [styles.C]: string?.includes('C'),
      [styles.D]: string?.includes('D'),
      [styles.E]: string?.includes('E'),
      [styles.G]: string?.includes('G'),
      [styles.A]: string?.includes('A'),
    };
  };

  return (
    <motion.button
      id={`step-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => {
        cycleCurrentShape();
        handleClick(e);
      }}
      animate={currentShape}
      variants={shapeVariants}
    >
      {note}
    </motion.button>
  );
};

export default Step;
