import React, { useEffect, useState } from 'react'
import styles from './DrumMachine.css'
import { Track, Instrument } from "reactronica"
import { useProject } from "../../context/ProjectContext"
import classNames from 'classnames';
import Pad from './Pad'


const DrumMachine = (props) => {
  const { project } = props

  const { handleUpdateDrums } = useProject()
  const [highHat, setHighHat] = useState(project.drums.hh)
  const [snare, setSnare] = useState(project.drums.snare)
  const [kick, setKick] = useState(project.drums.kick)

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


      drums.forEach((stepDiv, stepDivIndex) => {
        const stepIndexId = Number(stepDiv.id.replace(/\D/g, ""))
        console.log('stepDiv', stepIndexId)
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
                >

              <Instrument
                type="sampler"
                samples={{ C3: `/assets/samples/${value[0]}.mp3` }} 
                onLoad={(buffers) => {
                  // Runs when all samples are loaded
                }}
                />
            </Track>
          </>)
          })}

    {/* Render all visual components below*/}
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

export default DrumMachine
