export default function Project({
  project,
  handleDeleteProject,
  handleEditProjectRedirect,
}) {
  return (
    <div>
      <p>{project.title}</p>
      <button onClick={() => handleEditProjectRedirect(project.projectId)}>
        Edit
      </button>
      <button onClick={() => handleDeleteProject(project.projectId)}>
        Delete
      </button>
    </div>
  );
}
