import React, { useState } from 'react'
import axios from 'axios';
import theme from '../../theme';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, Alert } from '@mui/material';

const SignupTeacher = () => {

    const [formData, setFormData] = useState({
        name: '',
        teacher_email: '',
        teacher_password: '',
        institute_code: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');
            if (!otpSent) {
                const response = await axios.post('http://localhost:5001/auth/signupTeacher', formData);
                console.log(response.data);
                setSuccess('OTP sent to your email!');
                setOtpSent(true);
            } else {
                console.log(otp)
                console.log(formData)
                const response = await axios.post('http://localhost:5001/auth/verify-otp-teacher', { ...formData, otp });
                console.log(response.data);
                setSuccess('Signup successful!');
                setFormData({
                    name: '',
                    teacher_email: '',
                    teacher_password: '',
                    institute_code: ''
                });
                setOtpSent(false);
                setOtp('');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error during signup:', error.response?.data?.message || error.message);
            setError('Error during signup: ' + (error.response?.data?.message || 'An unexpected error occurred'));
        }
    };

    const SignupType = () => {
        const [signupType, setSignupType] = useState('teacher');

        const handleTypeChange = (event) => {
            const selectedType = event.target.value;
            setSignupType(selectedType);
            if (selectedType === 'student') {
                window.location.href = '/signup/student';
            } else if (selectedType === 'admin') {
                window.location.href = '/signup';
            }
        };

        return (
            <Box sx={{ mb: 3 }}>
                <Select
                    value={signupType}
                    onChange={handleTypeChange}
                    fullWidth
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                </Select>
            </Box>
        );
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <SignupType />
                </Box>
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h4" sx={{ color: theme.palette.primary.main }}>
                        Fill the form to Get Started!!
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {!otpSent ? (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Your Name"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="teacher_email"
                                    label="Your Email"
                                    name="teacher_email"
                                    autoComplete="email"
                                    value={formData.teacher_email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="teacher_password"
                                    label="Password"
                                    type="password"
                                    id="teacher_password"
                                    autoComplete="new-password"
                                    value={formData.teacher_password}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="instituteCode"
                                    label="Institute Code"
                                    name="institute_code"
                                    autoComplete="organization"
                                    value={formData.institute_code}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Enter OTP"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {otpSent ? 'Verify OTP and Sign Up' : 'Send OTP'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default SignupTeacher


