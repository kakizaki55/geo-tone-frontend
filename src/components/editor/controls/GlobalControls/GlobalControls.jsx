import { useProject } from '@context/ProjectContext';
import { BPMCounter, PlayButton, VolumeFader } from '../index.js';
import styles from './GlobalControls.css';

export default function GlobalControls({ start, setStart }) {
  const { project, handleSongBPM, handleSongVolume } = useProject();

  return (
    <div id="global-controls" className={styles.container}>
      <PlayButton start={start} setStart={setStart} />
      <VolumeFader
        isGlobal
        id={'global'}
        value={project.volume}
        handleChange={handleSongVolume}
      />
      <BPMCounter value={project.bpm} handleChange={handleSongBPM} />
    </div>
  );
}
