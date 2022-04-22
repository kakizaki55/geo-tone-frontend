import { useContext, useState, createContext, useEffect } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data = await getUser();
      data.username ? setCurrentUser(data) : setCurrentUser({});
      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  const value = { currentUser, setCurrentUser, loading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(' useUser must be used inside of a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
