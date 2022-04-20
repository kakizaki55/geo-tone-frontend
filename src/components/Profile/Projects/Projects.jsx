import Project from '../Project/Project';
import { useNavigate } from 'react-router-dom';
import {
  deleteProjectById,
  findProjectsByUserId,
} from '../../../services/project';
import { useState, useEffect } from 'react';

export default function Projects({ userProfile }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // profile hast been set yet and and there for projects are coming back undefined
        const currentProjects = await findProjectsByUserId(userProfile.userId);
        setProjects(currentProjects);
        console.log('projects', projects);
      } catch (error) {
        setProjects([]);
        throw new Error(error);
      }
      setProjectLoading(false);
    };
    fetchProjects();
  }, [projectLoading]);

  const handleEditProjectRedirect = (id) => {
    navigate(`/project/${id}`, { push: true });
  };
  const handleDeleteProject = (id) => {
    deleteProjectById(id);
    setProjectLoading(true);
  };

  if (projectLoading) return <div>loading...</div>;

  return (
    <div>
      {projects.map((project) => (
        <Project
          key={project.projectId}
          project={project}
          handleDeleteProject={handleDeleteProject}
          handleEditProjectRedirect={handleEditProjectRedirect}
        />
      ))}
    </div>
  );
}
