import React, { useEffect, useState } from 'react'
import styles from './DrumMachine.css'
import { Track, Instrument } from "reactronica"
import { useProject } from "../../context/ProjectContext"
import classNames from 'classnames';
import DrumDial from './DrumDial'
import DrumSteps from "./DrumSteps"
import {mockDrums} from './mock'

const DrumMachine = (props) => {

  const { project } = props

  const { handleUpdateDrums } = useProject()

  const [highHat, setHighHat] = useState(project.drums[0].steps)
  const [snare, setSnare] = useState(project.drums[1].steps)
  const [kick, setKick] = useState(project.drums[2].steps)
  const [volume, setVolume] = useState(-48)

  console.log('highHat', highHat)

  //this use Effect makes a new drum object and send its back up in the Project Context
  useEffect(()=> {
    const drumObj =[
      {
        type: 'hh',
        steps: highHat,
        volume: 1
      },
      {
        type: 'snare',
        steps: snare,
        volume: 1
      },
      {
        type: 'kick',
        steps: kick,
        volume: 1
      },
    ]

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
        { project.drums.map((value) => {
          return (
              <Track
                  steps={value.steps}
                  key={value.type}
                  onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex)}
                  volume={value.volume}
                  >

                <Instrument
                  type="sampler"
                  samples={{ C3: `/assets/samples/${value.type}.mp3` }} 
                  onLoad={(buffers) => {
                    // Runs when all samples are loaded
                  }}
                  />
              </Track>
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
