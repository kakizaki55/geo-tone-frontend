import { useState } from 'react';
import { Song } from 'reactronica';
import { useProject } from '@context/ProjectContext';
import { DrumMachine, Piano, Sequencer } from '@components/editor/interfaces';
import { GlobalControls } from '@components/editor/controls';
import styles from './Project.css';

export default function Project() {
  const {
    project,
    isLoading,
    addingChannel,
    setAddingChannel,
    handleAddChannel,
  } = useProject();

  const [start, setStart] = useState(false);

  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <h2 className={styles.controlHeader}>Global controls</h2>
        <GlobalControls
          start={start}
          setStart={setStart}
          volume={project.volume}
        />
        <h2 className={styles.instrumentHeader}>tRacKs</h2>
        <Song isPlaying={start} bpm={project.bpm} volume={project.volume}>
          <Sequencer
            project={project}
            handleAddChannel={handleAddChannel}
            setAddingChannel={setAddingChannel}
            addingChannel={addingChannel}
          />
          <DrumMachine project={project} />
        </Song>
        <Piano />
      </div>
    </div>
  );
}
