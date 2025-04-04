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
  Modal,
  InputAdornment,
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function Curriculum() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editUserData, setEditUserData] = useState({
    heading: "",
    subHeading: "",
    keyPoints: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum`
      );
      setApiData(response.data.curriculum || []);
      setFilteredData(response.data.curriculum || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(apiData);
    } else {
      const filtered = apiData.filter(
        (item) =>
          item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subHeading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(item.keyPoints) &&
            item.keyPoints.some((point) =>
              point.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, apiData]);

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
      getData();
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  };

  const handleEditUser = (id, heading, subHeading, keyPoints) => {
    setEditUserId(id);
    setEditUserData({ heading, subHeading, keyPoints });
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditUserData({ heading: "", subHeading: "", keyPoints: "" });
  };

  const handleSave = async (id) => {
    try {
      const updatedData = {
        ...editUserData,
        keyPoints: Array.isArray(editUserData.keyPoints)
          ? editUserData.keyPoints
          : editUserData.keyPoints.split("\n").map((point) => point.trim()),
      };

      await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`,
        updatedData
      );

      getData();
      setEditUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleViewDetails = (item) => {
    setViewItem(item);
    setOpenModal(true);
  };

  const truncateText = (text, maxLength = 50) => {
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
          Curriculum Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addCurriculum")}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          Create
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by heading, subheading or key points..."
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
              borderRadius: 2,
              backgroundColor: "white",
            },
          }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Heading
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                SubHeading
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", width: "30%", fontWeight: 700 }}
              >
                Key Points
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
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">
                    {editUserId === item._id ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={editUserData.heading}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            heading: e.target.value,
                          })
                        }
                        sx={{ minHeight: "40px", padding: "8px" }}
                      />
                    ) : (
                      truncateText(item.heading, 30)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editUserId === item._id ? (
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        variant="outlined"
                        value={editUserData.subHeading}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            subHeading: e.target.value,
                          })
                        }
                      />
                    ) : (
                      truncateText(item.subHeading, 40)
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {editUserId === item._id ? (
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={5}
                        variant="outlined"
                        value={
                          Array.isArray(editUserData.keyPoints)
                            ? editUserData.keyPoints.join("\n")
                            : editUserData.keyPoints
                        }
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            keyPoints: e.target.value,
                          })
                        }
                      />
                    ) : Array.isArray(item.keyPoints) ? (
                      <Box>
                        {item.keyPoints.slice(0, 2).map((point, index) => (
                          <Typography key={index} variant="body2">
                            {truncateText(point, 50)}
                          </Typography>
                        ))}
                        {item.keyPoints.length > 2 && (
                          <Typography variant="body2" color="textSecondary">
                            +{item.keyPoints.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">
                    {editUserId === item._id ? (
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
                            handleEditUser(
                              item._id,
                              item.heading,
                              item.subHeading,
                              item.keyPoints
                            )
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
                    No curriculum items found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="view-curriculum-modal"
        aria-describedby="view-curriculum-details"
      >
        <Box sx={modalStyle}>
          {viewItem && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5" component="h2">
                  Curriculum Details
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Heading:
                </Typography>
                <Typography variant="body1">{viewItem.heading}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Sub Heading:
                </Typography>
                <Typography variant="body1">{viewItem.subHeading}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Key Points:
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  {Array.isArray(viewItem.keyPoints) &&
                    viewItem.keyPoints.map((point, index) => (
                      <li key={index}>
                        <Typography variant="body1">{point}</Typography>
                      </li>
                    ))}
                </ul>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
