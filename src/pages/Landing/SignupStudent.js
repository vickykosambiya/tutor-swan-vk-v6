import React, { useState } from 'react'
import axios from 'axios';
import theme from '../../theme';
import { TextField, Button, Container, Typography, Box, MenuItem, Select } from '@mui/material';


const SignupStudent = () => {

    const [formData, setFormData] = useState({
        name: '',
        student_email: '',
        student_password: '',
        institute_code: '',
        className: '',
        division: '',
        rollNo: ''
    });

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
            console.log(formData);
            const response = await axios.post('http://localhost:5001/auth/signupStudent', formData);
            console.log(response.data);
            alert('Signup successful!', 'success');
            setFormData({
                name: '',
                student_email: '',
                student_password: '',
                institute_code: '',
                className: '',
                division: '',
                rollNo: ''
            });
            window.location.href = '/';
        } catch (error) {
            console.error('Error during signup:', error.response?.data?.message || error.message);
            alert('Error during signup: ' + (error.response?.data?.message || 'An unexpected error occurred'));
        }
    };




    const [instituteDetails, setInstituteDetails] = useState(null);
    const [classes, setClasses] = useState([]);

    const fetchInstituteDetails = async () => {
        try {
            const institute_code = formData.institute_code;
            console.log(institute_code);
            const response = await axios.get(`http://localhost:5001/auth/getInstituteDetails/${institute_code}`,);
            console.log(response.data);
            setInstituteDetails(response.data);
            setClasses(response.data.classes || []);
        } catch (error) {
            console.error('Error fetching institute details:', error);
            alert('Error fetching institute details. Please check the institute code.');
        }
    };


    const SignupType = () => {
        const [signupType, setSignupType] = useState('student');

        const handleTypeChange = (event) => {
            const selectedType = event.target.value;
            setSignupType(selectedType);
            if (selectedType === 'admin') {
                window.location.href = '/signup';
            } else if (selectedType === 'teacher') {
                window.location.href = '/signup/teacher';
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
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={fetchInstituteDetails}
                        >
                            Fetch Institute Details
                        </Button>
                        {instituteDetails && (
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
                                    id="student_email"
                                    label="Your Email"
                                    name="student_email"
                                    autoComplete="email"
                                    value={formData.student_email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="student_password"
                                    label="Password"
                                    type="password"
                                    id="student_password"
                                    autoComplete="new-password"
                                    value={formData.student_password}
                                    onChange={handleChange}
                                />
                                <TextField
                                    select
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="className"
                                    label="Class"
                                    name="className"
                                    value={formData.className && formData.division ? `${formData.className}-${formData.division}` : ''}
                                    onChange={(e) => {
                                        const [className, division] = e.target.value.split('-');
                                        console.log('Selected Class:', className, 'Selected Division:', division); // Debug
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            className: className,
                                            division: division,
                                        }));
                                    }}
                                >
                                    {classes.map((cls) => (
                                        cls.division.split(',').map((div) => (
                                            <MenuItem key={`${cls.name}-${div.trim()}`} value={`${cls.name}-${div.trim()}`}>
                                                {`${cls.name}-${div.trim()}`}
                                            </MenuItem>
                                        ))
                                    ))}
                                </TextField>


                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="rollNo"
                                    label="Roll No"
                                    name="rollNo"
                                    autoComplete="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default SignupStudent
