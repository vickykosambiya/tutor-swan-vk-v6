import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import homeTeacherImage from '../../assets/home-teacher.jpg';
import { Button, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Easy from '../../assets/Easy.json';
import Fast from '../../assets/Fast.json';
import TrackResult from '../../assets/TrackResults.json';
import Lottie from 'lottie-react';
import Footer from '../../components/Footer.js';

const Home = () => {
    const theme = useTheme();

    return (
        <div className='homePage'>
            <Navbar />
            <Grid container sx={{
                padding: theme.spacing(2),
            }}>
                {/* Text Content */}
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    margin: '30px 0px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' }, // Center text on mobile, left on larger
                    textAlign: { xs: 'center', md: 'left' },
                    paddingRight: { md: theme.spacing(4) } // Add spacing between text and image on larger screens
                }}>
                    <Typography variant="h4" sx={{
                        fontSize: '2rem',
                        md: 2,
                        marginBottom: 2,
                        color: theme.palette.primary.main,
                    }}>
                        Welcome to Tutor-Swan
                    </Typography>
                    <Typography variant="h3" sx={{
                        font: 'bold',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        mb: 3,
                        lineHeight: 1.2 // Improve readability
                    }}>
                        Revolutionizing grading with AI
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/signup"
                        sx={{
                            color: theme.palette.secondary.main,
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                            marginTop: 3,
                        }}
                    >
                        Signup now
                    </Button>
                </Grid>

                {/* Image Content */}
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={homeTeacherImage} alt="TEACHER" style={{ maxWidth: '90%', height: 'auto' }} />
                </Grid>

                <Grid item xs={12}
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'block',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex',
                            xxl: 'flex',

                        },
                        color: theme.palette.primary.dark,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    {/* Fast */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: "10px 10px"
                    }}>
                        <Lottie animationData={Fast} style={{ width: '80vw', maxWidth: '250px' }} />
                        <Typography align='center' variant='h6'>Fast</Typography>
                    </div>

                    {/* Easy */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: "10px 10px"
                    }}>
                        <Lottie animationData={Easy} style={{ width: '80vw', maxWidth: '250px' }} />
                        <Typography align='center' variant='h6'>Easy</Typography>
                    </div>

                    {/* Track Result */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: "10px 10px"
                    }}>
                        <Lottie animationData={TrackResult} style={{ width: '80vw', maxWidth: '250px' }} />
                        <Typography align='center' variant='h6'>Track Result</Typography>
                    </div>
                </Grid>
            </Grid>
            <Footer />

        </div >
    );
};

export default Home;
