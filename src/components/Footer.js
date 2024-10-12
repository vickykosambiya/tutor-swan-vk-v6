import React from 'react';
import logo from '../assets/Tutor-Swan.png';
import { Grid, Typography, Box } from '@mui/material';
import theme from '../theme';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            width: '100%',
            margin: 0,
            padding: 0,
        }}>
            <Grid container spacing={2} sx={{
                display: { xs: 'block', sm: 'block', md: 'flex' },
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                padding: '20px',
                margin: 0,
                width: '100%',
            }}>
                <Grid item md={4} xs={12} >
                    {/* Box1 */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to="/">
                            <Box component="img" src={logo} alt="Logo" sx={{ margin: '0 10px', height: "5vh", marginRight: '1rem' }} />
                        </Link>
                        <Typography variant='h4' sx={{ color: theme.palette.secondary.main, fontSize: '1.5rem' }}>
                            Tutor-Swan
                        </Typography>
                    </Box>

                </Grid>
                <Grid item md={4} xs={12}>
                    {/* Box2 */}
                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'block' }}>
                        <Link to="/aboutus" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                                About Us
                            </Typography>
                        </Link>
                        <Link to="/pricing" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                                Pricing
                            </Typography>
                        </Link>
                        <Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                                Blogs
                            </Typography>
                        </Link>
                    </Box>

                </Grid>
                <Grid item md={4} xs={12}>
                    {/* Box3 */}
                    <Box sx={{ height: 'auto', }}>
                        <Typography variant='h6' sx={{ fontSize: '1.2rem' }}>
                            Address:
                        </Typography>
                        <Typography>
                            Borivali-east, Mumbai, Maharashtra, India.
                        </Typography>
                    </Box>
                </Grid>

                {/* Second row with one box below the 3 */}
                <Grid item xs={12} sx={{ marginTop: "50px" }} >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <InstagramIcon variant='filled' sx={{ color: theme.palette.secondary.main, margin: '0 30px' }} />
                        <EmailIcon variant='filled' sx={{ color: theme.palette.secondary.main, margin: '0 30px' }} />
                        <LinkedInIcon variant='filled' sx={{ color: theme.palette.secondary.main, margin: '0 30px' }} /></Box>
                </Grid>
            </Grid>
            <Typography variant="body2" align="center" sx={{ paddingBottom: '10px' }}>
                © {new Date().getFullYear()} Tutor-Swan. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer;
