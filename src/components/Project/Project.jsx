import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Song as Sequencer } from 'reactronica';
import { useUser } from '../../context/UserContext';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';
import ProjectInfo from '../ProjectInfo/ProjectInfo';
import GlobalControls from '../Controls/GlobalControls';
import Channel from '../Channel/Channel';
import Dropdown from '../Channel/Dropdown';
import styles from './Project.css';
import { mockUser, mockProfile } from "../../mocks/resolvers";
import Sequencer from "../Sequencer/Sequencer";


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
        <Sequencer
          start={start}
          setStart={setStart}
          volume={volume}
          setVolume={setVolume}
          project={project}
          handleAddChannel={handleAddChannel}
          setAddingChannel={setAddingChannel}
          addingChannel={addingChannel}
        />
      </div>
    </div>
  );
}
