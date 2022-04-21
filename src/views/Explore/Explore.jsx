import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllProjects } from '../../services/project';
import styles from './Explore.css';

export default function Explore() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const projects = await findAllProjects();
      setAllProjects(projects);
      setLoading(false);
    };
    fetchdata();
  }, []);

  const handleExploreProject = (id) => {
    navigate(`/project/${id}`, { push: true });
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className={styles.explore}>
      <h3>Explore</h3>
      <div className={styles.projects}>
        {allProjects.map((project, index) => (
          <div
            className={styles.projectCard}
            key={`project.title${index}`}
            onClick={() => handleExploreProject(project.projectId)}
          >
            <p>{project.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
