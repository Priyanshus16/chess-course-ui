import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddCourses = () => {
  const navigate = useNavigate();

  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    image: null,
    courseLevel: "beginner",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      console.log(formData);

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "chess-course");
        imageData.append("folder", "courses");

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const finalData = {
        ...formData,
        image: imageUrl,
      };

      if (
        !finalData.title ||
        !finalData.duration ||
        !finalData.price ||
        !finalData.description 
        // !finalData.image
      ) {
        return alert("please provide all fields");
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addCourses`,
        finalData
      );
      console.log(res);
      navigate("/admin/course");
    } catch (error) {
      console.error(error, "error while sending data");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
    alert("image upload successfully");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Courses
        </Typography>

        <form>
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Description"
            type="description"
            fullWidth
            multiline
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Duration"
            name="duration"
            value={formData.duration}
            type="duration"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Price"
            type="price"
            fullWidth
            name="price"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
          />

          <InputLabel sx={{ width: "100%" }}>Course Level</InputLabel>
          <Select
            sx={{ width: "60%" }}
            name="courseLevel"
            value={formData.courseLevel}
            onChange={handleChange}
            label="Course Level"
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advance">Advance</MenuItem>
          </Select>

          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
            <Button variant="contained" component="label">
              Upload Image
              <input onChange={handleFileChange} type="file" hidden />
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddCourses;
