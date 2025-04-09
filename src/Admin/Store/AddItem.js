import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Title, Description, CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddItem = () => {
  const navigate = useNavigate();
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;
  const cloudinary_URL = process.env.REACT_APP_CLOUDINARY_URL;

  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    price: "",
    category: "",
    link:"",
    shortDescription:"",
    image: null,
    imagePreview: null,
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

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "chess-course");
        imageData.append("folder", "Store");

        const cloudinaryRes = await axios.post(
          `${cloudinary_URL}/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const finalData = {
        ...formData,
        image: imageUrl,
      };

      if (
        !finalData.heading ||
        !finalData.description ||
        !finalData.image ||
        !finalData.category ||
        !finalData.price ||
        !finalData.link
      ) {
        return Swal.fire("Please provide all fields.");
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addItem`,
        finalData
      );
      navigate("/admin/store");
    } catch (error) {
      console.error(error, "Error while sending data");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: "#F8FAFC", // Light background
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "600", color: "#1E3A8A" }}
        >
          Add Item
        </Typography>

        <form>
          {/* Heading */}
          <TextField
            label="Heading"
            fullWidth
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Price */}
          <TextField
            label="ProductPrice"
            fullWidth
            name="price"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* category */}
          <TextField
            label="Category"
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* category */}

          <TextField
            label="Product Link"
            fullWidth
            name="link"
            value={formData.link}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Short Description */}
          <TextField
            label="Short Description"
            multiline
            rows={4}
            name="shortDescription"
            value={formData.shortDescription}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={4}
            name="description"
            value={formData.description}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Image Upload */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              padding: "30px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "#F8FAFC",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative", // Add this
            }}
          >
            {/* Wrap the input inside a label */}
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <CloudUpload sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography sx={{ fontSize: 16, fontWeight: "bold", mt: 1 }}>
                Drop a file here or click to upload
              </Typography>
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({
                    ...formData,
                    image: file,
                    imagePreview: URL.createObjectURL(file),
                  });
                }
                Swal.fire("Image uploaded successfully!");
              }}
              style={{
                display: "none", // Hide input completely
              }}
            />
          </Box>

          {formData.imagePreview && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Avatar
                src={formData.imagePreview}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  border: "2px solid #ccc",
                }}
              />
              <Typography variant="body2" sx={{ color: "#666" }}>
                {formData.imageName}
              </Typography>
            </Box>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 3,
              bgcolor: "#0F172A",
              "&:hover": { bgcolor: "#1E293B" },
              color: "white",
              fontWeight: "bold",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            Submit Item
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddItem;
