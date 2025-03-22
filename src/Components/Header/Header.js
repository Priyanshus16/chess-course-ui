import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  School,
  Info,
  Article,
  ContactMail,
  Login,
  Logout,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // console.log(storedUser);
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
  };

  return (
    <AppBar position="sticky" sx={{ background: "#E3F2FD", minHeight: 60 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            alignItems: "center",
            gap: 3,
          }}
        >
          {[
            { label: "Courses", icon: <School />, path: "/courses" },
            { label: "About", icon: <Info />, path: "/about" },
            { label: "Blog", icon: <Article />, path: "/blog" },
            { label: "Contact", icon: <ContactMail />, path: "/contact" },
            { label: "My Courses", icon: <School />, path: "/myCourses" },
          ].map(({ label, icon, path }) => (
            <Button
              key={label}
              onClick={() => handleNavigation(path)}
              sx={{ color: "#1976D2", textTransform: "none", fontSize: "1rem" }}
              startIcon={icon}
            >
              {label}
            </Button>
          ))}

          {/* Login or Username Display */}

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
            <Link
              to={activeUser ? "/profile" : "/login"}
              style={{ textDecoration: "none" }}
            >
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
          <Box sx={{ width: 250, padding: 2 }}>
            <List>
              {[
                { label: "Courses", icon: <School />, path: "/courses" },
                { label: "About", icon: <Info />, path: "/about" },
                { label: "Blog", icon: <Article />, path: "/blog" },
                { label: "Contact", icon: <ContactMail />, path: "/contact" },
              ].map(({ label, icon, path }) => (
                <ListItem
                  button
                  key={label}
                  onClick={() => handleNavigation(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}

              <ListItem>
                {activeUser ? (
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    fullWidth
                    sx={{ background: "#1976D2", color: "#fff" }}
                    startIcon={<Logout />}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    to={activeUser ? "/profile" : "/login"}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ background: "#1976D2", color: "#fff" }}
                      startIcon={<Login />}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
