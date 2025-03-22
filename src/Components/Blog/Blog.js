import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [response, setResponse] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs`);
      setResponse(res.data?.blogs || []);
    } catch (error) {
      console.log(error, "problem while getting data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Chess Insights & Strategies
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth={600}
          mx="auto"
        >
          Stay updated with expert advice, tips, and strategies to enhance your
          chess skills and master the game.
        </Typography>
      </Box>

      {/* Blog Cards */}
      <Grid container spacing={4}>
        {response.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                height: "100%", // Ensures all cards have the same height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image || "/images/default-blog.jpg"}
                alt={post.title}
                sx={{ objectFit: "cover", p: 1 }}
              />
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Limits title to 2 lines
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.heading}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Limits description to 3 lines
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.description}
                </Typography>
                <Box sx={{ mt: "auto" }}>
                  <Button
                    onClick={() => {
                      if (post._id) {
                        navigate(`/blogs/${post._id}`, { state: post });
                      } else {
                        console.error("Invalid blog post ID");
                      }
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
