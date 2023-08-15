import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { motion } from 'framer-motion';
import { keys } from '@utils/tone-constants.js';
import { highlightCurrentStep } from '@utils/interface-utils.js';
import { useProject } from '@context/ProjectContext';
import { Joystick, Row } from '../index.js';
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
    const channelObj = {
      id: channel.id,
      type: channel.type,
      osc: channel.osc,
      steps: notes,
      volume: volume,
      reverb: fx.reverb,
    };
    handleUpdateChannel(channelObj);
  }, [volume, notes, fx]);

  const deleteChannel = () => {
    handleDeleteChannel(channel.id);
  };

  return (
    <div id={`channel-${channel.id}`} className={styles.channel}>
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
      </Track>

      {/* Render all visual components below*/}

      <Joystick setEffectX={setBitcrusher} setEffectY={setDelay} />
      <Row notes={notes} setNotes={setNotes} keyArray={keyArray} />
      <Controls
        channelId={channel.id}
        volume={volume}
        setVolume={setVolume}
        fx={fx}
        setFx={setFx}
      />
      <motion.button onClick={deleteChannel} className={styles.deleteChannel}>
        Delete Channel
      </motion.button>
    </div>
  );
}
