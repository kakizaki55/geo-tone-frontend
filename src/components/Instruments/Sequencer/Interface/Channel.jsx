import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useProject } from '../../../../context/ProjectContext';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
} from '../../../../utils/toneUtils';
import Controls from './TrackControls';
import Row from './Row';
import styles from './Channel.css';
import Joystick from '../../../Controls/Joystick/Joystick.jsx';

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

  const setPitchColor = (string) => {
    return {
      [styles.C]: string?.includes('C'),
      [styles.D]: string?.includes('D'),
      [styles.E]: string?.includes('E'),
      [styles.G]: string?.includes('G'),
      [styles.A]: string?.includes('A'),
    };
  };

  const highlightCurrentStep = (stepIndex) => {
    const sequence = document
      .getElementById(`channel-${channelId}`)
      .querySelectorAll(`.${styles.step}`);

    sequence.forEach((stepDiv, stepDivIndex) => {
      if (stepIndex === stepDivIndex) {
        stepDiv.className = classNames(
          styles.active,
          styles.step,
          setPitchColor(stepDiv.textContent)
        );
      } else {
        stepDiv.className = classNames(
          styles.step,
          setPitchColor(stepDiv.textContent)
        );
      }
    });
  };

  const handleNoteChange = (e) => {
    const indexOfStep = e.target.id.split('-')[1];

    const indexOfKeyArray = keyArray.findIndex(
      (note) => note === e.target.textContent
    );

    const newNotes = notes.map((note, index) => {
      if (Number(indexOfStep) === index) {
        return keyArray[indexOfKeyArray + 1];
      }
      return note;
    });

    setNotes(newNotes);
  };

  const deleteChannel = () => {
    handleDeleteChannel(channelId);
  };

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

  return (
    <div id={`channel-${channelId}`} className={styles.channel}>
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex)}
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

      <Joystick setDelay={setDelay} setBitcrusher={setBitcrusher} />
      <Row
        notes={notes}
        handleNoteChange={handleNoteChange}
        setPitchColor={setPitchColor}
      />
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
