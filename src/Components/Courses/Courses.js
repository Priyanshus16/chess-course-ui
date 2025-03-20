import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useCourses } from "../../context/courseContext";


const Courses = () => {

  // const [courses, setCourses] = useState([]);
  const {courses} = useCourses();;

  // const getData = async() => {
  //   const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses`)
  //   setCourses(res.data.courses);
    
  // }

  // useEffect(() => {
  //   getData();
  // },[])


  return (
    <Box sx={{ p: 4 }}> 
        <Typography sx={{pb:2}} variant="h3" align="center" fontWeight={600} gutterBottom>
          Explore Our Courses
        </Typography>
      

      <Grid container spacing={4}>
        {courses.slice(0,6).map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Enrolled By: <strong>{course.enrolled}</strong>
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Duration:{" "}
                  <strong>
                    {course.duration}
                    {" hours"}
                  </strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level: <strong>{course.courseLevel}</strong>
                </Typography>

                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  {/* <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through", mr: 1 }}
                  >
                    ₹{course.originalPrice}
                  </Typography> */}
                  <Typography variant="h6" color="primary">
                    ₹{course.price}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ ml: 1 }}
                  >
                    ({course.discount}% off)
                  </Typography> */}
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;


