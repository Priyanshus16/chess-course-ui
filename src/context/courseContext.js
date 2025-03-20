import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses`);
      setCourses(res.data.courses);
    };
    getData();
  }, []);

  return (
    <CourseContext.Provider value={{ courses }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use CourseContext
export const useCourses = () => {
  return useContext(CourseContext);
};
