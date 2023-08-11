import { motion } from 'framer-motion';
import styles from './Joystick.css';

export default function Joystick({ setEffectX, setEffectY }) {
  const handleXYControls = (e, info) => {
    let x = Number(info.offset.x) / 100;
    let y = Number(info.offset.y) / 100;
    if (x > 1) {
      x = 1;
    }
    if (y > 1) {
      y = 1;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    setEffectX(x);
    setEffectY(y);
  };

  return (
    <div className={styles.dragContainer}>
      <div className={styles.dragControls}>
        <motion.input
          className={styles.dragKnob}
          onDrag={(e, info) => handleXYControls(e, info)}
          whileHover={{ scale: 1.5 }}
          drag
          dragConstraints={{
            top: -0,
            left: -0,
            right: 0,
            bottom: 0,
          }}
          dragMomentum={false}
          type="range"
          min="0"
          max="1"
          step="0.05"
        />
      </div>
    </div>
  );
}
