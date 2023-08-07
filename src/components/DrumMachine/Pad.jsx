import React from 'react'
import { motion } from 'framer-motion'
import styles from './DrumMachine.css'

const Pad = (props) => {

  const { note, index, handleDrumChange, drums, setDrums } = props

  return (
    <motion.button
      id={`step-${index}`}
      className={ note ? styles.drumPadOn : styles.drumPadOff }
      onClick={(e) => {
        handleDrumChange(e, drums, setDrums);
      }}
    >
    </motion.button>
  )
}

export default Pad