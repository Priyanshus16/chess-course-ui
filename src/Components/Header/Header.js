import React, { useState } from "react";
import {
  Box,
  Typography,
  ListItemText,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  Instagram,
  YouTube,
  Menu as MenuIcon,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onCourseSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  // Handle Dropdown Menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  // Handle Course Selection
  const handleCourseSelect = (course) => {
    // onCourseSelect(course);
    // handleMenuClose();
    navigate("/Courses");
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        display: "flex",
        width: "100%",
        justifyContent: { xs: "center", md: "space-between" }, // Center logo on mobile, align on desktop
        height: "80px",
        zIndex: 10,
        position: "fixed",
        background: "#fff",
        transition: "0.3s ease-in-out",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "90%", height: "100%", position: "relative" }}
      >
        {/* Logo - Centered on Mobile */}
        <Box sx={{ width: "150px", cursor: "pointer", textAlign: "center" }}>
          <img
            src={require("../../Assets/my-chess.png")}
            width={"100%"}
            alt={"logo"}
            onClick={handleNavigate}
          />
        </Box>

        {/* Mobile Menu Icon - Positioned at Top Right */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <IconButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Navigation Menu */}
        <Box
          sx={{
            display: { xs: menuOpen ? "flex" : "none", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            width: { xs: "100%", md: "60%" },
            backgroundColor: { xs: "#fff", md: "transparent" },
            position: { xs: "absolute", md: "static" },
            top: { xs: "80px", md: "auto" },
            left: 0,
            zIndex: 10,
            padding: { xs: 2, md: 0 },
            boxShadow: { xs: "0px 5px 10px rgba(0, 0, 0, 0.1)", md: "none" },
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <ListItem
              button
              onClick={handleMenuClick}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              <ListItemText
                primary="Chess Coaching"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              />
              <ExpandMore />
            </ListItem>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleCourseSelect("beginner")}>
                Beginner Online Coaching
              </MenuItem>
              <MenuItem onClick={() => handleCourseSelect("intermediate")}>
                Intermediate Online Coaching
              </MenuItem>
              <MenuItem onClick={() => handleCourseSelect("advanced")}>
                Advanced Online Coaching
              </MenuItem>
            </Menu>

            {["About", "Blog", "Contact"].map((item, index) => (
              <Link
                to={`/${item}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  button
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      background: "#f5f5f5",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.replace(/([A-Z])/g, " $1").trim()}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#333",
                    }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
