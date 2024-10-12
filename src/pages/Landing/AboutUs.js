import React from 'react';
import Navbar from '../../components/Navbar';
import SwipeableViews from 'react-swipeable-views';
import Footer from '../../components/Footer';
import { Grid, Typography, Box, Card, CardContent, Avatar } from '@mui/material';
import teacher from '../../assets/Teacher-About-Us.jpg';
import theme from '../../theme';

const AboutUs = () => {


    return (
        <div>
            <Navbar />
            <Grid container spacing={4} sx={{ marginTop: '30px', padding: { xs: 2, sm: 4, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Box sx={{ textAlign: 'center', justifyContent: 'center', mb: 4, padding: '20px', width: '100%' }}>
                    <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 3, color: theme.palette.primary.dark }}>About Us</Typography>
                </Box>
                <Grid item xs={12} sx={{ mb: 4, width: '100%' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', color: theme.palette.primary.dark, backgroundColor: theme.palette.secondary.light }}>
                                <CardContent>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Our Journey
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 2 }}>
                                        Tutor-Swan was born from a simple yet powerful idea: to transform the way we approach education. We're not just another grading company; we're pioneers in educational technology, committed to empowering teachers and students alike.
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 2 }}>
                                        Our journey began with a vision to alleviate the burden of time-consuming grading tasks. We developed cutting-edge AI technology that not only grades essays and assignments with remarkable accuracy and speed but also provides insightful feedback. This innovation allows teachers to redirect their energy towards what truly matters - inspiring and guiding their students.
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 2 }}>
                                        But we didn't stop there. We recognized that effective learning is about more than just grades. Our AI goes beyond basic assessment, identifying individual strengths and weaknesses to generate comprehensive student reports. These insights enable personalized learning experiences, helping students reach their full potential.
                                    </Typography>
                                    <Typography variant='body1'>
                                        Today, Tutor-Swan stands at the forefront of educational innovation. We invite you to join us on this exciting journey as we continue to revolutionize education. Together, we can create a future where technology and human expertise combine to unlock limitless learning possibilities.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={teacher} alt="Teacher" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={6} sx={{ mb: { xs: 4, md: 0 }, marginBottom: '40px' }}>
                            <Card sx={{ height: '100%', color: theme.palette.primary.dark, backgroundColor: theme.palette.secondary.light }}>
                                <CardContent>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Mission
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 2 }}>
                                        To revolutionize grading through AI technology, freeing teachers' time and providing valuable student insights to empower educators and unlock student potential.
                                    </Typography>
                                    <Typography variant='body1'>
                                        We are committed to using AI to improve efficiency in grading, while also providing teachers with data to enhance student learning. Our mission is to transform the educational landscape by empowering educators with innovative tools and insights.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', color: theme.palette.primary.dark, backgroundColor: theme.palette.secondary.light }}>
                                <CardContent>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Vision
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 2 }}>
                                        To create a future of education where teachers are empowered to focus on inspiring students and igniting a love for learning.
                                    </Typography>
                                    <Typography variant='body1'>
                                        We envision a world where technology enhances the human aspect of education, allowing teachers to dedicate more time to nurturing creativity, critical thinking, and passion for knowledge in their students. Our vision emphasizes the transformative power of education and the crucial role of teachers in shaping future generations.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%', marginTop: '40px' }}>
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Mobile view with SwipeableViews */}
                        <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', display: { xs: 'block', md: 'none' } }}>
                            <SwipeableViews
                                enableMouseEvents
                                resistance
                                style={{ display: 'flex', justifyContent: 'center' }}
                                slideStyle={{ padding: '30px 10px' }}
                            >
                                <Card sx={{ margin: '0 auto', width: '80%', maxWidth: '300px' }}>
                                    <CardContent sx={{ justifyContent: 'center' }}>
                                        <Avatar alt='Avatar' sx={{ width: 100, height: 100, marginBottom: 2, margin: '0 auto' }} />
                                        <Typography variant='h6' sx={{ height: '70px', marginTop: '40px', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                                            Raj Jadav
                                        </Typography>
                                        <Typography variant='body2' sx={{ mb: 2, textAlign: 'center' }}>
                                            CEO
                                        </Typography>
                                        <Typography variant='body2' sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                            “AI can give every child a tutor in the way that is most effective for them.”
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ margin: '0 auto', width: '80%', maxWidth: '300px' }}>
                                    <CardContent>
                                        <Avatar alt='Avatar' sx={{ width: 100, height: 100, marginBottom: 2, margin: '0 auto' }} />
                                        <Typography variant='h6' sx={{ height: '50px', marginTop: '40px', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                                            Vicky Kosambiya
                                        </Typography>
                                        <Typography variant='body2' sx={{ mb: 2, textAlign: 'center' }}>
                                            Tech Lead
                                        </Typography>
                                        <Typography variant='body2' sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                            “Innovation is the ability to see change as an opportunity, not a threat.”
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </SwipeableViews>
                        </Box>

                        {/* Desktop view without SwipeableViews */}
                        <Box sx={{ padding: '20px', display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4, width: '100%' }}>
                            <Card sx={{ width: '20%', maxWidth: 300, height: '100%' }}>
                                <CardContent>
                                    <Avatar alt='Avatar' sx={{ width: 100, height: 100, marginBottom: 2, margin: '0 auto' }} />
                                    <Typography variant='h6' sx={{ marginTop: '40px', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                                        Raj Jadhav
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 2, textAlign: 'center' }}>
                                        CEO
                                    </Typography>
                                    <Typography variant='body2' sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                        “AI can give every child a tutor in the way that is most effective for them.”
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: '20%', maxWidth: 300, height: '100%' }}>
                                <CardContent>
                                    <Avatar alt='Avatar' sx={{ width: 100, height: 100, marginBottom: 2, margin: '0 auto' }} />
                                    <Typography variant='h6' sx={{ marginTop: '40px', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                                        Vicky Kosambiya
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 2, textAlign: 'center' }}>
                                        Tech Lead
                                    </Typography>
                                    <Typography variant='body2' sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                        "Innovation is the ability to see change as an opportunity, not a threat."
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default AboutUs
