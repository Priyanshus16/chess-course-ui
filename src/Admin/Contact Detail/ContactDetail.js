// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Toolbar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// export default function ContactDetail() {
//   const [apiData, setApiData] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editedData, setEditedData] = useState({
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail`
//       );
//       setApiData(response.data.contact);
//       console.log(response.data.contact, "Contact Data");
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setEditedData({
//       email: item.email,
//       phone: item.phone,
//       address: item.address,
//     });
//   };

//   const handleSave = async (id) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail/${id}`,
//         editedData
//       );
//       setApiData((prevData) =>
//         prevData.map((item) =>
//           item._id === id ? { ...item, ...editedData } : item
//         )
//       );
//       setEditId(null);
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditedData({ email: "", phone: "", address: "" });
//   };

//   const handleChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

//   const handleUserDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(
//           `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail/${id}`
//         );
//         setApiData((prevData) => prevData.filter((item) => item._id !== id));
//       } catch (error) {
//         console.error("Error deleting contact:", error);
//       }
//     }
//   };

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
//     >
//       <Toolbar />
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ marginBottom: "20px" }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 500,
//             color: "#0D47A1",
//           }}
//         >
//           Contact Detail Management
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/admin/addContactDetail")}
//         >
//           Create
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2" }}>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Email
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Phone
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Address
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {apiData.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <TextField
//                       name="email"
//                       value={editedData.email}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                   ) : (
//                     item.email
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <TextField
//                       name="phone"
//                       value={editedData.phone}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                   ) : (
//                     item.phone
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <TextField
//                       name="address"
//                       value={editedData.address}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                   ) : (
//                     item.address
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleSave(item._id)}
//                       >
//                         <SaveIcon />
//                       </IconButton>
//                       <IconButton color="secondary" onClick={handleCancel}>
//                         <CloseIcon />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(item)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleUserDelete(item._id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }



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
  useMediaQuery,
  useTheme,
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
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px–960px

  const [apiData, setApiData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/contactDetail`
      );
      setApiData(response.data.contact || []);
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
      Swal.fire("Success!", "Contact detail updated.", "success");
    } catch (error) {
      console.error("Error updating contact:", error);
      Swal.fire("Error!", "Failed to update contact detail.", "error");
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
        Swal.fire("Deleted!", "Contact detail has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting contact:", error);
        Swal.fire("Error!", "Failed to delete contact detail.", "error");
      }
    }
  };

  const truncateText = (text, maxLength = isMobile ? 20 : isTablet ? 30 : 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

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
          mb: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#0D47A1",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          }}
        >
          Contact Detail Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addContactDetail")}
        >
          Create
        </Button>
      </Box>

      {/* Content Display */}
      {isMobile ? (
        // Mobile: Card layout
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {apiData.length > 0 ? (
            apiData.map((item) => (
              <Paper key={item._id} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email:
                  </Typography>
                  {editId === item._id ? (
                    <TextField
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.email)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Phone:
                  </Typography>
                  {editId === item._id ? (
                    <TextField
                      name="phone"
                      value={editedData.phone}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.phone)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Address:
                  </Typography>
                  {editId === item._id ? (
                    <TextField
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.address)}</Typography>
                  )}
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  {editId === item._id ? (
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
                      <IconButton color="primary" onClick={() => handleEdit(item)}>
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
              No contact details found
            </Typography>
          )}
        </Box>
      ) : (
        // Tablet/Desktop: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                  Phone
                </TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                  Address
                </TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.length > 0 ? (
                apiData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="email"
                          value={editedData.email}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        truncateText(item.email)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="phone"
                          value={editedData.phone}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        truncateText(item.phone)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="address"
                          value={editedData.address}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                        />
                      ) : (
                        truncateText(item.address)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No contact details found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}