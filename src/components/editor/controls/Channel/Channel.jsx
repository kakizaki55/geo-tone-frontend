import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { keys } from '@utils/tone-constants.js';
import {
  cycleStepValue,
  highlightCurrentStep,
} from '@utils/interface-utils.js';
import { DeleteTrack, Joystick, Row, VolumeFader } from '../index.js';
import styles from './Channel.css';

// TODO: remove import after refactoring highlightCurrentStep
import stepStyles from '../Step/Step.css';

const Channel = ({ channel, handleUpdate, handleDelete }) => {
  const [volume, setVolume] = useState(channel.volume);
  const [notes, setNotes] = useState(channel.steps);
  const [bitcrusher, setBitcrusher] = useState(0);
  const [delay, setDelay] = useState(0);

  const [keyArray, setKeyArray] = useState(() => {
    switch (channel.type) {
      case 'duoSynth':
        return keys.CMajorPentatonic4;
      case 'monoSynth':
        return keys.CMajorPentatonic3;
      case 'membraneSynth':
        return keys.CMajorPentatonic2;
      default:
        return keys.CMajorPentatonic4;
    }
  });

  useEffect(() => {
    const updatedChannel = {
      ...channel,
      steps: notes,
      volume: volume,
    };
    handleUpdate(updatedChannel);
  }, [volume, notes]);

  const deleteChannel = () => {
    handleDelete(channel);
  };

  const updateVolume = (e) => {
    setVolume(e.target.value);
  };

  const updateStepCycle = (e) => {
    cycleStepValue(e, notes, setNotes, keyArray);
  };

  return (
    <div className={styles.channel}>
      {/* AUDIO COMPONENTS */}
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) =>
          highlightCurrentStep('step', stepIndex, stepStyles)
        }
      >
        <Instrument
          type={channel.type}
          oscillator={{ type: channel.osc }}
          envelope={{ attack: 0.1, release: 0.1 }}
        />
        <Effect type="bitCrusher" wet={bitcrusher} />
        <Effect type="feedbackDelay" wet={delay} />
        <Effect type="freeverb" wet={channel.fx.reverb} />

        {/* VISUAL COMPONENTS */}
        <Joystick setEffectX={setBitcrusher} setEffectY={setDelay} />
        <Row notes={notes} handleChange={updateStepCycle} />
        <VolumeFader
          id={channel.id}
          value={volume}
          handleChange={updateVolume}
        />
        <DeleteTrack handleClick={deleteChannel} />
      </Track>
    </div>
  );
};

export default Channel;
