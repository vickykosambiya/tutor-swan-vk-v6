import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import theme from '../../theme';



const Pricing = () => {
    return (
        <div>

            <Navbar />
            <Grid container justifyContent={'center'} marginTop={"20px"} color={theme.palette.primary.main} spacing={2}>
                <Grid item xs={12} md={9} sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' gutterBottom>
                        Pricing Plans
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: { xs: 18, md: 20 } }}>
                        Choose the plan that fits your needs
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} marginTop={"40px"} marginBottom={"130px"} spacing={4} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
                {[
                    { title: "School", students: "Up to 300 students", price: "Rs. 35/paper" },
                    { title: "College", students: "301-600 students", price: "Rs. 30/paper" },
                    { title: "Institute", students: "600+ students", price: "Rs. 25/month" }
                ].map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: { xs: 4, sm: 0 } }}>
                        <div style={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: '8px', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h5' gutterBottom color={theme.palette.primary.main}>
                                {plan.title}
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                                {plan.price}
                            </Typography>
                            <Typography gutterBottom>
                                {plan.students}
                            </Typography>
                            <ul style={{ paddingLeft: '20px', marginBottom: '20px', flex: 1 }}>
                                <li>Student Dashboard</li>
                                <li>Teacher Dashboard</li>
                                <li>Admin Dashboard</li>
                            </ul>
                            <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }} fullWidth>
                                Choose Plan
                            </Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </div >
    )
}

export default Pricing