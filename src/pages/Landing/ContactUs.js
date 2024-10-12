import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Grid, Typography, Card, CardContent, Box, TextField, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import theme from '../../theme';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <Grid container sx={{ justifyContent: 'center', margin: '20px' }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" color="primary" gutterBottom>Contact Us</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: 'center', marginBottom: '60px', gap: { xs: 2, md: 4 }, padding: { xs: 2, md: 0 } }}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                        <Card sx={{ flexGrow: 1, backgroundColor: 'secondary.light' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary.main">Email ID:</Typography>
                                <Typography variant="body1" color="primary.main">tutorswaninfo@gmail.com</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ flexGrow: 1, backgroundColor: 'secondary.light' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary.main">Address:</Typography>
                                <Typography variant="body1" color="primary.main">Borivali-East, Mumbai, Maharashtra, India.</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ flexGrow: 1, backgroundColor: 'secondary.light' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary.main">Phone No:</Typography>
                                <Typography variant="body1" color="primary.main">+91 9892462257</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ flexGrow: 1, backgroundColor: 'secondary.light' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary.main">Social Media:</Typography><br />
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FacebookIcon color="primary" sx={{
                                            '&:hover': {
                                                color: 'primary.dark',
                                                transform: 'scale(1.2)',
                                                transition: 'all 0.3s ease-in-out'
                                            }
                                        }} />
                                    </a>
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                        <InstagramIcon color="primary" sx={{
                                            '&:hover': {
                                                color: 'primary.dark',
                                                transform: 'scale(1.2)',
                                                transition: 'all 0.3s ease-in-out'
                                            }
                                        }} />
                                    </a>
                                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <LinkedInIcon color="primary" sx={{
                                            '&:hover': {
                                                color: 'primary.dark',
                                                transform: 'scale(1.2)',
                                                transition: 'all 0.3s ease-in-out'
                                            }
                                        }} />
                                    </a>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box component="form" sx={{ mt: 2, backgroundColor: 'secondary.light', padding: 3, borderRadius: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary.main">First Name:</Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    InputProps={{
                                        style: { backgroundColor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary.main">Last Name:</Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    InputProps={{
                                        style: { backgroundColor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom color="primary.main">Email Address:</Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{
                                        style: { backgroundColor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom color="primary.main">Message:</Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id="message"
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows={4}
                                    InputProps={{
                                        style: { backgroundColor: 'white' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"

                                    sx={{ fontWeight: "Bold", color: theme.palette.secondary.light, backgroundColor: theme.palette.primary.main }}
                                >
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default ContactUs