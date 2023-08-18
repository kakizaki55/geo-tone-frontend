import { useState } from 'react';
import { Song } from 'reactronica';
import { useProject } from '@context/ProjectContext';
import { DrumMachine, Piano, Sequencer } from '@components/editor/interfaces';
import { GlobalControls } from '@components/editor/controls';
import styles from './Project.css';

const Project = () => {
  const { project, isLoading } = useProject();

  const [start, setStart] = useState(false);

  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <h2>Global controls</h2>
        <GlobalControls start={start} setStart={setStart} />
        <h2>tRacKs</h2>
        <Song isPlaying={start} bpm={project.bpm} volume={project.volume}>
          <Sequencer />
          <DrumMachine />
          <Piano />
        </Song>
      </div>
    </div>
  );
}

export default Project;