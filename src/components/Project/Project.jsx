import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import ProjectInfo from '../ProjectInfo/ProjectInfo';
import styles from './Project.css';
import mockUser from "../mocks/users";
import Sequencer from "../Sequencer/Sequencer";
import { Song } from "reactronica";
import GlobalControls from "../Controls/GlobalControls";
import Piano from "../Piano/Paino"
// import { handleSaveProject } from '../../services/project'
// import GlobalControls from '../Controls/GlobalControls';
// import Channel from '../Channel/Channel';
// import Dropdown from '../Channel/Dropdown';


export default function Project() {
  const navigate = useNavigate();
  // const { currentUser } = useUser();
  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    projectId,
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(false);
  const [volume, setVolume] = useState(-48);

  const handleSaveProjectAndRedirect = () => {
    // handleSaveProject({ projectId, project });
    // navigate(`/user/${mockUser.username}`, { push: true });
  };
  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <ProjectInfo
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          currentUser={mockUser}
          project={project}
          handleTitleChange={handleTitleChange}
          handleSaveProjectAndRedirect={handleSaveProjectAndRedirect}
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
