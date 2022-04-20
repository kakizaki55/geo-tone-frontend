import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Projects from '../../components/Profile/Projects/Projects';
import User from '../../components/Profile/User/user';
import { findProfileByUsername } from '../../services/profiles';
import {
  findProjectsByUserId,
  createNewProjectByUserId,
} from '../../services/project';
import { useUser } from '../../context/UserContext';

// BACKEND CONNECTION

// button that says create project
//  POST to projects
//  res from POST = { projectId }
//  redirect to="/project/${projectId}"
//
// DELETE user

export default function Profile() {
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/user/new', { push: true });
  };
  const handleEditProfile = () => {
    navigate(`/user/${username}/edit`, { push: true });
  };
  const handleCreateNewProject = async () => {
    const project = await createNewProjectByUserId();
    console.log('project', project);
    if (project.projectId) {
      navigate(`/project/${project.projectId}`, { push: true });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await findProfileByUsername(username);
        setUserProfile(data);
        const projects = await findProjectsByUserId(data.userId);
        setProjects(projects);
        console.log('projects', projects); // TODO: Check data model for authentication params
      } catch (error) {
        setUserProfile({}); // TODO: Do we need this fallback?
        setProjects([]);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div>loading...</div>;
  //add a button to create a new project
  // function to insert project using th back end route

  return (
    <>
      {!userProfile.username ? (
        <>
          Hey bud, gotta make a profile // TODO: Michelle doesn't want this
          <button onClick={handleCreateProfile}>Create Profile</button>
        </>
      ) : (
        <>
          <User userProfile={userProfile} />
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleCreateNewProject}> Create New Project</button>
          <Projects projects={projects}></Projects>
        </>
      )}
    </>
  );
}
