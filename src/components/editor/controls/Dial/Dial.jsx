import { useState } from 'react';
import { motion } from 'framer-motion';
import { globalParams } from '@utils/tone-constants.js';
import styles from './Dial.css';

const Dial = (props) => {
  const { type, handleEffectsRackChange } = props;
  const { fx } = globalParams;

  const [value, setValue] = useState(fx.default);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    handleEffectsRackChange(event);
  };

  return (
    <label className={styles.label}>
      {type}
      <motion.div className={styles.dialBackground}>
        <motion.div
          className={styles.dialTuner}
          style={{ rotate: `${value * 180 - 90}deg` }}
        />
        <input
          id={`fx-${type}`}
          type="range"
          min={fx.min}
          max={fx.max}
          step={fx.step}
          value={value}
          onChange={handleOnChange}
          className={styles.range}
        />
      </motion.div>
    </label>
  );
};

export default Dial;
