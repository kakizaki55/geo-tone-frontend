import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const StyledInputRange = styled.input`
  /* Hide the default range input appearance */
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #f0f0f0;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  /* Custom thumb style */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;

const Dial = (props) => {
  const {type, fx, handleEffectsRackChange } = props
  const [value, setValue] = useState(50);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    handleEffectsRackChange(event)
  };

  return (
    <motion.div
      style={{
        width: '100px',
        height: '100px',
        position: 'relative',
      }}
    >
      <motion.div
        style={{
          width: '10px',
          height: '50px',
          background: 'pink',
          borderRadius: '5px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          originX: '50%',
          originY: '100%',
          rotate: `${(value / 100) * 180 - 90}deg`,
        }}
      />
      <StyledInputRange
        id={`piano-${type}`}
        name={`${type}`}
        type="range"
        min="0"
        max="100"
        position='absolute'
        value={fx[value]}
        onChange={handleOnChange}
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 1.0 }}
      />
    </motion.div>
  );
};

export default Dial;

