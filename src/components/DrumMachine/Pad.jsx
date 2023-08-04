import React from 'react'
import { motion } from 'framer-motion'
import styles from './DrumMachine.css'

const Pad = (props) => {

  const { note, index, handleNoteChange, drums, setDrums } = props

  return (
    <motion.button
      id={`step-${index}`}
      className={ note ? styles.drumPadOn : styles.drumPadOff }
      onClick={(e) => {
        handleNoteChange(e, drums, setDrums);
      }}
    >
    </motion.button>
  )
}

export default Pad