import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useProject } from '@context/ProjectContext';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
  setPitchColor,
} from '@utils/tone-utils.js';
import Controls from './Controls';
import Row from './Row';
import styles from './Channel.css';

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

  const handleXYControls = (e, info) => {
    let x = Number(info.offset.x) / 100;
    let y = Number(info.offset.y) / 100;
    if (x > 1) {
      x = 1;
    }
    if (y > 1) {
      y = 1;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    setBitcrusher(x);
    setDelay(y);
  };

  const deleteChannel = () => {
    handleDeleteChannel(channelId);
  };

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

      <div className={styles.dragContainer}>
        <div className={styles.dragControls}>
          <motion.input
            className={styles.dragKnob}
            onDrag={(e, info) => handleXYControls(e, info)}
            whileHover={{ scale: 1.5 }}
            drag
            dragConstraints={{
              top: -0,
              left: -0,
              right: 0,
              bottom: 0,
            }}
            dragMomentum={false}
            type="range"
            min="0"
            max="1"
            step="0.05"
          />
        </div>
      </div>
      <Row notes={notes} handleNoteChange={handleNoteChange} />
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
