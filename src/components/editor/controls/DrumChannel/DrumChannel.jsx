import { useState, useEffect } from 'react';
import { Track, Instrument } from 'reactronica';
import { cycleStepValue, highlightCurrentStep } from '@utils/interface-utils';
import { globalParams, keys } from '@utils/tone-constants.js';
import { DrumRow, VolumeFader } from '../index.js';
import styles from './DrumChannel.css';

// TODO: remove import after refactoring highlightCurrentStep
import padStyles from '../../controls/Pad/Pad.css';

const DrumChannel = ({ drum, handleUpdate }) => {
  const [volume, setVolume] = useState(drum.volume);
  const [notes, setNotes] = useState(drum.steps);

  // Initial setter to ramp up volume, prevents audio peaking on render
  useEffect(() => setVolume(globalParams.volume.default), []);

  useEffect(() => {
    const updatedDrum = {
      type: drum.type,
      steps: notes,
      volume: volume,
    };

    handleUpdate(updatedDrum);
  }, [notes, volume]);

  const handlePadToggle = (e) => {
    cycleStepValue(e, notes, setNotes, keys.drumHit);
  };

  return (
    <div className={styles.channel}>
      {/* AUDIO COMPONENTS */}
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) =>
          highlightCurrentStep('drumPadOn', stepIndex, padStyles)
        }
      >
        <Instrument
          type="sampler"
          samples={{ C3: `/assets/samples/${drum.type}.mp3` }}
          onLoad={(buffers) => {
            // Runs when all samples are loaded
          }}
        />

        {/* VISUAL COMPONENTS*/}
        <DrumRow notes={notes} togglePad={handlePadToggle} />
        <VolumeFader
          id={drum.type}
          value={volume}
          handleChange={(e) => setVolume(e.target.value)}
        />
      </Track>
    </div>
  );
};

export default DrumChannel;
