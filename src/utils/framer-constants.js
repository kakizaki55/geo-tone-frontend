// framer-motion constants

const shapeVariants = {
  circle: {
    scale: 1.0,
    rotate: 90,
    clipPath: 'circle(40%)',
  },
  triangle: {
    scale: 0.8,
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  },
  square: {
    scale: 1.0,
    rotate: 90,
    clipPath: 'polygon(12% 12%,88% 12%,88% 88%,12% 88%)',
  },
  rhombus: {
    scale: 1.0,
    rotate: 90,
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  pentagon: {
    scale: 0.8,
    rotate: 180,
    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  },
  hexagon: {
    scale: 0.8,
    rotate: 90,
    clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
  },
};

const playVariants = {
  stop: {
    backgroundColor: 'var(--pink)',
    color: 'var(--black-ish)',
    clipPath: 'polygon(12% 12%,88% 12%,88% 88%,12% 88%)',
  },
  play: {
    backgroundColor: 'var(--aqua)',
    textAlign: 'left',
    color: 'var(--white-ish)',
    clipPath: 'polygon(0% 0%,0% 100%,100% 50%)',
  },
};

export { shapeVariants, playVariants };
