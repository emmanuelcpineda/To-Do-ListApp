import { useContext, useState, useEffect, createContext } from 'react';

const API_URL = import.meta.env.VITE_REACT_APP_API;

const TaskContext = createContext();

const useTask = () => {
  return useContext(TaskContext);
}

const TaskProvider = ({ children }) => {
  const [task, setTask] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    //get task information
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks/${userId}`, {
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
        setTask(data);
        localStorage.setItem('taskId', data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskData();
  }, [userId, token]);

  return (
    <TaskContext.Provider value={{ task, token, userId }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskProvider, useTask }