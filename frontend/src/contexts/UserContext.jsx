import { createContext, useContext, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_REACT_APP_API;

const UserContext = createContext();

const useUser= () => {
  return useContext(UserContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    //get user information
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.warn('Unable to fetch data');
          return;
        }

        const data = await response.json();
        console.log(data);
        setUser(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const loginUser = (userData) => {
    localStorage.setItem('token', userData.token);
    setLoggedUser(userData);
  }

  return (
    <UserContext.Provider value={{ user, token, userId, loginUser, loggedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useUser };