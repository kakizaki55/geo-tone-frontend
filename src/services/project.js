const deleteProjectById = async (projectId) => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/projects/${projectId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};

const findProjectById = async (projectId) => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/projects/${projectId}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    const data = await resp.json();
    const channels = data.channels.map((channel) => JSON.parse(channel));

    return { data, channels };
  } catch (error) {
    throw new Error(error);
  }
};

const findProjectsByUserId = async (userId) => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/projects/user/${userId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};

const handleSaveProject = async ({ projectId, project }) => {
  if (!projectId) {
    try {
      const resp = await fetch(`${process.env.API_URL}/api/v1/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const parsedData = await resp.json();

      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    try {
      const resp = await fetch(
        `${process.env.API_URL}/api/v1/projects/${projectId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        }
      );
      const parsedData = await resp.json();

      return parsedData;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export {
  deleteProjectById,
  findProjectById,
  findProjectsByUserId,
  handleSaveProject,
};
