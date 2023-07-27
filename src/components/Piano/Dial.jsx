import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const StyledInputRange = styled.input`
  /* Hide the default range input appearance */
  -webkit-appearance: none;
  width: 100%;
  height: 50%;
  background: #f0f0f0;
  outline: none;
  opacity: 0.10;
  transition: opacity 0.2s;
  border-radius: 100% 100% 0 0;


  /* Custom thumb style */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: hidden;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &:hover {
    opacity: .5;
  }
`;

const Dial = (props) => {
  const {type, handleEffectsRackChange } = props
  const [value, setValue] = useState(0);

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
        borderRadius: '50% 50% 0 0 ',
      }}
    >
      <motion.div
        style={{
          width: '10px',
          height: '50px',
          background: 'pink',
          borderRadius: '10px 10px 0 0 ',
          position: 'absolute',
          left: '50%',
          top: '0%',
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
        value={value}
        onChange={handleOnChange}
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 1.0 }}
        />
    </motion.div>
  );
};

export default Dial;

