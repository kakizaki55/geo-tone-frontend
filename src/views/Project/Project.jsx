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
import { mockUser, mockProfile } from "../../mocks/resolvers";
import mockProject from "./mocks/project";


export default function Project() {
  const navigate = useNavigate();
  // const { currentUser } = useUser();
  const {
    project: { isLoading, addingChannel, setAddingChannel, project },
    projectId,
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  console.log('project', project)

  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(false);
  const [volume, setVolume] = useState(-48);

  const handleSaveProjectAndRedirect = () => {
    handleSaveProject({ projectId, project });
    navigate(`/user/${mockUser.username}`, { push: true });
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
        <div className={styles.sequencerContainer}>
          <Sequencer isPlaying={start} bpm={project.bpm} volume={volume}>
            <GlobalControls
              start={start}
              setStart={setStart}
              volume={volume}
              setVolume={setVolume}
            />
            {project.channels.map((channel) => (<>
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
      </div>
    </div>
  );
}
