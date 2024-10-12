import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import theme from '../../theme'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchInstituteData } from '../../redux/actions/instituteActions'


const BuyTokens = ({ buyTokensOpen, handleClose, instituteCode }) => {

    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        instituteCode: instituteCode,
        tokens: 0,
        amountToPay: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handlePayment = () => {
    //     console.log("Payment successful");
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(token);
            const response = await axios.put(`http://localhost:5001/admin/buy-tokens`, formData, {
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
                alert('Tokens purchased successfully!');
            }
        } catch (error) {
            console.error('Error buying tokens:', error);
            alert(error.response?.data?.message || 'An error occurred while buying tokens.');
        }
    };





    return (
        <div>
            <Modal open={buyTokensOpen} onClose={handleClose} aria-labelledby="simple-modal-title"
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
                    <Typography variant="h6" component="h2" gutterBottom align="center">Buy Tokens</Typography>
                    <form onSubmit={handleSubmit}>
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
                            onChange={handleChange}
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
                            Buy Now
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default BuyTokens
