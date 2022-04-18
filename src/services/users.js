const getUser = () => {};

const registerUser = async (username, password) => {
  const user = { username, password };
  const resp = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
    mode: 'cors',
  });
  return await resp.json();
};

const signInUser = async (username, password) => {
  const user = { username, password };
  const resp = await fetch(`${process.env.API_URL}/api/v1/users/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
    mode: 'cors',
  });
  console.log('resp', await resp.json());
  return await resp.json();
};

export { registerUser, signInUser };
