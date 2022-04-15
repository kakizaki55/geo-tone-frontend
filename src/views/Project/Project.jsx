import { useParams } from 'react-router-dom';

export default function Project({ isLoggedIn = false }) {
  const { project_id } = useParams;

  // BACKEND CONNECTION
  // if isLoggedIn
  // GET PROJECT BY PROJECT ID
  // user_id from project and GET user by user_id

  return <div>Project</div>;
}
