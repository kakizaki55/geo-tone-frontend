import { useState } from 'react';
import { motion } from 'framer-motion';
import { globalParams } from '@utils/tone-constants.js';
import styles from './Dial.css';

const Dial = (props) => {
  const { type, handleChange } = props;
  const { fx } = globalParams;

  const [value, setValue] = useState(fx.default);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    handleChange(event);
  };

  // ? ...should this component be labeled here or in EffectsRack / parent component?

  return (
    <motion.div className={styles.dialBackground}>
      <motion.div
        className={styles.dialTuner}
        style={{ rotate: `${value * 180 - 90}deg` }}
      />
      <input
        id={`fx-${type}`}
        name={type}
        type="range"
        min={fx.min}
        max={fx.max}
        step={fx.step}
        value={value}
        onChange={handleOnChange}
        className={styles.range}
      />
    </motion.div>
  );
};

export default Dial;
