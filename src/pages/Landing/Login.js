import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import theme from '../../theme';
import { useDispatch } from 'react-redux';
import { fetchAdminData } from '../../redux/actions/adminActions';
import { fetchTeacherData } from '../../redux/actions/teacherActions';
import { fetchInstituteData } from '../../redux/actions/instituteActions';
import { fetchStudentData } from '../../redux/actions/studentActions';
import { fetchPaperPattern } from '../../redux/actions/paperPatternActions';
import { getResults } from '../../redux/actions/resultAction';
import axios from 'axios';



const Login = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    const dispatch = useDispatch();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (userType === 'student') {
                try {
                    const response = await axios.post('http://localhost:5001/auth/loginStudent', { email, password });
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    // dispatch(fetchTeacherData(response.data.teacher));
                    // dispatch(fetchInstituteData(response.data.institute))
                    // dispatch(fetchPaperPattern(response.data.paperPatterns));
                    dispatch(fetchStudentData(response.data.studentDetails))
                    dispatch(getResults(response.data.studentResults))
                } catch (error) {
                    alert('Login failed: ' + (error.response?.data?.message || error.message));
                    return;
                }
            } else if (userType === 'teacher') {
                try {
                    const response = await axios.post('http://localhost:5001/auth/loginTeacher', { email, password });
                    console.log(response.data.paperPatterns);
                    localStorage.setItem('token', response.data.token);
                    dispatch(fetchInstituteData(response.data.institute));
                    dispatch(fetchTeacherData(response.data.teacher));
                    dispatch(fetchPaperPattern(response.data.paperPatterns));
                } catch (error) {
                    alert('Login failed: ' + (error.response?.data?.message || error.message));
                    return;
                }
            } else if (userType === 'admin') {
                try {
                    const response = await axios.post('http://localhost:5001/auth/login', { email, password });
                    localStorage.setItem('token', response.data.token);
                    console.log(response.data);
                    dispatch(fetchAdminData(response.data.admin));
                    dispatch(fetchInstituteData(response.data.institute));
                    dispatch(fetchStudentData(response.data.sanitizedStudents));
                    dispatch(fetchTeacherData(response.data.sanitizedTeachers));
                } catch (error) {
                    alert('Login failed: ' + (error.response?.data?.message || error.message));
                    return;
                }
            } else {
                console.error('Invalid user type');
            }


            if (userType === 'student') {
                // // Function to sleep for 1 minute
                // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

                // // Sleep for 1 minute before redirecting
                // await sleep(60000);
                window.location.href = '/student';
            } else if (userType === 'teacher') {
                // // Function to sleep for 1 minute
                // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

                // // Sleep for 1 minute before redirecting
                // await sleep(60000);
                window.location.href = '/teacher';
            } else if (userType === 'admin') {
                // // Function to sleep for 1 minute
                // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

                // // Sleep for 1 minute before redirecting
                // await sleep(60000);
                window.location.href = '/admin';
            }
            handleClose();
        } catch (error) {
            console.log(error);
            alert('Login failed', error.response?.data || error.message);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal"
            aria-describedby="login-form"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '90%',
                    sm: 400,
                    md: 450,
                },
                maxWidth: '90%',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
                borderRadius: 2,
            }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="User Type"
                        variant="outlined"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2,
                            py: {
                                xs: 1.5,
                                sm: 2,
                            },
                            color: theme.palette.secondary.main,
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Login;
