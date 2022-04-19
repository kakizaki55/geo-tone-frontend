const createProfile = async (profile) => {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/v1/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
      credentials: 'include',
      mode: 'cors',
    });

    const parsedData = await resp.json();
    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};

const findProfileByUsername = async (username) => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/profiles/${username}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'cors',
      }
    );
    console.log('resp', resp); // Returning status 200

    const parsedData = await resp.json();
    console.log('parsedData', parsedData);
    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};

export { createProfile, findProfileByUsername };
