import styles from './Explore.css';
import { ProjectProvider } from "../../context/ProjectContext";
import Project from "../Project/Project";

export default function Explore() {


  return (
    <div className={styles.explore}>
      <h3>Explore</h3>
      <ProjectProvider>
        <Project/>
      </ProjectProvider>
    </div>
  );
}
