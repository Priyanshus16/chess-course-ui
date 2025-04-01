import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import {
  Menu as MenuIcon,
  School,
  Article,
  ContactMail,
  Login,
  Logout,
  ExpandMore,
} from "@mui/icons-material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link, useNavigate } from "react-router-dom";
import { useCourses } from "../../context/courseContext";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { courses } = useCourses();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setActiveUser(true);
    } else {
      setActiveUser(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setActiveUser(false);
    navigate("/login");
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <AppBar position="sticky" sx={{ background: "#E3F2FD", minHeight: 60 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box
          sx={{ cursor: "pointer", width: "65px", padding: "5px 0", marginLeft:"30px" }} 
          onClick={() => navigate("/")}
        >
          <img
            src={require("../../Assets/Master Chess Classes Logo1.png.jpg")}
            width="100%"
            alt="logo"
          />
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Chess Coaching Dropdown */}
          <Button
            onClick={handleMenuOpen}
            sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
            endIcon={<ExpandMore />}
          >
            Chess Coaching
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation("/advanceCoaching")}>
              Advanced Chess Coaching
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/intermediateCoaching")}>
              Intermediate Chess Coaching
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/beginnerCoaching")}>
              Beginner Chess Coaching
            </MenuItem>
          </Menu>

          {courses.length > 0 && (
            <Button
              onClick={() => handleNavigation("/courses")}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<School />}
            >
              Courses
            </Button>
          )}

          <Button
            onClick={() => handleNavigation("/blog")}
            sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
            startIcon={<Article />}
          >
            Blog
          </Button>

          <Button
            onClick={() => handleNavigation("/contact")}
            sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
            startIcon={<ContactMail />}
          >
            Contact
          </Button>

          {courses.length > 0 && (
            <Button
              onClick={() => handleNavigation("/myCourses")}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<School />}
            >
              My Courses
            </Button>
          )}

          <Button
            onClick={() =>
              navigate('/store')
            }
            sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
            startIcon={<ContactMailIcon />}
          >
            Chess Store
          </Button>

          {/* Login or Logout */}
          {activeUser ? (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ background: "#1976D2", color: "#fff" }}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ background: "#1976D2", color: "#fff" }}
                startIcon={<Login />}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, padding: 2, display: "flex", flexDirection: "column", alignItems:"start", gap: 1 }}>
            {/* Chess Coaching Dropdown in Drawer */}
            <Button
              onClick={handleMenuOpen}
              sx={{
                color: "#1976D2",
                textTransform: "none",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
              endIcon={<ExpandMore />}
            >
              Chess Coaching
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigation("/advanceCoaching")}>
                Advanced Chess Coaching
              </MenuItem>
              <MenuItem
                onClick={() => handleNavigation("/intermediateCoaching")}
              >
                Intermediate Chess Coaching
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/beginnerCoaching")}>
                Beginner Chess Coaching
              </MenuItem>
            </Menu>

            {courses.length > 0 && (
            <Button
              onClick={() => handleNavigation("/courses")}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<School />}
            >
              Courses
            </Button>
          )}

            <Button
              onClick={() => handleNavigation("/blog")}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<Article />}
            >
              Blog
            </Button>

            <Button
              onClick={() =>
                window.open(
                  "https://shop.mychesslearning.com/?_gl=1%2A1rh8i1v%2A_gcl_au%2AMjEwNDA0NDc2Ny4xNzQyNzIwMzI1%2A_ga%2ANjcwODQyNjg2LjE3NDI3MjAzMjU.%2A_ga_5JJNDDZ5YZ%2AMTc0MjcyMDMyNC4xLjAuMTc0MjcyMDMyNC4wLjAuMA"
                )
              }
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<ContactMailIcon />}
            >
              Chess Store
            </Button>

            <Button
              onClick={() => handleNavigation("/contact")}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={<ContactMail />}
            >
              Contact
            </Button>

            <Button
              onClick={
                activeUser ? handleLogout : () => handleNavigation("/login")
              }
              variant="contained"
              fullWidth
              sx={{ background: "#1976D2", color: "#fff" }}
              startIcon={activeUser ? <Logout /> : <Login />}
            >
              {activeUser ? "Logout" : "Login"}
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
