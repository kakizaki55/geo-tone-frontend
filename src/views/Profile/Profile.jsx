import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import User from '../../components/Profile/User/User';
import Projects from '../../components/Profile/Projects/Projects';
import { useUser } from '../../context/UserContext';
import { deleteUser } from '../../services/users';
import { findProfileByUsername } from '../../services/profiles';
import { createNewProjectByUserId } from '../../services/project';
import styles from './Profile.css';
import editImg from '../../assets/editTitle.png';

export default function Profile() {
  const { username } = useParams();
  const { currentUser, setCurrentUser } = useUser();

  const [userProfile, setUserProfile] = useState({});
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
    if (project.projectId) {
      navigate(`/project/${project.projectId}`, { push: true });
    }
  };

  const handleDeleteUser = async () => {
    if (
      confirm(
        'Are you sure you want to delete your account? Any projects will be lost.'
      )
    ) {
      const resp = await deleteUser(currentUser.userId);
      if (resp.message) {
        setCurrentUser({});
        navigate('/', { push: true });
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await findProfileByUsername(username);
        setUserProfile(data);
      } catch {
        setUserProfile({});
      }
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div>loading...</div>;

  return (
    <>
      {!userProfile.username ? (
        <div className={styles.createProfile}>
          <h1>Create A Profile</h1>
          <p>Before you begin your audio adventure, please create a profile!</p>
          <button onClick={handleCreateProfile}>Click Here</button>
        </div>
      ) : (
        <div className={styles.cont}>
          <div className={styles.topSection}>
            <section className={styles.profileCont}>
              <User styles={styles} userProfile={userProfile} />
              <button
                className={styles.editProfButton}
                onClick={handleEditProfile}
              >
                <img src={editImg} alt="Edit your profile" />
              </button>
            </section>
            <button
              className={styles.createProject}
              onClick={handleCreateNewProject}
            >
              Create New Project
            </button>
          </div>
          <h2>Your Projects</h2>
          <Projects
            styles={styles}
            isCurrentUser={username === currentUser.username}
            userProfile={userProfile}
          />
          <button className={styles.deleteAccount} onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      )}
    </>
  );
}
