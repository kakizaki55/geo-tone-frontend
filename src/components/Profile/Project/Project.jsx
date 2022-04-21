export default function Project({
  project,
  handleDeleteProject,
  handleEditProjectRedirect,
  isCurrentUser,
  styles,
}) {
  return (
    <div className={styles.projectCard}>
      <p>{project.title}</p>
      <div className={styles.projectButtons}>
        <button onClick={() => handleEditProjectRedirect(project.projectId)}>
          {isCurrentUser ? 'Edit' : 'View'}
        </button>
        {isCurrentUser && (
          <button onClick={() => handleDeleteProject(project.projectId)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
