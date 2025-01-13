import React from 'react';
import { Box, Typography, ListItemText, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Instagram, YouTube, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Box sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", display: 'flex', width: "100%", justifyContent: "center", height: "70px", zIndex: 1, position: "fixed", background: "#fff" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "90%", height: "100%" }}>
          <Box sx={{ width: '15%', height: "100%" }}> 
            <img src={require('../../Assets/my-chess.png')} width={'100%'} height={'100%'} alt={"logo"} />
          </Box>
          {/* Menu Icon for Mobile */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <Menu />
            </IconButton>
          </Box>
          {/* Navigation Menu */}
          <Box sx={{ display: { xs: menuOpen ? 'block' : 'none', md: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', width: { xs: '100%', md: '60%' }, backgroundColor: { xs: '#fff', md: 'transparent' }, position: { xs: 'absolute', md: 'static' }, top: { xs: '70px', md: 'auto' }, left: 0, zIndex: 2, padding: { xs: 2, md: 0 } }}>
            <List sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <ListItem button>
                <ListItemText
                  primary="View Courses"
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="About Us"
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Chess Blogs"
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Contact Us"
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Chess Store"
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
            </List>
          </Box>
          {/* Login/Register and Social Icons */}
          <Box sx={{ width: { xs: 'auto', md: '25%' }, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Link to={'/login'}>            
          <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, marginRight: 2 }}>
            Login/Register
            </Typography>
            </Link>
            <IconButton>
              <Instagram />
            </IconButton>
            <IconButton>
              <YouTube />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
