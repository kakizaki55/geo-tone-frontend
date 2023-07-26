import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const KnobContainer = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 50%;
  cursor: grab;
  user-select: none;
`;

const Knob = () => {
  const handleDrag = (event, info) => {
    // Calculate the angle based on the drag position
    const centerX = 50; // Center of the knob container
    const centerY = 50; // Center of the knob container
    const deltaX = info.point.x - centerX;
    const deltaY = info.point.y - centerY;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

    // Clamp the angle between 0 and 360 degrees
    let clampedAngle = angle < 0 ? angle + 360 : angle;
    clampedAngle = clampedAngle > 360 ? clampedAngle - 360 : clampedAngle;

    // Update the knob value
    // Here, you can pass the angle value to a parent component or perform other actions
    // For simplicity, we'll just log it to the console.
    console.log(clampedAngle);
  };

  return (
    <KnobContainer
      drag
      dragElastic={0.1}
      dragMomentum={false}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDrag={handleDrag}
      whileTap={{ cursor: 'grabbing' }}
      whileHover={{ scale: 1.1 }}
    />
  );
};

export default Knob;