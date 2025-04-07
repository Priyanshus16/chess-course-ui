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
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ContactDetail() {
  const [apiData, setApiData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail`
      );
      setApiData(response.data.contact);
      console.log(response.data.contact, "Contact Data");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditedData({
      email: item.email,
      phone: item.phone,
      address: item.address,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail/${id}`,
        editedData
      );
      setApiData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, ...editedData } : item
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedData({ email: "", phone: "", address: "" });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
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
        await axios.delete(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail/${id}`
        );
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
    >
      <Toolbar />
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
          Contact Detail Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addContactDetail")}
        >
          Create
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Phone
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Address
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">
                  {editId === item._id ? (
                    <TextField
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    item.email
                  )}
                </TableCell>
                <TableCell align="center">
                  {editId === item._id ? (
                    <TextField
                      name="phone"
                      value={editedData.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    item.phone
                  )}
                </TableCell>
                <TableCell align="center">
                  {editId === item._id ? (
                    <TextField
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    item.address
                  )}
                </TableCell>
                <TableCell align="center">
                  {editId === item._id ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleSave(item._id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleUserDelete(item._id)}
                      >
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
