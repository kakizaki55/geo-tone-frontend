import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { motion } from 'framer-motion';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
} from '@utils/tone-constants.js';
import { highlightCurrentStep } from '@utils/interface-utils.js';
import { useProject } from '@context/ProjectContext';
import { Joystick, Row } from '../index.js';
import Controls from '../TrackControls/TrackControls';
import styles from './Channel.css';
import stepStyles from '../../controls/Step/Step.css';

export default function Channel({ channel }) {
  const channelId = channel.id;

  const { handleDeleteChannel, handleUpdateChannel } = useProject();

  const [instrument, setInstrument] = useState(channel.type);
  const [oscillator, setOscillator] = useState(channel.osc);
  const [volume, setVolume] = useState(channel.volume);
  const [notes, setNotes] = useState(channel.steps);
  const [fx, setFx] = useState({
    reverb: channel.reverb,
  });
  const [bitcrusher, setBitcrusher] = useState(0);
  const [delay, setDelay] = useState(0);

  const [keyArray, setKeyArray] = useState(() => {
    switch (instrument) {
      case 'duoSynth':
        return keyCMajorPentatonic4;
      case 'monoSynth':
        return keyCMajorPentatonic3;
      case 'membraneSynth':
        return keyCMajorPentatonic2;
      default:
        return keyCMajorPentatonic4;
    }
  });

  useEffect(() => {
    const channelObj = {
      id: channelId,
      type: instrument,
      osc: oscillator,
      steps: notes,
      volume: volume,
      reverb: fx.reverb,
    };
    handleUpdateChannel(channelObj);
  }, [instrument, oscillator, volume, notes, fx]);

  const deleteChannel = () => {
    handleDeleteChannel(channelId);
  };

  return (
    <div id={`channel-${channelId}`} className={styles.channel}>
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) =>
          highlightCurrentStep('step', stepIndex, stepStyles)
        }
      >
        <Instrument
          type={instrument}
          oscillator={{ type: 'triangle' }}
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
        channelId={channelId}
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
