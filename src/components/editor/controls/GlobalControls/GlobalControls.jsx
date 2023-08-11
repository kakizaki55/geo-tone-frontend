import { useProject } from '@context/ProjectContext';
import { BPMCounter, PlayButton, VolumeFader } from '../index.js';
import styles from './GlobalControls.css';

export default function GlobalControls({ start, setStart, volume, setVolume }) {
  const { project, handleSongBPM } = useProject();

  return (
    <div id="global-controls" className={styles.container}>
      <PlayButton start={start} setStart={setStart} />
      <VolumeFader
        isGlobal
        id={'global'}
        value={volume}
        handleChange={(e) => setVolume(e.target.value)}
      />
      <BPMCounter project={project} handleSongBPM={handleSongBPM} />
    </div>
  );
}
