import Project from '../Project/Project';
import { useNavigate } from 'react-router-dom';
import {
  deleteProjectById,
  findProjectsByUserId,
} from '../../../services/project';
import { useState, useEffect } from 'react';

export default function Projects({ userProfile, isCurrentUser, styles }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const currentProjects = await findProjectsByUserId(userProfile.userId);
        // this currentProject.message is checking to see if there is a message being sent back when there is no project
        if (currentProjects.message) setProjects([]);
        setProjects(currentProjects);
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
  const handleDeleteProject = async (id) => {
    await deleteProjectById(id);
    setProjectLoading(true);
  };

  projectLoading ? <div>loading...</div> : <></>;

  return (
    <div className={styles.projects}>
      {projects[0] &&
        projects.map((project) => (
          <Project
            styles={styles}
            key={project.projectId}
            project={project}
            isCurrentUser={isCurrentUser}
            handleDeleteProject={handleDeleteProject}
            handleEditProjectRedirect={handleEditProjectRedirect}
          />
        ))}
    </div>
  );
}
