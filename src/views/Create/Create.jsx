import styles from './Create.css';
import { ProjectProvider } from '@context/ProjectContext';
import Project from '@components/editor/Project/Project';

const Create = () => {
  return (
    <ProjectProvider>
      <Project className={styles.createProject} />
    </ProjectProvider>
  );
};

export default Create;
