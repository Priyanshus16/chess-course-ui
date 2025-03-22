import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
      setUser(res.data.users);
    };
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use CourseContext
export const useUsers = () => {
  return useContext(UserContext);
};
