import React from 'react';
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, Button } from '@mui/material';
import { School, EmojiEvents, Star, LocalLibrary } from '@mui/icons-material';

const courses = [
  {
    level: 'Level 1 (Beginner)',
    icon: <LocalLibrary fontSize="large" sx={{ color: '#1E88E5' }} />,
    outcome: 'Learn the fundamentals and rules of chess',
    topics: [
      'Chessboard and Pieces',
      'Basic Rules & Movement',
      'Check & Checkmate',
    ],
    gradient: 'linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)',
  },
  {
    level: 'Level 2 (Intermediate)',
    icon: <School fontSize="large" sx={{ color: '#43A047' }} />,
    outcome: 'Develop strategies and improve gameplay',
    topics: [
      'Basic Opening Strategies',
      'Middle Game Tactics',
      'Pawn Structures',
    ],
    gradient: 'linear-gradient(135deg, #4CAF50 30%, #66BB6A 90%)',
  },
  {
    level: 'Level 3 (Advance)',
    icon: <EmojiEvents fontSize="large" sx={{ color: '#FB8C00' }} />,
    outcome: 'Master advanced chess tactics and strategies',
    topics: [
      'Advanced Openings',
      'Positional Play',
      'Endgame Principles',
    ],
    gradient: 'linear-gradient(135deg, #FB8C00 30%, #FFA726 90%)',
  },
  {
    level: 'FIDE Rating Course (Expert)',
    icon: <Star fontSize="large" sx={{ color: '#D32F2F' }} />,
    outcome: 'Compete at the highest level with expert strategies',
    topics: [
      'Grandmaster Strategies',
      'Calculation & Visualization',
      'Tournament Preparation',
    ],
    gradient: 'linear-gradient(135deg, #E53935 30%, #F44336 90%)',
  },
];

const CurriculumPage = () => {
  const handleEnroll = (level) => {
    alert(`Enrolling in ${level}`);
    // You can navigate to a registration page or perform other actions here
  };

  return (
    <Box sx={{ padding: { xs: '2rem', md: '4rem' }, backgroundColor: '#F4F6F8' }}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ color: '#333' }}>
        Chess Curriculum
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: '#666', maxWidth: '700px', margin: 'auto' }}>
        Unlock your chess potential with our structured curriculum, guiding you from beginner to expert.
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3, background: course.gradient, color: '#fff' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {course.icon}
                  <Typography variant="h5" fontWeight="bold">
                    {course.level}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                  {course.outcome}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Key Topics:
                </Typography>
                <List>
                  {course.topics.map((topic, idx) => (
                    <ListItem key={idx} sx={{ padding: 0 }}>
                      <ListItemIcon sx={{ color: 'white' }}>✔</ListItemIcon>
                      <Typography variant="body2">{topic}</Typography>
                    </ListItem>
                  ))}
                </List>

                {/* Enroll Now Button */}
                <Box textAlign="center" sx={{ marginTop: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEnroll(course.level)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.4)' }
                    }}
                  >
                    Enroll Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CurriculumPage;
