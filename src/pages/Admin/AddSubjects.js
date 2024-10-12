import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import theme from '../../theme'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchInstituteData } from '../../redux/actions/instituteActions'


const AddSubjects = ({ addSubjectsOpen, handleClose, instituteCode }) => {

    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        instituteCode: instituteCode,
        subjectName: '',
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
            const response = await axios.post(`http://localhost:5001/admin/addSubjects`, formData, {
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
                alert('Subject added successfully!');
            }
        } catch (error) {
            console.error('Error adding subject:', error);
            alert(error.response?.data?.message || 'An error occurred while adding subject.');
        }
    };





    return (
        <div>
            <Modal open={addSubjectsOpen} onClose={handleClose} aria-labelledby="simple-modal-title"
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
                    <Typography variant="h6" component="h2" gutterBottom align="center">Add Subjects</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="subjectName"
                            label="Subject Name"
                            name="subjectName"
                            InputProps={{
                                onClick: (event) => {
                                    event.target.value = '';
                                }
                            }}
                            value={formData.subjectName}
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
                            Add Subject
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default AddSubjects
