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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Modal style with responsive adjustments
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "75%", md: "60%" }, // Responsive width
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
  borderRadius: 2,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function Curriculum() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum`);
      setApiData(response.data.curriculum || []);
      setFilteredData(response.data.curriculum || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`);
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

      await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`, updatedData);
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

  const truncateText = (text, maxLength = isMobile ? 20 : isTablet ? 30 : 50) => {
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
      sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, bgcolor: "#E3F2FD", minHeight: "97vh" }}
    >
      <Toolbar />

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}
        >
          Curriculum Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addCurriculum")}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          Create
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
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
            "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "white" },
          }}
        />
      </Box>

      {/* Table Section (Responsive) */}
      {isMobile ? (
        // Mobile: Card layout
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Paper key={item._id} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Heading:</Typography>
                  {editUserId === item._id ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={editUserData.heading}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, heading: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.heading)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Sub Heading:</Typography>
                  {editUserId === item._id ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      maxRows={4}
                      variant="outlined"
                      value={editUserData.subHeading}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, subHeading: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.subHeading)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Key Points:</Typography>
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
                        setEditUserData({ ...editUserData, keyPoints: e.target.value })
                      }
                      size="small"
                    />
                  ) : Array.isArray(item.keyPoints) ? (
                    <Box>
                      {item.keyPoints.slice(0, 2).map((point, index) => (
                        <Typography key={index} variant="body2">
                          {truncateText(point)}
                        </Typography>
                      ))}
                      {item.keyPoints.length > 2 && (
                        <Typography variant="body2" color="textSecondary">
                          +{item.keyPoints.length - 2} more
                        </Typography>
                      )}
                    </Box>
                  ) : null}
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  {editUserId === item._id ? (
                    <>
                      <IconButton color="success" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton color="info" onClick={() => handleViewDetails(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleEditUser(item._id, item.heading, item.subHeading, item.keyPoints)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No curriculum items found
            </Typography>
          )}
        </Box>
      ) : (
        // Desktop/Tablet: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Heading</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Sub Heading</TableCell>
                <TableCell align="center" sx={{ color: "white", width: { sm: "35%", md: "30%" }, fontWeight: 700 }}>
                  Key Points
                </TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
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
                            setEditUserData({ ...editUserData, heading: e.target.value })
                          }
                          size="small"
                        />
                      ) : (
                        truncateText(item.heading)
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
                            setEditUserData({ ...editUserData, subHeading: e.target.value })
                          }
                          size="small"
                        />
                      ) : (
                        truncateText(item.subHeading, isTablet ? 30 : 40)
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
                            setEditUserData({ ...editUserData, keyPoints: e.target.value })
                          }
                          size="small"
                        />
                      ) : Array.isArray(item.keyPoints) ? (
                        <Box>
                          {item.keyPoints.slice(0, 2).map((point, index) => (
                            <Typography key={index} variant="body2">
                              {truncateText(point)}
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
                          <IconButton color="success" onClick={() => handleSave(item._id)}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancel}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton color="info" onClick={() => handleViewDetails(item)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleEditUser(item._id, item.heading, item.subHeading, item.keyPoints)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
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
      )}

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
                mb={2}
              >
                <Typography variant={isMobile ? "h6" : "h5"} component="h2">
                  Curriculum Details
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Heading:</Typography>
                <Typography variant="body1">{viewItem.heading}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Sub Heading:</Typography>
                <Typography variant="body1">{viewItem.subHeading}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Key Points:</Typography>
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