import { useCycle } from 'framer-motion';
import { useProject } from '../../context/ProjectContext';
import { playVariants as play } from '../../utils/framerUtils';
import PlayButton from '../Controls/PlayButton/PlayButton.jsx';
import VolumeFader from '../Controls/VolumeFader/VolumeFader.jsx';
import BPMCounter from '../Controls/BPMCounter/BPMCounter.jsx';
import styles from './GlobalControls.css';

export default function GlobalControls({ start, setStart, volume, setVolume }) {
  const {
    project: { project },
    handleSongBPM,
  } = useProject();

  const [active, cycleActive] = useCycle('play', 'stop');

  return (
    <div id="global-controls" className={styles.container}>
      <PlayButton
        start={start}
        setStart={setStart}
        active={active}
        cycleActive={cycleActive}
        play={play}
      />
      <VolumeFader
        isGlobal
        value={volume}
        handleChange={(e) => setVolume(e.target.value)}
      />
      <BPMCounter project={project} handleSongBPM={handleSongBPM} />
    </div>
  );
}
