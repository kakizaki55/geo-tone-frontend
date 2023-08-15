import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { keys } from '@utils/tone-constants.js';
import { highlightCurrentStep } from '@utils/interface-utils.js';
import { useProject } from '@context/ProjectContext';
import { DeleteTrack, Joystick, Row } from '../index.js';
import Controls from '../TrackControls/TrackControls';
import styles from './Channel.css';
import stepStyles from '../../controls/Step/Step.css';

export default function Channel({ channel }) {
  const { handleDeleteChannel, handleUpdateChannel } = useProject();

  const [volume, setVolume] = useState(channel.volume);
  const [notes, setNotes] = useState(channel.steps);
  const [fx, setFx] = useState(channel.fx);
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
      id: channel.id,
      type: channel.type,
      osc: channel.osc,
      steps: notes,
      volume: volume,
      reverb: fx.reverb,
    };
    handleUpdateChannel(updatedChannel);
  }, [volume, notes, fx]);

  const deleteChannel = () => {
    handleDeleteChannel(channel.id);
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
        <Effect type="freeverb" wet={fx.reverb} />

        {/* VISUAL COMPONENTS */}
        <Joystick setEffectX={setBitcrusher} setEffectY={setDelay} />
        <Row notes={notes} setNotes={setNotes} keyArray={keyArray} />
        <Controls
          channelId={channel.id}
          volume={volume}
          setVolume={setVolume}
          fx={fx}
          setFx={setFx}
        />
        <DeleteTrack handleClick={deleteChannel} />
      </Track>
    </div>
  );
}
