import React from 'react';
import { motion } from 'framer-motion';

const DrumDial = (props) => {
  const { value, setValue } = props
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <motion.div
      style={{
        // width: '100px',
        height: '100%',
        position: 'relative',
      }}
    >
      <input
        type="range"
        min="-48"
        max="1"
        value={value}
        onChange={handleOnChange}
        />
    </motion.div>
  );
};

export default DrumDial;

