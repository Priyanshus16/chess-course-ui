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
  Select,
  MenuItem,
  Modal,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Users() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", email: "" });
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewUser, setViewUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/users`
      );
      setApiData(response.data.users || []);
      setFilteredData(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Search and filter functionality
  useEffect(() => {
    let result = apiData;
    
    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((item) =>
        roleFilter === "admin"
          ? item.source === "admin"
          : item.source !== "admin"
      );
    }
    
    // Apply search term
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredData(result);
  }, [searchTerm, roleFilter, apiData]);

  const handleUserDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/users/${id}`
        );
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
        getData();
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
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
      await axios.put(
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
      Swal.fire("Updated!", "User has been updated.", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error!", "Failed to update user.", "error");
    }
  };

  const handleViewDetails = (user) => {
    setViewUser(user);
    setOpenModal(true);
  };

  const truncateText = (text, maxLength = 25) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh" }}
    >
      <Toolbar />
      
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
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
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addAdmin")}
          >
            Create Admin
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addUser")}
          >
            Create User
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              backgroundColor: "white",
            },
          }}
        />
        
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="admin">Admins</MenuItem>
          <MenuItem value="user">Regular Users</MenuItem>
        </Select>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                Full Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
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
                        fullWidth
                      />
                    ) : (
                      truncateText(item.name, 25)
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
                        fullWidth
                      />
                    ) : (
                      truncateText(item.email, 25)
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
                          color="info"
                          onClick={() => handleViewDetails(item)}
                        >
                          <VisibilityIcon />
                        </IconButton>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View User Details Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="user-details-modal"
        aria-describedby="view-user-details"
      >
        <Box sx={modalStyle}>
          {viewUser && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5" component="h2">
                  User Details
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Full Name:
                </Typography>
                <Typography variant="body1">{viewUser.name}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email:
                </Typography>
                <Typography variant="body1">{viewUser.email}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Role:
                </Typography>
                <Typography variant="body1">
                  {viewUser.source === "admin" ? "Admin" : "Regular User"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  User ID:
                </Typography>
                <Typography variant="body1">{viewUser._id}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}