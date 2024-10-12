import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GradeIcon from '@mui/icons-material/Grade';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme';
import { red } from '@mui/material/colors';

const TeacherSidebar = ({ tokenUsed }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    console.log(tokenUsed);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawer = (
        <Box
            sx={{ height: '100vh', backgroundColor: theme.palette.primary.main, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: 3 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography variant='h4' fontWeight='bold' color={theme.palette.secondary.main} sx={{ marginBottom: 10 }}>
                Dashboard
            </Typography>
            <Button startIcon={<CreateNewFolderIcon />} sx={{ width: '100%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/teacher')}>
                <Typography variant='body1' fontWeight='bold'>
                    Paper Pattern
                </Typography>
            </Button>
            <Button startIcon={<FactCheckIcon />} sx={{ width: '100%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/paper-correction')}>
                <Typography variant='body1' fontWeight='bold'>
                    Paper Correction
                </Typography>
            </Button>
            <Button startIcon={<FactCheckIcon />} sx={{ width: '100%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/paper-correction')}>
                <Typography variant='body1' fontWeight='bold'>
                    No of Tokens Used: {tokenUsed}
                </Typography>
            </Button>
            <Button startIcon={<GradeIcon />} sx={{ width: '100%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 10 }} onClick={() => navigate('/teacher-result')}>
                <Typography variant='body1' fontWeight='bold'>
                    Results
                </Typography>
            </Button>
            <Button startIcon={<LogoutIcon />} sx={{ width: '100%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: red[500] } }} onClick={handleLogout}>
                <Typography variant='body1' fontWeight='bold'>
                    Logout
                </Typography>
            </Button>
        </Box>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.primary.main, display: { xs: 'block', sm: 'none' } }}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
            <Grid container>
                <Grid item xs={8} sm={12} sx={{ display: { xs: 'none', md: 'block' }, height: '100vh', width: '100%', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, }}>
                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: 3 }} >
                        <Typography variant='h4' fontWeight='bold' color={theme.palette.secondary.main} sx={{ marginBottom: 20 }}>
                            Dashboard
                        </Typography>
                        <Button startIcon={<CreateNewFolderIcon />} sx={{ width: '70%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/teacher')}>
                            <Typography variant='body1' fontWeight='bold'>
                                Paper Pattern
                            </Typography>
                        </Button>
                        <Button startIcon={<FactCheckIcon />} sx={{ width: '70%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/paper-correction  ')}>
                            <Typography variant='body1' fontWeight='bold'>
                                Paper Correction
                            </Typography>
                        </Button>
                        <Button startIcon={<FactCheckIcon />} sx={{ width: '70%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 6 }} onClick={() => navigate('/paper-correction  ')}>
                            <Typography variant='body1' fontWeight='bold'>
                                No of Tokens Used: {tokenUsed}
                            </Typography>
                        </Button>
                        <Button startIcon={<GradeIcon />} sx={{ width: '70%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.secondary.light }, marginBottom: 30 }} onClick={() => navigate('/teacher-result')}>
                            <Typography variant='body1' fontWeight='bold'>
                                Results
                            </Typography>
                        </Button>
                        <Button startIcon={<LogoutIcon />} sx={{ width: '70%', height: '60px', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: red[500] } }} onClick={handleLogout}>
                            <Typography variant='body1' fontWeight='bold'>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Grid>
            </Grid>
        </div>
    );

};

export default TeacherSidebar;
