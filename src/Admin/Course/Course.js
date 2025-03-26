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
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Course() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
  }, [apiData]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
      );
      setApiData(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
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
        await axios.delete(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`
        );
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
    >
      <Toolbar />

      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#0D47A1",
          }}
        >
          Course Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addCourses")}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          Create Course
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Curriculum
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Duration
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Level
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">
                  {item.curricullum.map((point, index) => (
                    <Typography key={index} variant="body2">
                      {point}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.courseLevel}</TableCell>
                <TableCell align="center">
                  <img
                    style={{ width: "60px", borderRadius: "5px" }}
                    src={item.image}
                    alt="Course"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCourse(item._id)}
                  >
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
