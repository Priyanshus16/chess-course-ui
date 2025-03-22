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
import { Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Curriculum() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
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

  useEffect(() => {
    getData();
  }, []);

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
            {apiData.map((item) => (
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
                    item.heading
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
                    item.subHeading
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
                          keyPoints: e.target.value, // Store as string while editing
                        })
                      }
                    />
                  ) : Array.isArray(item.keyPoints) ? (
                    item.keyPoints.map((point, index) => (
                      <Typography key={index} variant="body2">
                        {point}
                      </Typography>
                    ))
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
