import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TestimonialImage() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage`);
      console.log(response)
      setApiData(response.data.testimonialImage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUserDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage/${id}`);
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) { 
        console.error("Error deleting blog:", error);
      }
    }
  };


  return (
    <Box component="main" sx={{ width: "100%", flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "100vh", overflow: "auto" }}>

      <Toolbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}>
          Testimonial Image Management
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/admin/addTestimonialImage")}>
          Create
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white",  fontWeight: 700 }}>Full Name</TableCell>
              <TableCell align="center" sx={{ color: "white",fontWeight: 700 }}>Image</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">
                    {item.name}
                </TableCell>
                <TableCell align="center">
                  <img src={item.image} alt={item.heading} style={{ width: "70px", height: "70px" }} />
                </TableCell>
                <TableCell align="center">
                      <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                      
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}