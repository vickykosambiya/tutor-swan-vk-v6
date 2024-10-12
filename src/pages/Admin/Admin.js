import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Grid, Typography, Button, Card, CardContent } from '@mui/material'
import theme from '../../theme'
import { useSelector } from 'react-redux'
import { selectAdminData } from '../../redux/selectors/adminSelectors'
import { selectInstituteData } from '../../redux/selectors/instituteSelectors'
import { selectStudentData } from '../../redux/selectors/studentSelectors'
import { selectTeacherData } from '../../redux/selectors/teacherSelectors'
import BuyTokens from './BuyTokens'




const Admin = () => {


    const adminData = useSelector(selectAdminData);
    const instituteData = useSelector(selectInstituteData);
    const studentData = useSelector(selectStudentData);
    const teacherData = useSelector(selectTeacherData);
    console.log(adminData);
    console.log(instituteData);
    console.log(studentData);
    console.log(teacherData);
    const tokenAvaiable = instituteData.tokens_available;
    const tokenUsed = instituteData.tokens_used;
    const teachersRegistered = teacherData.length;
    const studentsRegistered = studentData.length;
    const instituteCode = instituteData.institute_code;

    const [buyTokensOpen, setBuyTokensOpen] = useState(false);
    const handleBuyTokens = () => setBuyTokensOpen(true);
    const handleBuyTokensClose = () => setBuyTokensOpen(false);



    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
            <Grid container>
                <Grid item xs={12} sm={3} sx={{ backgroundColor: { sm: theme.palette.primary.main }, minHeight: { xs: 'auto', sm: '100vh' } }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={9} container direction="row" sx={{ width: '100%' }}>
                    <Grid item xs={12} sx={{ padding: { xs: 4, }, alignContent: 'center' }}>
                        <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                            Welcome {adminData.admin_name}!
                        </Typography><br />
                        <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                            {instituteData.institute_name}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} sx={{ flexGrow: 1, justifyContent: 'center', }}>
                        <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center', }}>
                            <Card sx={{
                                border: '1px solid black',
                                height: '80%',
                                width: '80%',
                                margin: 'auto',
                                justifyContent: 'center',
                                alignContent: 'center',
                                backgroundColor: theme.palette.secondary.light,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        No. of Tokens Available
                                    </Typography><br />
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        {tokenAvaiable}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center' }}>
                            <Card sx={{
                                border: '1px solid black',
                                height: '80%',
                                width: '80%',
                                margin: 'auto',
                                justifyContent: 'center',
                                alignContent: 'center',
                                backgroundColor: theme.palette.secondary.light,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        No. of Tokens Used
                                    </Typography><br />
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        {tokenUsed}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center' }}>
                            <Card sx={{
                                border: '1px solid black',
                                height: '80%',
                                width: '80%',
                                margin: 'auto',
                                justifyContent: 'center',
                                alignContent: 'center',
                                backgroundColor: theme.palette.secondary.light,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        No. of Teachers Registered
                                    </Typography><br />
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        {teachersRegistered}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center' }}>
                            <Card sx={{
                                border: '1px solid black',
                                height: '80%',
                                width: '80%',
                                margin: 'auto',
                                justifyContent: 'center',
                                alignContent: 'center',
                                backgroundColor: theme.palette.secondary.light,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        No. of Students Registered
                                    </Typography><br />
                                    <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                        {studentsRegistered}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center', justifyItems: 'center' }}>
                            <Button variant='contained' color='primary' sx={{ width: '80%', margin: 'auto', display: 'block', color: theme.palette.secondary.main, fontWeight: 'bold', marginBottom: '100px' }} onClick={handleBuyTokens}>
                                Buy Tokens
                            </Button>
                            <BuyTokens buyTokensOpen={buyTokensOpen} handleClose={handleBuyTokensClose} instituteCode={instituteCode} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default Admin
