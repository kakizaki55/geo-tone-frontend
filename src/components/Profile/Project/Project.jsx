import { useNavigate } from 'react-router-dom';

export default function Project({ project }) {
  // this component needs to be built out more
  console.log('project', project.projectId);
  const navigate = useNavigate();

  const handleEditProjectRedirect = () => {
    navigate(`/project/${project.projectId}`, { push: true });
  };
  return (
    <div>
      <p>{project.title}</p>
      <button onClick={handleEditProjectRedirect}>Edit</button>
      <button>Delete</button>
    </div>
  );
}
