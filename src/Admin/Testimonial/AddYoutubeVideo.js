import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const AddCurriculum = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    youtubeVideo:""
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

    if(!formData.heading || !formData.subHeading || !formData.keyPoints) {
      return Swal.fire('Please fill all fields')
    }

    try {
        
        const formattedData = {
            ...formData,
            keyPoints: formData.keyPoints.split("\n").filter((point) => point.trim() !== ""),
        }

        console.log(formattedData);
    
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addCurriculum`,
        formattedData
      );
      console.log(res)
      navigate('/curriculum')
    } catch (error) {
      console.error(error, "error while sending data");
    }
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Curriculum
        </Typography>

        <form>
          <TextField
            label="Curriculum Heading"
            fullWidth
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Curriculum Subheading"
            type="achievement"
            fullWidth
            name="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Key Points"
            multiline
            rows={5}
            name="keyPoints"
            value={formData.keyPoints}
            type="description"
            placeholder="write points like this -
            Chessboard and Pieces
            Basic Rules & Movement"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />

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

export default AddCurriculum;
