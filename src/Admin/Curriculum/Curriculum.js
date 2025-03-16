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

export default function Curriculum() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const ADMIN_API_PREFIX = '/api/v1/admin'

  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum`); 
    setApiData(response.data.curriculum);
  };

  const handleUserDelete = async (id) => {
    try {
        console.log(id)
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/curriculum/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
      console.log(response);
    } catch (error) {
        console.log(error,'error while api call')
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
      >
        <Toolbar />
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
                  Curriculum Management
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
                  Heading
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
                  SubHeading
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
                  Key Points
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {apiData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.heading}</TableCell>
                  <TableCell align="center">{item.subHeading}</TableCell>
                  <TableCell align="center">
                    {item.keyPoints.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleUserDelete(item._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
