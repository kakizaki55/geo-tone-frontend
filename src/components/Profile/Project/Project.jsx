export default function Project({
  project,
  handleDeleteProject,
  handleEditProjectRedirect,
  isCurrentUser,
}) {
  return (
    <div>
      <p>{project.title}</p>
      <button onClick={() => handleEditProjectRedirect(project.projectId)}>
        {isCurrentUser ? 'Edit' : 'View'}
      </button>
      {isCurrentUser && (
        <button onClick={() => handleDeleteProject(project.projectId)}>
          Delete
        </button>
      )}
    </div>
  );
}
