import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Song as Sequencer } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';
import ProjectInfo from '../ProjectInfo/ProjectInfo';
import GlobalControls from '../Controls/GlobalControls';
import Channel from '../Channel/Channel';
import Dropdown from '../Channel/Dropdown';
// import styles from './Project.css';


const Sequencer = () => {

  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    projectId,
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  const [start, setStart] = useState(false);
  const [volume, setVolume] = useState(-48);

  return (
    <div className={styles.sequencerContainer}>
          <Sequencer isPlaying={start} bpm={project.bpm} volume={volume}>
            <GlobalControls
              start={start}
              setStart={setStart}
              volume={volume}
              setVolume={setVolume}
            />
            {
            project.channels.map((channel) => (
              <>
                <Channel key={`channel-${channel.id}`} channel={channel} />
              </>
            ))}
          </Sequencer>

          {addingChannel ? (
            <Dropdown handleAddChannel={handleAddChannel} />
          ) : (
            <button
              onClick={() => setAddingChannel(true)}
              className={styles.addChannel}
            >
              +
            </button>
          )}
      </div>
  )
}

export default Sequencer