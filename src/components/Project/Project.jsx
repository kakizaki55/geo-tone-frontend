import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Song } from "reactronica";
import Sequencer from "../Sequencer/Sequencer";
import GlobalControls from "../Controls/GlobalControls";
import Piano from "../Piano/Paino"
import styles from './Project.css';

export default function Project() {
  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleAddChannel,
  } = useProject();

  const [start, setStart] = useState(false);
  const [volume, setVolume] = useState(-12);

  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <GlobalControls
          start={start}
          setStart={setStart}
          volume={volume}
          setVolume={setVolume}
        />
        <Song isPlaying={start} bpm={project.bpm} volume={volume}>
          <Sequencer
            project={project}
            handleAddChannel={handleAddChannel}
            setAddingChannel={setAddingChannel}
            addingChannel={addingChannel}
          />
        </Song>
        <Piano/>
      </div>
    </div>
  );
}
