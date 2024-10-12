// import React, { useState } from 'react';
// import axios from 'axios';
// import theme from '../../theme';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';

// import { Select, MenuItem } from '@mui/material';





// const Signup = () => {

//     const SignupType = () => {
//         const [signupType, setSignupType] = useState('admin');

//         const handleTypeChange = (event) => {
//             const selectedType = event.target.value;
//             setSignupType(selectedType);
//             if (selectedType === 'student') {
//                 window.location.href = '/signup/student';
//             } else if (selectedType === 'teacher') {
//                 window.location.href = '/signup/teacher';
//             }
//         };

//         return (
//             <Box sx={{ mb: 3 }}>
//                 <Select
//                     value={signupType}
//                     onChange={handleTypeChange}
//                     fullWidth
//                 >
//                     <MenuItem value="admin">Admin</MenuItem>
//                     <MenuItem value="teacher">Teacher</MenuItem>
//                     <MenuItem value="student">Student</MenuItem>
//                 </Select>
//             </Box>
//         );
//     };



//     const [formData, setFormData] = useState({
//         name: '',
//         admin_email: '',
//         admin_name: '',
//         plan: '',
//         tokens: 0,
//         admin_password: '',
//         institute_code: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // const handlePayment = async () => {
//     //     // Implement payment logic here
//     //     console.log('Payment processing...');
//     //     // After successful payment, call handleSubmit
//     //     await handleSubmit();
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Determine the plan based on the number of tokens
//             let plan;
//             const tokens = parseInt(formData.tokens);
//             if (tokens <= 300) {
//                 plan = 'Basic';
//             } else if (tokens <= 600) {
//                 plan = 'Standard';
//             } else {
//                 plan = 'Premium';
//             }

//             // Update formData with the determined plan
//             const updatedFormData = { ...formData, plan };

//             console.log(updatedFormData);
//             const response = await axios.post('http://localhost:5001/auth/signup', updatedFormData);
//             console.log(response.data);
//             alert('Signup successful!', 'success');
//             setFormData({
//                 name: '',
//                 email: '',
//                 admin_name: '',
//                 plan: '',
//                 tokens: 0,
//                 admin_password: '',
//                 institute_code: ''
//             });
//             window.location.href = '/';
//         } catch (error) {
//             console.error('Error during signup:', error.response?.data?.message || error.message);
//             alert('Error during signup: ' + (error.response?.data?.message || 'An unexpected error occurred'));
//         }
//     };



//     const handleTokenChange = (e) => {
//         const tokens = parseInt(e.target.value);
//         let plan = 'Basic';
//         if (tokens > 300 && tokens <= 600) {
//             plan = 'Standard';
//         } else if (tokens > 600) {
//             plan = 'Premium';
//         }
//         setFormData(prevState => ({
//             ...prevState,
//             tokens: e.target.value,
//             plan: plan
//         }));
//     };

//     return (
//         <Container maxWidth="sm" sx={{ paddingTop: '80px', paddingBottom: '80px' }}>
//             <Box sx={{ position: 'relative', zIndex: 1 }}>
//                 <SignupType />
//             </Box>
//             <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
//                 <Typography component="h1" variant="h4" sx={{ color: theme.palette.primary.main, marginBottom: '20px' }}>
//                     Fill the form to Get Started!!
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="name"
//                         label="Institute Name"
//                         name="name"
//                         autoComplete="organization"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="admin_email"
//                         label="Admin Email"
//                         name="admin_email"
//                         autoComplete="email"
//                         value={formData.admin_email}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="admin_name"
//                         label="Admin Name"
//                         name="admin_name"
//                         autoComplete="name"
//                         value={formData.admin_name}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="admin_password"
//                         label="Password"
//                         type="password"
//                         id="admin_password"
//                         autoComplete="new-password"
//                         value={formData.admin_password}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="instituteCode"
//                         label="Institute Code"
//                         name="institute_code"
//                         autoComplete="organization"
//                         value={formData.institute_code}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="tokens"
//                         label="Number of Tokens"
//                         name="tokens"
//                         type="number"
//                         InputProps={{
//                             inputProps: { min: 1 },
//                             onClick: (event) => {
//                                 event.target.value = '';
//                             }
//                         }}
//                         value={formData.tokens}
//                         onChange={handleTokenChange}
//                     />
//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="plan"
//                         label="Your Plan"
//                         name="plan"
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                         value={formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)}
//                     />
//                     <TextField
//                         margin="normal"
//                         fullWidth
//                         id="amountToPay"
//                         label="Amount to Pay"
//                         name="amountToPay"
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                         value={(() => {
//                             const tokens = parseInt(formData.tokens);
//                             if (isNaN(tokens) || tokens < 1) return '';
//                             let price;
//                             if (tokens <= 300) {
//                                 price = tokens * 35;
//                             } else if (tokens <= 600) {
//                                 price = tokens * 30;
//                             } else {
//                                 price = tokens * 25;
//                             }
//                             return `Rs.${price}`;
//                         })()}
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Pay and Sign Up
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     )
// }

// export default Signup

import React, { useState } from 'react';
import axios from 'axios';
import theme from '../../theme';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, Alert } from '@mui/material';

const Signup = () => {
    const [signupType, setSignupType] = useState('admin');
    const [formData, setFormData] = useState({
        name: '',
        admin_email: '',
        admin_name: '',
        plan: '',
        tokens: 0,
        admin_password: '',
        institute_code: ''
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        setSignupType(selectedType);
        if (selectedType === 'student') {
            window.location.href = '/signup/student';
        } else if (selectedType === 'teacher') {
            window.location.href = '/signup/teacher';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTokenChange = (e) => {
        const tokens = parseInt(e.target.value);
        let plan = 'Basic';
        if (tokens > 300 && tokens <= 600) {
            plan = 'Standard';
        } else if (tokens > 600) {
            plan = 'Premium';
        }
        setFormData(prevState => ({
            ...prevState,
            tokens: e.target.value,
            plan: plan
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            let plan;
            const tokens = parseInt(formData.tokens);
            if (tokens <= 300) {
                plan = 'Basic';
            } else if (tokens <= 600) {
                plan = 'Standard';
            } else {
                plan = 'Premium';
            }

            const updatedFormData = { ...formData, plan };

            if (!otpSent) {
                // First step: Send signup data and get OTP
                const response = await axios.post('http://localhost:5001/auth/signup', updatedFormData);
                console.log(response.data);
                setSuccess('OTP sent to your email!');
                setOtpSent(true);
            } else {
                // Second step: Verify OTP and complete signup
                console.log(updatedFormData)
                console.log(otp)
                const response = await axios.post('http://localhost:5001/auth/verify-otp', { ...updatedFormData, otp });
                console.log(response.data);
                setSuccess('Signup successful!');
                setFormData({
                    name: '',
                    email: '',
                    admin_name: '',
                    plan: '',
                    tokens: 0,
                    admin_password: '',
                    institute_code: ''
                });
                setOtpSent(false);
                setOtp('');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (error) {
            console.error('Error during signup:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'An unexpected error occurred');
            if (error.response?.data?.message === 'Signup session expired') {
                setOtpSent(false);
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Select
                    value={signupType}
                    onChange={handleTypeChange}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                </Select>
            </Box>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <Typography component="h1" variant="h4" sx={{ color: theme.palette.primary.main, marginBottom: '20px' }}>
                    {otpSent ? 'Enter OTP' : 'Fill the form to Get Started!!'}
                </Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    {!otpSent ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Institute Name"
                                name="name"
                                autoComplete="organization"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="admin_email"
                                label="Admin Email"
                                name="admin_email"
                                autoComplete="email"
                                value={formData.admin_email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="admin_name"
                                label="Admin Name"
                                name="admin_name"
                                autoComplete="name"
                                value={formData.admin_name}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="admin_password"
                                label="Password"
                                type="password"
                                id="admin_password"
                                autoComplete="new-password"
                                value={formData.admin_password}
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="tokens"
                                label="Number of Tokens"
                                name="tokens"
                                type="number"
                                InputProps={{
                                    inputProps: { min: 1 },
                                    onClick: (event) => {
                                        event.target.value = '';
                                    }
                                }}
                                value={formData.tokens}
                                onChange={handleTokenChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="plan"
                                label="Your Plan"
                                name="plan"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="amountToPay"
                                label="Amount to Pay"
                                name="amountToPay"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={(() => {
                                    const tokens = parseInt(formData.tokens);
                                    if (isNaN(tokens) || tokens < 1) return '';
                                    let price;
                                    if (tokens <= 300) {
                                        price = tokens * 35;
                                    } else if (tokens <= 600) {
                                        price = tokens * 30;
                                    } else {
                                        price = tokens * 25;
                                    }
                                    return `Rs.${price}`;
                                })()}
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
    );
};

export default Signup;