import styles from '../Project/Project.css';
import editTitle from '../../../public/assets/editTitle.png';
import saveTitle from '../../../public/assets/save.png';

export default function ProjectInfo({
  isEditing,
  setIsEditing,
  currentUser,
  project,
  handleTitleChange,
  handleSaveProjectAndRedirect,
}) {
  return (
    <>
      {/* {isEditing ? (
        <div className={styles.projectTitle}>
          <input
            type="text"
            value={project.title}
            onChange={handleTitleChange}
          />
          <button onClick={() => setIsEditing(false)}>
            <img src={saveTitle} alt="Save Title" />
          </button>
        </div>
      ) : (
        <div className={styles.projectTitle}>
          <h1>{project.title}</h1>
          {currentUser.userId === project.userId && (
            <button onClick={() => setIsEditing(true)}>
              <img src={editTitle} alt="Edit Title" />
            </button>
          )}
        </div>
      )}
      {currentUser.userId === project.userId && (
        <button
          className={styles.saveProject}
          onClick={handleSaveProjectAndRedirect}
        >
          Save Project
        </button>
      )} */}
    </>
  );
}
