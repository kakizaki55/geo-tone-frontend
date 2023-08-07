import React from 'react'
import styles from './DrumMachine.css'
import Pad from "./Pad"

const DrumSteps = (props) => {

  const {
    highHat,
    setHighHat,
    snare,
    setSnare,
    kick,
    setKick,
    handleDrumChange,
  } = props

  return (
    <div className={styles.drumStepsContainer}>
      <div>
        { highHat.map((midi, index) => {
          return <Pad
            key={`step-${index}`}
            note={midi}
            index={index}
            handleNoteChange={handleDrumChange}
            drums={highHat}
            setDrums={setHighHat}
          />
        })}
      </div>
      <div>
        { snare.map((midi, index) => {
          return <Pad
            key={`step-${index}`}
            note={midi}
            index={index}
            handleNoteChange={handleDrumChange}
            drums={snare}
            setDrums={setSnare}
          />
        })}
      </div>
      <div>
        { kick.map((midi, index) => {
          return <Pad
            key={`step-${index}`}
            note={midi}
            index={index}
            handleNoteChange={handleDrumChange}
            drums={kick}
            setDrums={setKick}
          />
        })}
      </div>
    </div>
  )
}

export default DrumSteps
