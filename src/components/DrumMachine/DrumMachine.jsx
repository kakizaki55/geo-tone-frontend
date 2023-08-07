import React, { useEffect, useState } from 'react'
import styles from './DrumMachine.css'
import { Track, Instrument } from "reactronica"
import { useProject } from "../../context/ProjectContext"
import classNames from 'classnames';
import Pad from './Pad'
import DrumDial from './DrumDial'
import DrumSteps from "./DrumSteps"

const DrumMachine = (props) => {
  const { project } = props

  const { handleUpdateDrums } = useProject()
  const [highHat, setHighHat] = useState(project.drums.hh)
  const [snare, setSnare] = useState(project.drums.snare)
  const [kick, setKick] = useState(project.drums.kick)
  const [volume, setVolume] = useState(-48)

  useEffect(()=> {
    const drumObj ={
      hh: highHat,
      snare: snare,
      kick: kick
    }
    handleUpdateDrums(drumObj)
  },[highHat, snare, kick])

  const handleDrumChange = (e, drums, setDrums ) => {
    const indexOfStep = e.target.id.split('-')[1];
    const newDrumsArray = drums.map((hit, index) => {
      if(Number(indexOfStep) === index && hit === 'C3') {
        return null
      }
      if(Number(indexOfStep) === index && hit === null) {
        return 'C3'
      }
      return hit
    })
    setDrums(newDrumsArray)
  }

    const highlightCurrentStep = (stepIndex) => {
      const drums = document.querySelectorAll(`.${styles.drumPadOn}`);
      drums.forEach((stepDiv) => {
        const stepIndexId = Number(stepDiv.id.replace(/\D/g, ""))
      if (stepIndex === stepIndexId) {
        stepDiv.className = classNames(
          styles.drumPadOn,
          styles.active,
        );
      } else {
          stepDiv.className = classNames(
          styles.drumPadOn,
        );
      }
    });
  };

  return (
    <div
      className={styles.drumMachineContainer}>
        { Object.entries(project.drums).map((value) => {
          return (
            <>
              <Track
                  steps={value[1]}
                  key={value}
                  onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex)}
                  volume={volume}
                  >

                <Instrument
                  type="sampler"
                  samples={{ C3: `/assets/samples/${value[0]}.mp3` }} 
                  onLoad={(buffers) => {
                    // Runs when all samples are loaded
                  }}
                  />
              </Track>
            </>
        )})}
    {/* Render all visual components below*/}

    <div>
      Volume
      <DrumDial value={volume} setValue={setVolume}/>
    </div>
    <DrumSteps
      highHat={highHat}
      setHighHat={setHighHat}
      snare={snare}
      setSnare={setSnare}
      kick={kick}
      setKick={setKick}
      handleDrumChange={handleDrumChange}
    />
  </div>
  )
}

export default DrumMachine
