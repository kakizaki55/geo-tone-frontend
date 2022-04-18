import { useContext, useState, useMemo, createContext } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(
    currentUser
      ? { id: currentUser.id, username: currentUser.username }
      : { id: 'fake id', username: 'fake username' }
  );

  const value = useMemo(() => ({ user, setUser }), [user]);
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
