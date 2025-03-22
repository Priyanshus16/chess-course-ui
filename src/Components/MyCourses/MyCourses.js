// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   LinearProgress,
//   Box,
// } from "@mui/material";
// import { useUsers } from "../../context/UserContext";
// import { useCourses } from "../../context/courseContext";

// const MyCourses = () => {
//   const [purchasedCourses, setPurchasedCourses] = useState([]); // Store filtered courses

//   const { users } = useUsers();
//   const { courses } = useCourses();

//   useEffect(() => {
//     const localUser = JSON.parse(localStorage.getItem("user"));
//     if (!localUser) return; 

//     const userCourses =
//       users.find((user) => user._id === localUser._id)?.purchasedCourses || [];

//     // Extract course IDs
//     const purchasedCourseIds = userCourses.map((course) => course.courseId);

//     // Filter only the purchased courses from context
//     const filteredCourses = courses.filter((course) =>
//       purchasedCourseIds.includes(course._id)
//     );

//     setPurchasedCourses(filteredCourses);
//   }, [users, courses]);

//   return (
//     <Box sx={{ padding: 4, background: "#F5F5F5" }}>
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         textAlign="center"
//         color="#1976D2"
//         marginBottom={3}
//       >
//         My Courses
//       </Typography>

//       <Grid container spacing={3}>
//         {purchasedCourses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course._id}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: "0.3s",
//                 "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="180"
//                 image={course.image}
//                 alt={course.title}
//               />

//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" color="#333">
//                   {course.title}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" marginY={1}>
//                   {course.description}
//                 </Typography>

//                 <LinearProgress
//                   variant="determinate"
//                   value={course.progress}
//                   sx={{ height: 8, borderRadius: 5, marginBottom: 2 }}
//                 />
//                 <Typography variant="body2" fontWeight="bold" color="#1976D2">
//                   Progress: {course.progress}%
//                 </Typography>

//                 <Button
//                   variant="contained"
//                   sx={{ marginTop: 2, background: "#1976D2", color: "#fff" }}
//                 >
//                   View Course
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default MyCourses;


import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  LinearProgress,
  Box,
  IconButton,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { useUsers } from "../../context/UserContext";
import { useCourses } from "../../context/courseContext";

const MyCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const { users } = useUsers();
  const { courses } = useCourses();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return;

    const userCourses =
      users.find((user) => user._id === localUser._id)?.purchasedCourses || [];

    const purchasedCourseIds = userCourses.map((course) => course.courseId);

    const filteredCourses = courses.filter((course) =>
      purchasedCourseIds.includes(course._id)
    );

    setPurchasedCourses(filteredCourses);
  }, [users, courses]);

  return (
    <Box sx={{ padding: 4, background: "#F9F9F9", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        color="#1976D2"
        marginBottom={4}
      >
        My Courses
      </Typography>

      <Grid container spacing={4} justifyContent="center">
  {purchasedCourses.map((course) => (
    <Grid item xs={12} sm={6} md={4} key={course._id}>
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: 5,
          transition: "0.3s",
          "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%", // Ensures all cards have the same width
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={course.image}
          alt={course.title}
          sx={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" marginBottom={2}>
            {course.description}
          </Typography>

          {/* Course Metadata */}
          <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
            <AccessTimeIcon color="primary" fontSize="small" />
            <Typography variant="body2">{course.duration}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} marginBottom={2}>
            <SchoolIcon color="primary" fontSize="small" />
            <Typography variant="body2">{course.level}</Typography>
          </Box>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={course.progress || 0}
            sx={{ height: 8, borderRadius: 5, marginBottom: 2 }}
          />
          <Typography variant="body2" fontWeight="bold" color="#1976D2">
            Progress: {course.progress || 0}%
          </Typography>
        </CardContent>

        {/* View Course Button */}
        <Box display="flex" justifyContent="space-between" padding={2}>
          <Button
            variant="contained"
            sx={{ background: "#1976D2", color: "#fff", borderRadius: 5 }}
          >
            View Course
          </Button>
          {course.video && (
            <IconButton color="primary">
              <PlayCircleOutlineIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default MyCourses;