import { useState } from 'react';
import { Track, Instrument } from 'reactronica';
import { keys, pianoEffectTypes } from '@utils/tone-constants.js';
import {
  Dropdown,
  EffectsRack,
  KeyController,
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
        <KeyController keys={keys} setNotes={setNotes} />
      </Track>
    </div>
  );
};

export default Piano;
