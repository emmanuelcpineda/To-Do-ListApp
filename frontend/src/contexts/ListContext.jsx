import { useContext, useState, useEffect, createContext } from 'react';

const API_URL = import.meta.env.VITE_REACT_APP_API;

const ListContext = createContext();

const useList = () => {
  return useContext(ListContext);
}

const ListProvider = ({ children }) => {
  const [list, setList] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    //get task information
    const fetchListData = async () => {
      try {
        const response = await fetch(`${API_URL}/lists/${userId}`, {
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
        setList(data);
        localStorage.setItem('listId', data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListData();
  }, [userId, token]);

  return (
    <ListContext.Provider value={{ list, token, userId }}>
      {children}
    </ListContext.Provider>
  );
}

export { ListProvider, useList }