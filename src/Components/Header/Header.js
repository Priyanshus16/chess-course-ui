import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  // Open/Close Dropdown Menu
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Toggle Mobile Drawer
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleNavigation = (path) => {
    window.scrollTo(0, 0); // Scroll to top before navigating
    navigate(path);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box
          sx={{ cursor: "pointer", width: "150px" }}
          onClick={() => navigate("/")}
        >
          <img
            src={require("../../Assets/my-chess.png")}
            width="100%"
            alt="logo"
          />
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Chess Coaching Dropdown */}
          {/* <Box sx={{ position: "relative" }}>
            <Button
              onClick={handleMenuClick}
              endIcon={<ExpandMore />}
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#333",
                textTransform: "none",
              }}
            >
              Chess Coaching
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate("/Courses/beginner")}>
                Beginner Online Coaching
              </MenuItem>
              <MenuItem onClick={() => navigate("/Courses/intermediate")}>
                Intermediate Online Coaching
              </MenuItem>
              <MenuItem onClick={() => navigate("/Courses/advanced")}>
                Advanced Online Coaching
              </MenuItem>
            </Menu>
          </Box> */}

          {["Courses","About", "Blog", "Contact"].map((item, index) => (
            <Button
              key={index}
              onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#333",
                textTransform: "none",
              }}
            >
              {item}
            </Button>
          ))}

          {/* Login/Register */}
          <Link to="/login">
            <Button
              variant="contained"
              sx={{ background: "#1976D2", color: "#fff", borderRadius: "8px" }}
            >
              Login/Register
            </Button>
          </Link>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, padding: 2 }}>
            <List>
              <ListItem button onClick={handleMenuClick}>
                <ListItemText primary="Chess Coaching" />
                <ExpandMore />
              </ListItem>

              {["About", "Blog", "Contact"].map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}

              <ListItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ background: "#1976D2", color: "#fff" }}
                  >
                    Login/Register
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;