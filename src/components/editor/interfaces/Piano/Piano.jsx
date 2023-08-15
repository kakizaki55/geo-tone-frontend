import { useState } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { keys, pianoEffectTypes } from '@utils/tone-constants.js';
import {
  Dropdown,
  EffectsRack,
  VolumeFader,
} from '@components/editor/controls/index.js';
import styles from './Piano.css';

const Piano = () => {
  const [volume, setVolume] = useState(-40);
  const [fx, setFx] = useState({
    autoFilter: 0,
    autoPanner: 0,
    autoWah: 0,
    bitCrusher: 0,
    distortion: 0,
    feedbackDelay: 0,
    freeverb: 0,
    panVol: 0,
    tremolo: 0,
  });
  const [notes, setNotes] = useState(null);
  const [instrumentType, setInstrumentType] = useState(null);

  const handleChangeInstrumentType = (e) => {
    setInstrumentType(e.target.value);
  };

  const handleEffectsRackChange = (e) => {
    setFx({ ...fx, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.pianoContainer}>
      <Dropdown instrument="piano" handleChange={handleChangeInstrumentType} />
      {/* AUDIO COMPONENTS */}
      <Track volume={volume}>
        <Instrument type={instrumentType} notes={notes} />
        <EffectsRack
          fx={fx}
          fxList={pianoEffectTypes}
          handleChange={handleEffectsRackChange}
        />
        <VolumeFader
          id={'piano'}
          value={volume}
          handleChange={(e) => setVolume(e.target.value)}
        />
        {/* this is the visual buttons of the of the piano*/}
        <div className={styles.pianoKeyContainer}>
          {keys.pianoChromatic.map((note) => (
            <button
              key={`piano-${note}`}
              onMouseDown={() => setNotes([{ name: note }])}
              onMouseUp={() => setNotes(null)}
              value={note}
              className={
                note.length === 2 ? styles.pianoKeyWhite : styles.pianoKeyBlack
              }
            >
              {note}
            </button>
          ))}
        </div>
      </Track>
    </div>
  );
};

export default Piano;
