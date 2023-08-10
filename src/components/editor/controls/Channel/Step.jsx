import { setPitchColor } from '@utils/tone-utils';
import { useState } from 'react';
import classNames from 'classnames';
import { motion, useCycle } from 'framer-motion';
import { shapeVariants as shapes } from '@utils/framer-utils';
import styles from './Channel.css';

export default function Step({ note, index, handleNoteChange }) {
  const [currentShape, cycleCurrentShape] = useCycle(
    'circle',
    'square',
    'rhombus',
    'triangle',
    'pentagon',
    'hexagon'
  );

  return (
    <motion.button
      id={`step-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => {
        cycleCurrentShape();
        handleNoteChange(e);
      }}
      animate={currentShape}
      variants={shapes}
    >
      {note}
    </motion.button>
  );
}
