import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import ProjectInfo from '../ProjectInfo/ProjectInfo';
import styles from './Project.css';
import Sequencer from "../Sequencer/Sequencer";
import { Song } from "reactronica";
import GlobalControls from "../Controls/GlobalControls";
import Piano from "../Piano/Paino"

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
        <ProjectInfo
          project={project}
        />
        <GlobalControls
          start={start}
          setStart={setStart}
          volume={volume}
          setVolume={setVolume}
        />
        <Song isPlaying={start} bpm={project.bpm} volume={volume}>
          <Sequencer
            key={'sequencer'}
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
