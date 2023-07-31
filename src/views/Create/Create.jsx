import styles from './Create.css';
import { ProjectProvider } from '../../context/ProjectContext';
import Project from '../../components/Project/Project';

export default function Create() {
  return (
    <ProjectProvider>
      <Project className={styles.createProject} />
    </ProjectProvider>
  );
}
