import React from "react";
import { Container, Box, Typography, Button, Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AccessTime, MonetizationOn, School } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const CourseDetail = () => {

  const location = useLocation();
  const course = location.state;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, p: 4, boxShadow: 4, borderRadius: 3, bgcolor: "#F8FAFC" }}>
        {/* Course Title */}
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1E3A8A", mb: 2 }}>
          {course.title}
        </Typography>

        {/* Instructor Name */}

        {/* Duration & Price */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography sx={{ display: "flex", alignItems: "center", color: "#475569" }}>
            <AccessTime sx={{ mr: 1, color: "#1E3A8A" }} /> {course.duration} hours
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", color: "#475569" }}>
            <MonetizationOn sx={{ mr: 1, color: "#1E3A8A" }} /> {course.price}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={{ mt: 2, color: "#475569" }}>
          {course.description}
        </Typography>

        {/* Curriculum Section */}
        <Card sx={{ mt: 3, p: 2, bgcolor: "#FFF" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
              Course Curriculum
            </Typography>
            <List>
              {course.curricullum.map((topic, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={topic} />
                  </ListItem>
                  {index < course.curricullum.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Enroll Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "#0F172A", "&:hover": { bgcolor: "#1E293B" }, p: 1.5, fontWeight: "bold", borderRadius: 2 }}
        >
          Enroll Now
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetail;
