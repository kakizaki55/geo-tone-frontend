/**
 * TODO: Create a more functional means of setting color values for active sequence steps
 *
 * Currently, this component houses two child components: Step and Row. This is due to an issue
 * created by the stylesheet cascade in which the Row and Step components had their base styling
 * applied -after- styles implemented by setPitchColor() from Channel.css.
 *
 * Solutions to consider:
 *   1. If relocating Row and Step (child components) to their own folders:
 *      a. ...move highlightCurrentStep into tone-utils (similar to DrumMachine approach)
 *      b. ...export to Row or Step component directly during refactoring
 */

import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { motion, useCycle } from 'framer-motion';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
  setPitchColor,
} from '@utils/tone-constants.js';
import { shapeVariants as shapes } from '@utils/framer-constants';
import { useProject } from '@context/ProjectContext';
import { Joystick } from '../index.js';
import Controls from '../TrackControls/TrackControls';
import classNames from 'classnames';
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

      <Joystick setEffectX={setBitcrusher} setEffectY={setDelay} />
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

function Row({ notes, handleNoteChange }) {
  return (
    <div className={styles.row}>
      {notes.map((note, index) => (
        <Step
          key={`step-${index}`}
          note={note}
          index={index}
          handleNoteChange={handleNoteChange}
        />
      ))}
    </div>
  );
}

function Step({ note, index, handleNoteChange }) {
  const [currentShape, cycleCurrentShape] = useCycle(
    'circle',
    'square',
    'rhombus',
    'triangle',
    'pentagon',
    'hexagon'
  );

  return (
    <motion.button
      id={`step-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => {
        cycleCurrentShape();
        handleNoteChange(e);
      }}
      animate={currentShape}
      variants={shapes}
    >
      {note}
    </motion.button>
  );
}
