import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Song } from 'reactronica';
import Sequencer from '../Instruments/Sequencer/Sequencer';
import GlobalControls from '../GlobalControls/GlobalControls';
import Piano from '../Instruments/Piano/Piano';
import styles from './Project.css';
import DrumMachine from '../Instruments/DrumMachine/DrumMachine';

export default function Project() {
  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleAddChannel,
  } = useProject();

  const [start, setStart] = useState(false);
  const [volume, setVolume] = useState(-48);

  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <h2 className={styles.controlHeader}>Global controls</h2>
        <GlobalControls
          start={start}
          setStart={setStart}
          volume={volume}
          setVolume={setVolume}
        />
        <h2 className={styles.instrumentHeader}>tRacKs</h2>
        <Song isPlaying={start} bpm={project.bpm} volume={volume}>
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
