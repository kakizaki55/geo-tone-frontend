import styles from './Create.css';
import { ProjectProvider } from "../../context/ProjectContext";
import Project from "../Project/Project";

export default function Create() {


  return (
    <div className={styles.explore}>
      <h3>Create</h3>
      <ProjectProvider>
        <Project/>
      </ProjectProvider>
    </div>
  );
}
