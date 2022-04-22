export const getTotalProjects = async () => {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/v1/projects/count`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
    });
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTotalUsers = async () => {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/v1/users/count`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
    });
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};
