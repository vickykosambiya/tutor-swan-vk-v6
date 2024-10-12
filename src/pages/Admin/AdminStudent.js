import React, { useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Grid, Typography, Button, Card, CardContent, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import theme from '../../theme'
import { useSelector } from 'react-redux'
import { selectAdminData } from '../../redux/selectors/adminSelectors'
import { selectInstituteData } from '../../redux/selectors/instituteSelectors'
import { selectStudentData } from '../../redux/selectors/studentSelectors'
import { selectTeacherData } from '../../redux/selectors/teacherSelectors'
import AddClass from './AddClass'
import { useDispatch } from 'react-redux';
import { fetchStudentData } from '../../redux/actions/studentActions';
import { fetchInstituteData } from '../../redux/actions/instituteActions';
import DeleteIcon from '@mui/icons-material/Delete';





const AdminStudent = () => {

    const dispatch = useDispatch();
    const adminData = useSelector(selectAdminData);
    const instituteData = useSelector(selectInstituteData);
    const studentData = useSelector(selectStudentData);
    const teacherData = useSelector(selectTeacherData);
    const instituteCode = instituteData.institute_code;
    console.log(adminData);
    console.log(instituteData);
    console.log(studentData);
    console.log(teacherData);

    const token = localStorage.getItem('token');

    const handleDeleteUser = async (email) => {
        let studentId;
        studentId = studentData.find(student => student.email === email)?._id;

        try {
            const response = await axios.delete('http://localhost:5001/admin/deleteStudent', {
                data: { studentId },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200) {
                dispatch(fetchStudentData(response.data.updatedStudents));
                dispatch(fetchInstituteData(response.data.updatedInstitute));
                alert('User deleted successfully');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    }
    const handleDeleteClass = async (className, division) => {
        try {
            console.log('instituteCode', instituteCode);
            console.log('className', className);
            console.log('division', division);
            const response = await axios.delete(`http://localhost:5001/admin/deleteClass`, {
                data: {
                    instituteCode: instituteCode,
                    className: className,
                    division: division
                },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200) {
                console.log('response.data', response.data);
                dispatch(fetchInstituteData(response.data.institute));
                alert('Class deleted successfully');
            } else {
                alert('Failed to delete class');
            }
        } catch (error) {
            console.error('Error deleting class:', error);
            alert('Failed to delete class');
        }
    }

    const handleStatus = async (email, userType, statusType) => {
        let userId;
        if (userType === 'teacher') {
            userId = teacherData.find(teacher => teacher.email === email)?._id;
            if (!userId) {
                console.error(`No teacher found with email: ${email}`);
                return;
            }
        } else if (userType === 'student') {
            userId = studentData.find(student => student.email === email)?._id;
            if (!userId) {
                console.error(`No student found with email: ${email}`);
                return;
            }
        } else {
            console.error(`Invalid userType: ${userType}`);
            return;
        }

        console.log(userId);

        try {
            const response = await axios.put('http://localhost:5001/admin/handleStatus',
                { userId, userType, statusType },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            console.log(response);
            if (response.status === 200) {
                dispatch(fetchStudentData(response.data.updatedList));
                alert('Status updated successfully');
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    }


    const studentsApproved = studentData.filter(student => student.status === 'Approved').length;
    const studentsNotApproved = studentData.filter(student => student.status === 'Pending').length;
    const columns = [
        { field: 'id', headerName: 'ID', headerClassName: 'tableHeader', headerAlign: 'center', width: 90 },
        { field: 'name', headerName: 'Name', headerClassName: 'tableHeader', headerAlign: 'center', width: 150 },
        { field: 'email', headerName: 'Email', headerClassName: 'tableHeader', headerAlign: 'center', width: 150 },
        { field: 'status', headerName: 'Status', headerClassName: 'tableHeader', headerAlign: 'center', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            headerClassName: 'tableHeader',
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    {params.row.status === 'Approved' ? (
                        <IconButton
                            onClick={() => handleDeleteUser(params.row.email, 'student')}
                            style={{ color: 'red' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton
                                onClick={() => handleStatus(params.row.email, 'student', 'Approved')}
                                style={{ color: 'green' }}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => handleStatus(params.row.email, 'student', 'Rejected')}
                                style={{ color: 'red' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    )}
                </>
            ),
        },
    ];
    const rows = studentData.map((student, index) => ({
        id: index + 1,
        name: student.name,
        email: student.email,
        status: student.status,
    }));

    // const instituteCode = instituteData.institute_code;

    const [addClassOpen, setAddClassOpen] = useState(false);
    const handleAddClass = () => setAddClassOpen(true);
    const handleAddClassClose = () => setAddClassOpen(false);



    return (
        <div style={{ minHeight: '100vh', width: '100%', display: 'flex' }}>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={3} sx={{
                    backgroundColor: { xs: 'transparent', md: theme.palette.primary.main },
                    position: { xs: 'static', md: 'sticky' },
                    top: 0,
                    height: { xs: 'auto', md: '100vh' },
                    zIndex: 1,
                }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={9} sx={{ minHeight: '100vh', overflow: 'auto' }}>
                    <Grid container direction="column">
                        <Grid item xs={12} sx={{ padding: { xs: 2, sm: 4 }, alignContent: 'center' }}>
                            <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                Welcome {adminData.admin_name} To Student Dashboard!
                            </Typography><br />
                            <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                {instituteData.institute_name}
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} sx={{ flexGrow: 1, justifyContent: 'center', padding: { xs: 2, sm: 4 } }}>
                            {/* Adjust the Grid items for cards */}
                            <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center', mb: { xs: 2, sm: 0 } }}>
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
                                            No. of Students Approved
                                        </Typography><br />
                                        <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                            {studentsApproved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ minHeight: '200px', alignContent: 'center', mb: { xs: 2, sm: 0 } }}>
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
                                            No. of Students Not Approved
                                        </Typography><br />
                                        <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                            {studentsNotApproved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/* DataGrid sections */}
                            <Grid item xs={12} sx={{ minHeight: '400px', alignContent: 'center', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
                                <Box sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    '& .tableHeader': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.secondary.main,
                                        fontWeight: 'bold',
                                    },
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    width: '100%',
                                    overflowX: 'auto'
                                }}>
                                    <DataGrid
                                        pagination
                                        autoHeight
                                        pageSize={5}
                                        initialState={{
                                            pagination: { paginationModel: { pageSize: 5 } },
                                        }}
                                        pageSizeOptions={[5, 10, 15]}
                                        disableColumnMenu
                                        rows={rows}
                                        columns={columns.map(column => ({
                                            ...column,
                                            headerClassName: 'tableHeader',
                                            headerAlign: 'center',
                                            align: 'center',
                                            flex: 1,
                                        }))}
                                        sx={{
                                            border: 'none',
                                            width: '100%',
                                            backgroundColor: theme.palette.secondary.light,
                                            '& .MuiDataGrid-cell': {
                                                borderBottom: `1px solid ${theme.palette.primary.light}`,
                                            },
                                            '& .MuiDataGrid-root': {
                                                width: { xs: 'max-content', sm: '100%' }
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ minHeight: '400px', alignContent: 'center', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
                                <Box sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    '& .tableHeader': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.secondary.main,
                                        fontWeight: 'bold',
                                    },
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    width: '100%',
                                    overflowX: 'auto'
                                }}>
                                    <DataGrid
                                        pagination
                                        autoHeight
                                        pageSize={5}
                                        initialState={{
                                            pagination: { paginationModel: { pageSize: 5 } },
                                        }}
                                        pageSizeOptions={[5, 10, 15]}
                                        disableColumnMenu
                                        rows={(instituteData.classes || []).map((classItem, index) => ({
                                            id: index,
                                            className: classItem.name,
                                            division: classItem.division,
                                        }))}
                                        columns={[
                                            {
                                                field: 'className',
                                                headerName: 'Class Name',
                                                flex: 1,
                                                headerClassName: 'tableHeader',
                                                headerAlign: 'center',
                                                align: 'center',
                                            },
                                            {
                                                field: 'division',
                                                headerName: 'Division',
                                                flex: 1,
                                                headerClassName: 'tableHeader',
                                                headerAlign: 'center',
                                                align: 'center',
                                            },
                                            {
                                                field: 'delete',
                                                headerName: 'Delete',
                                                flex: 1,
                                                headerClassName: 'tableHeader',
                                                headerAlign: 'center',
                                                align: 'center',
                                                renderCell: (params) => (
                                                    <IconButton
                                                        onClick={() => handleDeleteClass(params.row.className, params.row.division)}
                                                        style={{ color: 'red' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                ),
                                            },
                                        ]}
                                        sx={{
                                            border: 'none',
                                            width: '100%',
                                            backgroundColor: theme.palette.secondary.light,
                                            '& .MuiDataGrid-cell': {
                                                borderBottom: `1px solid ${theme.palette.primary.light}`,
                                            },
                                            '& .MuiDataGrid-root': {
                                                width: { xs: 'max-content', sm: '100%' }
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid>
                            {/* Add Class button */}
                            <Grid item xs={12} sx={{ minHeight: '200px', alignContent: 'center', justifyItems: 'center', padding: '20px' }}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                        width: '100%',
                                        maxWidth: '300px',
                                        margin: 'auto',
                                        display: 'block',
                                        color: theme.palette.secondary.main,
                                        fontWeight: 'bold',
                                        mb: 3,
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                    onClick={handleAddClass}
                                >
                                    Add Class
                                </Button>
                                <AddClass addClassOpen={addClassOpen} handleClose={handleAddClassClose} instituteCode={instituteCode} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}


export default AdminStudent