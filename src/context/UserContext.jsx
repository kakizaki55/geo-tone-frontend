import { useContext, useState, useMemo, createContext, useEffect } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log('inside useEffect');
      const data = await getUser();
      data.username
        ? setCurrentUser(data)
        : setCurrentUser({ id: 'fake id', username: 'fake username' });
    };
    fetchCurrentUser();
  }, []);

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(' useUser must be used inside of a UserProvider');
  }

  return context;
};

export { UserContext, UserProvider, useUser };
