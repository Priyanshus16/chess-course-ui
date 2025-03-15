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
} from "@mui/material";
import { Button } from "@mui/material";

//icons
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { resolvePath, useNavigate } from "react-router-dom";


export default function Users() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const ADMIN_API_PREFIX = '/api/v1/admin'

  const getData = async() => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/users`);
    setApiData(response.data.users);
  }

  const handleUserDelete = async(id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/users/${id}`)
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
      console.log(response)
    } catch (error) {
      
    }
  } 

  useEffect(() => {
    getData()
  },[])


  
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontSize: "20px", color: "#6945FF", textAlign: "center" }}
        >
          User Program
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* // first Row */}
            
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={16}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "0em",
                    textAlign: "center",
                  }}
                >
                  User Management
                </TableCell>
              </TableRow>
            </TableHead>
            

            {/* // Thrid row */}
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Full Name
                </TableCell>
                
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Password
                </TableCell>
                
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
                
            <TableBody>
              {
                apiData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.password}</TableCell>
                    <TableCell align="center"><Button onClick={ () => handleUserDelete(item._id)}>Delete</Button></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>

          </Table>
        </TableContainer>
      

        {/* <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your will not be able to recover this imaginary file!
            </DialogContentText>

          </DialogContent>
        </Dialog> */}
      </Box>
    </>
  );
}
