import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Projects from '../../components/Profile/Projects/Projects';
import User from '../../components/Profile/User/user';

export default function Profile() {
  // const { username } = useParams();

  // BACKEND CONNECTION

  // button that says create project
  // POST to projects
  // res from POST = { projectId }
  // redirect to="/project/${projectId}"

  // GET PROJECTS BY USER_ID
  // use username to get user_id
  // or put user_id in params
  const [projects, setProjects] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      const resp = await fetch(
        `${process.env.API_URL}/api/v1/projects/user/1`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await resp.json();
      setProjects(data);
    };
    fetchProject();
  }, []);

  return (
    <>
      <User userProfile={userProfile} />
      <Projects projects={projects} />
    </>
  );
}
