import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", email: "" });

  console.log(process.env.REACT_APP_CLOUDINARY_URL);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/users`
      );
      console.log(response)
      setApiData(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/users/${id}`);
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (id, name, email) => {
    setEditRowId(id);
    setEditedData({ name, email });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedData({ name: "", email: "" });
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/users/${id}`,
        editedData
      );
      setApiData((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? { ...item, name: editedData.name, email: editedData.email }
            : item
        )
      );
      setEditRowId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
    >
      <Toolbar />
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", padding: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#0D47A1",
            }}
          >
            User Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addUser")}
          >
            Create User
          </Button>
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600, width: "30%" }}
              >
                Full Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600, width: "30%" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600, width: "20%" }}
              >
                Role
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600, width: "20%" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id} hover>
                {/* Full Name Cell */}
                <TableCell align="center">
                  {editRowId === item._id ? (
                    <TextField
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>

                {/* Email Cell */}
                <TableCell align="center">
                  {editRowId === item._id ? (
                    <TextField
                      value={editedData.email}
                      onChange={(e) =>
                        setEditedData({ ...editedData, email: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    item.email
                  )}
                </TableCell>

                {/* Role Cell */}
                <TableCell align="center">
                  {item.source === "admin" ? "Admin" : "User"}
                </TableCell>

                {/* Actions Cell */}
                <TableCell align="center">
                  {editRowId === item._id ? (
                    <>
                      <IconButton
                        color="success"
                        onClick={() => handleSave(item._id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleEdit(item._id, item.name, item.email)
                        }
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


