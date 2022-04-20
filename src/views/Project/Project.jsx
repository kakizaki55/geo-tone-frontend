import { useState } from 'react';
import { Song as Sequencer } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';
import GlobalControls from '../../components/Controls/GlobalControls';
import Channel from '../../components/Channel/Channel';
import Dropdown from '../../components/Channel/Dropdown';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Project({ isLoggedIn = false }) {
  // BACKEND CONNECTION
  // if isLoggedIn
  // GET PROJECT BY PROJECT ID
  // user_id from project and GET user by user_id

  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(false);
  const {
    projectId,
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  const handleSaveProjectAndRedirect = () => {
    handleSaveProject({ projectId, project });
    navigate(`/user/${currentUser.username}`, { push: true });
  };

  if (isLoading) return <div> loading ... </div>;
  console.log('project', project);
  return (
    <>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={project.title}
              onChange={handleTitleChange}
            />
            <button onClick={() => setIsEditing(false)}>Save Title</button>
          </>
        ) : (
          <>
            <h1>{project.title}</h1>
            <button onClick={() => setIsEditing(true)}>Edit Title</button>
          </>
        )}
        <button onClick={handleSaveProjectAndRedirect}>Save Project</button>
        <Sequencer isPlaying={start} bpm={project.bpm} volume={project.volume}>
          <GlobalControls start={start} setStart={setStart} />
          {project.channels.map((channel) => (
            <Channel key={`channel-${channel.id}`} channel={channel} />
          ))}
        </Sequencer>

        {addingChannel ? (
          <Dropdown {...{ handleAddChannel }} />
        ) : (
          <button onClick={() => setAddingChannel(true)}>+</button>
        )}
      </div>
    </>
  );
}
