import { useEffect, useState } from 'react';
import { Track, Instrument } from 'reactronica';
import { globalParams, keys, fxTypes } from '@utils/tone-constants.js';
import {
  Dropdown,
  EffectsRack,
  KeyController,
  VolumeFader,
} from '@components/editor/controls/index.js';
import { useProject } from '@context/ProjectContext.jsx';
import styles from './Piano.css';

const Piano = () => {
  const { project } = useProject();

  const [volume, setVolume] = useState(project.piano.volume);
  const [fx, setFx] = useState(project.piano.fx);
  const [notes, setNotes] = useState(project.piano.steps);
  const [instrumentType, setInstrumentType] = useState(null);

  // Initial setter to ramp up volume, prevents audio peaking on render
  useEffect(() => setVolume(globalParams.volume.default), []);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleChangeInstrumentType = (e) => {
    setInstrumentType(e.target.value);
  };

  const handleEffectsRackChange = (e) => {
    setFx({ ...fx, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.pianoContainer}>
      <Track volume={volume}>
        <Instrument type={instrumentType} notes={notes} />

        <Dropdown
          instrument={'piano'}
          handleChange={handleChangeInstrumentType}
        />
        <EffectsRack
          fx={fx}
          fxList={fxTypes}
          handleChange={handleEffectsRackChange}
        />
        <VolumeFader
          id={'piano'}
          value={volume}
          handleChange={handleVolumeChange}
        />
        <KeyController keys={keys} setNotes={setNotes} />
      </Track>
    </div>
  );
};

export default Piano;
