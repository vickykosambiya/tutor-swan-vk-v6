import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import logo from '../assets/Tutor-Swan.png';
import Login from '../pages/Landing/Login';


const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is small or below
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [loginOpen, setLoginOpen] = useState(false);


    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { label: "About Us", path: "/aboutus" },
        { label: "Contact Us", path: "/contactus" },
        { label: "Pricing", path: "/pricing" },
        { label: "Blogs", path: "/blogs" },
    ];

    const drawerContent = (
        <Box sx={{ width: 250, bgcolor: grey[100], height: '100%' }}>
            <List sx={{
                margin: '50px 35px',
                color: theme.palette.primary.main,
                font: 'bold',
            }}>
                {menuItems.map((item) => (
                    <ListItem button key={item.label} component={Link} to={item.path}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position='static' sx={{ width: '100%' }}>
            <Toolbar sx={{ backgroundColor: grey[100], display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/">
                    <Box component="img" src={logo} alt="Logo" sx={{ height: "5vh" }} />
                </Link>
                {isMobile ? (
                    <>
                        <Button
                            variant='contained'
                            sx={{ marginLeft: '150px', color: theme.palette.secondary.main, }}
                            onClick={handleLoginOpen}
                        >
                            Login
                        </Button>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}

                            sx={{ marginLeft: '15px', color: theme.palette.primary.main, mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={handleDrawerToggle}

                        >
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            display: 'flex', justifyItems: 'space-between', marginRight: {
                                md: '150px', lg: '230px', xl: '70vh', xxl: '150px'
                            }
                        }}>
                            {menuItems.filter(item => item.label !== 'Signup').map((item) => (
                                <Button key={item.label} component={Link} to={item.path} sx={{ color: theme.palette.primary.main, margin: '0 10px' }}>
                                    <Typography variant='h6' sx={{ color: theme.palette.primary.main, font: 'bold' }}>
                                        {item.label}
                                    </Typography>
                                </Button>
                            ))}
                        </Box>
                        <Button variant='contained' onClick={handleLoginOpen} component={Link} sx={{ color: theme.palette.secondary.main, justifyContent: 'flex-end', margin: '0 30px' }}>
                            Login
                        </Button>
                    </Box>
                )}

            </Toolbar>
            <Login open={loginOpen} handleClose={handleLoginClose} />
        </AppBar >
    );
};

export default Navbar;
