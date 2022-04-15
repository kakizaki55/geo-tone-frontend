import React from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { username } = useParams();

  // BACKEND CONNECTION

  // button that says create project
  // POST to projects
  // res from POST = { projectId }
  // redirect to="/project/${projectId}"

  // GET PROJECTS BY USER_ID
  // use username to get user_id
  // or put user_id in params

  return <div>Profile</div>;
}
