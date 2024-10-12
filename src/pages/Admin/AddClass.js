import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import theme from '../../theme'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchInstituteData } from '../../redux/actions/instituteActions'


const AddClass = ({ addClassOpen, handleClose, instituteCode }) => {

    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        instituteCode: instituteCode,
        className: '',
        division: '',
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
            const response = await axios.post(`http://localhost:5001/admin/addClass`, formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                // Update the store
                console.log(response.data);
                dispatch(fetchInstituteData(response.data.institute));
                // Close the modal
                // Sleep for 60 seconds before closing the modal and updating
                // await new Promise(resolve => setTimeout(resolve, 60000));
                handleClose();
                // Optionally, show a success message
                alert('Class added successfully!');
            }
        } catch (error) {
            console.error('Error adding class:', error);
            alert(error.response?.data?.message || 'An error occurred while adding class.');
        }
    };





    return (
        <div>
            <Modal open={addClassOpen} onClose={handleClose} aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                    width: 400,
                    bgcolor: 'white',
                    border: '2px solid #000',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h6" component="h2" gutterBottom align="center">Add Class</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="className"
                            label="Class Name"
                            name="className"
                            InputProps={{
                                onClick: (event) => {
                                    event.target.value = '';
                                }
                            }}
                            value={formData.className}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="division"
                            label="Division Name"
                            name="division"
                            InputProps={{
                                onClick: (event) => {
                                    event.target.value = '';
                                }
                            }}
                            value={formData.division}
                            onChange={handleChange}
                        />
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
                            Add Class
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default AddClass
