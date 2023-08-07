import React, { useEffect, useState } from 'react'
import styles from './DrumMachine.css'
import { Track, Instrument } from "reactronica"
import { useProject } from "../../context/ProjectContext"
import DrumDial from './DrumDial'
import DrumSteps from "./DrumSteps"
import { handleDrumChange, highlightCurrentStep } from "../../utils/drumMachineUtils";
import {mockDrums} from './mock'

const DrumMachine = (props) => {

  const { project } = props

  const { handleUpdateDrums } = useProject()

  const [highHat, setHighHat] = useState(project.drums[0].steps)
  const [highHatVolume, setHighHatVolume] = useState(project.drums[0].volume)
  const [snare, setSnare] = useState(project.drums[1].steps)
  const [snareVolume, setSnareVolume] = useState(project.drums[1].volume)
  const [kick, setKick] = useState(project.drums[2].steps)
  const [kickVolume, setKickVolume] = useState(project.drums[2].volume)
  const [volume, setVolume] = useState(-48)

  //this use Effect makes a new drum object and send its back up in the Project Context
  useEffect(()=> {
    const drumObj =[
      {
        type: 'hh',
        steps: highHat,
        volume: highHatVolume
      },
      {
        type: 'snare',
        steps: snare,
        volume: snareVolume
      },
      {
        type: 'kick',
        steps: kick,
        volume: kickVolume
      },
    ]

    handleUpdateDrums(drumObj)
  },[highHat, snare, kick, highHatVolume, snareVolume, kickVolume ])


  return (
    <div
      className={styles.drumMachineContainer}>
        { project.drums.map((value) => {
          return (
            <Track
              steps={value.steps}
              key={value.type}
              onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex, styles)}
              volume={volume}
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
