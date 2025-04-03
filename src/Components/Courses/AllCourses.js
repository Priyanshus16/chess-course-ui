import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CardMedia,
  TextField,
  MenuItem,
  Container,
  Chip,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCourses } from "../../context/courseContext";
import { useNavigate } from "react-router-dom";
import About from "../About/About";

const AllCourses = () => {
  const { courses } = useCourses();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const theme = useTheme();

  const coursesRef = useRef(null);
  const aboutRef = useRef(null);

  const handleStartLearning = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMeetInstructor = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (id) => {
    navigate(`/courseDetail`, {
      state: courses.find((course) => course._id === id),
    });
    window.scrollTo(0, 0);
  };

  const filteredCourses = courses.filter((course) => {
    return (
      (filterType === "all" || 
       (filterType === "free" && course.price === "0") || 
       (filterType === "paid" && course.price > 0)) &&
       (filterLevel === "all" || course.courseLevel === filterLevel) &&
       course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const displayedCourses = showAllCourses 
    ? filteredCourses 
    : filteredCourses.slice(0, 6);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        color: theme.palette.text.primary,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        pb: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: { xs: "400px", md: "500px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), " +
              "url(/images/chess-banner-light.jpg) center/cover no-repeat",
            filter: "brightness(0.9)",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4rem" },
              lineHeight: 1.2,
              color: "common.white",
              mb: 3,
              fontFamily: '"Montserrat", sans-serif',
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Chess Mastery Awaits
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "1.1rem", md: "2.0rem" },
              color: "rgba(255,255,255,0.9)",
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            From Beginner to Grandmaster
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStartLearning}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "50px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Learning
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleMeetInstructor}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "50px",
                color: "common.white",
                borderColor: "common.white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "common.white",
                },
              }}
            >
              Meet Our Instructor
            </Button>
          </Box>
        </Container>

        {/* Decorative chess piece */}
        <Box
          sx={{
            position: "absolute",
            right: { xs: "-50px", md: "50px" },
            bottom: "-50px",
            width: "200px",
            height: "200px",
            backgroundImage: "url(/images/chess-king-white.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
            zIndex: 2,
            transform: "rotate(15deg)",
          }}
        />
      </Box>

      {/* Search & Filters */}
      <div ref={coursesRef}>  
      <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, md: 3 },
      borderRadius: 2,
      background: theme.palette.background.paper,
      mb: 4,
    }}
  >
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      {/* Search Bar */}
      <TextField
        label="Search Courses"
        variant="outlined"
        sx={{ 
          width: { xs: "100%", sm: "45%", md: "40%" },
          minWidth: { xs: "unset", sm: 200 }
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon 
              sx={{ 
                color: theme.palette.action.active, 
                mr: 1,
                fontSize: { xs: "1.25rem", sm: "1.5rem" }
              }} 
            />
          ),
        }}
        size="small"
      />

      {/* Filter Dropdowns */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        <TextField
          select
          label="Course Type"
          variant="outlined"
          sx={{ 
            minWidth: { xs: "100%", sm: 180 },
            "& .MuiSelect-select": {
              py: { xs: 1, sm: 1.25 }
            }
          }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Courses</MenuItem>
          <MenuItem value="free">Free Courses</MenuItem>
          <MenuItem value="paid">Paid Courses</MenuItem>
        </TextField>

        <TextField
          select
          label="Skill Level"
          variant="outlined"
          sx={{ 
            minWidth: { xs: "100%", sm: 180 },
            "& .MuiSelect-select": {
              py: { xs: 1, sm: 1.25 }
            }
          }}
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Levels</MenuItem>
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advance">Advanced</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  </Paper>
</Container>

        {/* Available Courses */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: theme.palette.text.primary,
            mb: 4,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "80px",
              height: "4px",
              background: theme.palette.primary.main,
              borderRadius: 2,
            },
          }}
        >
          Available Courses
          <Chip
            label={`${filteredCourses.length} courses`}
            size="small"
            sx={{ ml: 2 }}
            color="primary"
          />
        </Typography>

        {filteredCourses.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No courses found matching your criteria
            </Typography>
          </Paper>
        ) : (
          <>
            <Grid container spacing={4}>
              {displayedCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={course.image}
                        alt={course.title}
                        sx={{
                          objectFit: "cover",
                          borderTopLeftRadius: "inherit",
                          borderTopRightRadius: "inherit",
                        }}
                      />
                      {course.isNew && (
                        <Chip
                          label="New"
                          color="primary"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {course.description.length > 100
                          ? `${course.description.substring(0, 100)}...`
                          : course.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={course.courseLevel}
                          size="small"
                          color={getLevelColor(course.courseLevel)}
                        />
                        <Chip
                          label={`${course.duration} hrs`}
                          size="small"
                          variant="outlined"
                        />
                        {course.price > 0 && (
                          <Chip
                            label="Premium"
                            size="small"
                            color="secondary"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleNavigate(course._id)}
                        sx={{
                          py: 1.5,
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "1rem",
                        }}
                      >
                        View Course
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {filteredCourses.length > 6 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setShowAllCourses(!showAllCourses)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: '50px',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px'
                    }
                  }}
                >
                  {showAllCourses ? 'Show Less' : 'See All Courses'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
      </div>

      {/* Instructor Section */}
      <div ref={aboutRef}>
        <About />
      </div>
    </Box>
  );
};

export default AllCourses;