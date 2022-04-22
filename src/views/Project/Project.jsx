import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Song as Sequencer } from 'reactronica';
import { useUser } from '../../context/UserContext';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';
import ProjectInfo from '../../components/ProjectInfo/ProjectInfo';
import GlobalControls from '../../components/Controls/GlobalControls';
import Channel from '../../components/Channel/Channel';
import Dropdown from '../../components/Channel/Dropdown';
import styles from './Project.css';

export default function Project() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    projectId,
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(false);

  const handleSaveProjectAndRedirect = () => {
    handleSaveProject({ projectId, project });
    navigate(`/user/${currentUser.username}`, { push: true });
  };

  if (isLoading) return <div> loading ... </div>;

  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        <ProjectInfo
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          currentUser={currentUser}
          project={project}
          handleTitleChange={handleTitleChange}
          handleSaveProjectAndRedirect={handleSaveProjectAndRedirect}
        />

        <div className={styles.sequencerContainer}>
          <Sequencer
            isPlaying={start}
            bpm={project.bpm}
            volume={project.volume}
          >
            <GlobalControls start={start} setStart={setStart} />
            {project.channels.map((channel) => (
              <Channel key={`channel-${channel.id}`} channel={channel} />
            ))}
          </Sequencer>

          {addingChannel ? (
            <Dropdown handleAddChannel={handleAddChannel} />
          ) : (
            <button onClick={() => setAddingChannel(true)}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}
