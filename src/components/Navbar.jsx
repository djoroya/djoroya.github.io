import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'rgb(1, 1, 1)' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            djoroya
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              Blog
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
              About
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
