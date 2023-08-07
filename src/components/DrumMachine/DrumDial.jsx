import React from 'react';
import { motion } from 'framer-motion';

const DrumDial = (props) => {
  const { value, setValue } = props
  console.log('props', props)


  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <motion.div
      style={{
        width: '100px',
        height: '100px',
        position: 'relative',
        borderRadius: '50% 50% 0 0 ',
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

