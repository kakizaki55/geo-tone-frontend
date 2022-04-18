import { useState } from 'react';
import { Song as Sequencer } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';

export default function Project({ isLoggedIn = false }) {
  // BACKEND CONNECTION
  // if isLoggedIn
  // GET PROJECT BY PROJECT ID
  // user_id from project and GET user by user_id

  const [start, setStart] = useState(false);
  const {
    projectId,
    project: { title, isLoading, addingChannel, setAddingChannel, project },
    handleAddChannel,
  } = useProject();

  if (isLoading) return <div> loading ... </div>;
  return (
    <>
      <div>
        <h1>{title}</h1>
        <button onClick={() => handleSaveProject({ projectId, project })}>
          Save Project
        </button>

        <Sequencer
          isPlaying={start}
          bpm={project.bpm}
          volume={project.volume}
        ></Sequencer>
      </div>
    </>
  );
}
