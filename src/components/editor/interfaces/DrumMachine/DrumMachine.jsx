import { useEffect, useState } from 'react';
import { Track, Instrument } from 'reactronica';
import { useProject } from '@context/ProjectContext';
import { handleDrumChange, highlightCurrentStep } from '@utils/interface-utils';
import DrumSteps from './DrumSteps';
import styles from './DrumMachine.css';

const DrumMachine = () => {
  const { project, handleUpdateDrums } = useProject();

  const [highHat, setHighHat] = useState(project.drums[0].steps);
  const [highHatVolume, setHighHatVolume] = useState(project.drums[0].volume);
  const [snare, setSnare] = useState(project.drums[1].steps);
  const [snareVolume, setSnareVolume] = useState(project.drums[1].volume);
  const [kick, setKick] = useState(project.drums[2].steps);
  const [kickVolume, setKickVolume] = useState(project.drums[2].volume);

  //this use Effect makes a new drum object and send its back up in the Project Context
  useEffect(() => {
    const drumObj = [
      {
        type: 'high-hat',
        steps: highHat,
        volume: highHatVolume,
      },
      {
        type: 'snare',
        steps: snare,
        volume: snareVolume,
      },
      {
        type: 'kick',
        steps: kick,
        volume: kickVolume,
      },
    ];

    handleUpdateDrums(drumObj);
  }, [highHat, snare, kick, highHatVolume, snareVolume, kickVolume]);

  const drumProps = [
    {
      type: 'hightHat',
      steps: highHat,
      setSteps: setHighHat,
      volume: highHatVolume,
      setVolume: setHighHatVolume,
      handleDrumChange: handleDrumChange,
    },
    {
      type: 'snare',
      steps: snare,
      setSteps: setSnare,
      volume: snareVolume,
      setVolume: setSnareVolume,
      handleDrumChange: handleDrumChange,
    },
    {
      type: 'kick',
      steps: kick,
      setSteps: setKick,
      volume: kickVolume,
      setVolume: setKickVolume,
      handleDrumChange: handleDrumChange,
    },
  ];

  return (
    <div className={styles.drumMachineContainer}>
      {project.drums.map((value) => {
        return (
          <Track
            steps={value.steps}
            key={value.type}
            onStepPlay={(step, stepIndex) =>
              highlightCurrentStep('drumPadOn', stepIndex, styles)
            }
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
        );
      })}
      {/* Render all visual components below*/}
      <DrumSteps drumProps={drumProps} />
    </div>
  );
};

export default DrumMachine;
