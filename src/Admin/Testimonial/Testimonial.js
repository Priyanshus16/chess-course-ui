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
  TextField,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, Edit as EditIcon, Cancel as CancelIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Testimonial() {
  const [apiData, setApiData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const navigate = useNavigate();

  // Fetch testimonials
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials`
      );
      setApiData(response.data.testimonials);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle edit button click
  const handleEdit = (item) => {
    setEditRow(item._id);
    setEditedData({ ...item });
  };

  // Handle input change in edit mode
  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Save edited data
  const handleSave = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials/${id}`,
        editedData
      );
      setApiData((prevData) =>
        prevData.map((item) => (item._id === id ? editedData : item))
      );
      setEditRow(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditRow(null);
  };

  // Delete testimonial
  const handleUserDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
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
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}
        >
          Testimonial Management
        </Typography>
        <Button
        onClick={() => navigate("/admin/addtestimonials")}
         variant="contained" color="primary" startIcon={<AddIcon />}>
          Create
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Full Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Achievement</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Description</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Course</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Image</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id}>
                {/* Full Name */}
                <TableCell align="center">
                  {editRow === item._id ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedData.name}
                      onChange={(e) => handleChange(e, "name")}
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>

                {/* Achievement */}
                <TableCell align="center">
                  {editRow === item._id ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedData.achievement}
                      onChange={(e) => handleChange(e, "achievement")}
                    />
                  ) : (
                    item.achievement
                  )}
                </TableCell>

                {/* Description */}
                <TableCell align="center">
                  {editRow === item._id ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedData.description}
                      onChange={(e) => handleChange(e, "description")}
                      multiline
                      rows={2}
                    />
                  ) : (
                    item.description
                  )}
                </TableCell>

                {/* Course */}
                <TableCell align="center">
                  {editRow === item._id ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedData.course}
                      onChange={(e) => handleChange(e, "course")}
                    />
                  ) : (
                    item.course
                )}
                </TableCell>

                {/* Image */}
                <TableCell align="center">
                  <img
                    style={{ width: "60px", borderRadius: "5px" }}
                    src={item.image || "/default-placeholder.jpg"}
                    alt={item.name || "No Image"}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  {editRow === item._id ? (
                    <>
                      <IconButton color="success" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
