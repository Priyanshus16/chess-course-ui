import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Container } from "@mui/material";

const blogPosts = [
  {
    id: 1,
    title: "Mastering Chess Openings",
    excerpt: "Learn the key opening strategies to dominate your games from the very first move.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
  {
    id: 2,
    title: "Top 5 Chess Endgame Principles",
    excerpt: "Understand crucial endgame tactics to turn a balanced game into a decisive victory.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
  {
    id: 3,
    title: "How to Think Like a Grandmaster",
    excerpt: "Enhance your strategic mindset and make better moves with these grandmaster tips.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
];

const Blog = () => {
  return (
    <Container sx={{ py: 5, my:5 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" fontWeight={600} gutterBottom>
          Chess Insights & Strategies
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
          Stay updated with expert advice, tips, and strategies to enhance your chess skills and master the game.
        </Typography>
      </Box>

      {/* Blog Posts */}
      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {post.excerpt}
                </Typography>
                <Button variant="contained" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;