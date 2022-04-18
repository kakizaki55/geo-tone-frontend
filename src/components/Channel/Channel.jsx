import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import { keyCMajorPentatonic, setPitchColor } from '../../utils/toneUtils';

import classNames from 'classnames';
import styles from './Channel.css';
import Row from './Row';

export default function Channel({ channel }) {
  const [instrument, setInstrument] = useState(channel.type);
  const [oscillator, setOscillator] = useState(channel.osc);
  const [volume, setVolume] = useState(channel.volume);
  const [keyArray, setKeyArray] = useState(keyCMajorPentatonic);
  const [notes, setNotes] = useState(channel.steps);
  const [fx, setFx] = useState({
    reverb: channel.reverb,
  });

  const { handleUpdateChannel } = useProject();

  const channelId = channel.id;

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

  //changes the note up the given key
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

  return (
    <div id={`channel-${channelId}`} className={styles.channel}>
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex)}
      >
        <Instrument
          type={instrument}
          envelope={{ attack: 0.2, release: 0.5 }}
          oscillator={{ type: oscillator }}
        />
        <Effect type="freeverb" wet={fx.reverb} />
      </Track>

      {/* Display components below*/}
      <Row {...{ notes, handleNoteChange }} />
      {/* <Dropdown {...{ instrument, setInstrument, oscillator, setOscillator }} /> */}
      {/* <ChannelControls {...{ channelId, volume, setVolume, fx, setFx }} /> */}
    </div>
  );
}
