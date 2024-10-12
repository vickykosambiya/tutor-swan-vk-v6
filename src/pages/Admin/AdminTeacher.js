import React, { useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Grid, Typography, Button, Card, CardContent, Box, useMediaQuery } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// import theme from '../../theme'
import { useSelector } from 'react-redux'
import { selectAdminData } from '../../redux/selectors/adminSelectors'
import { selectInstituteData } from '../../redux/selectors/instituteSelectors'
import { selectStudentData } from '../../redux/selectors/studentSelectors'
import { selectTeacherData } from '../../redux/selectors/teacherSelectors'
import AddSubjects from './AddSubjects'
import { useDispatch } from 'react-redux';
import { fetchTeacherData } from '../../redux/actions/teacherActions';
import { fetchInstituteData } from '../../redux/actions/instituteActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';





const AdminTeacher = () => {

    const dispatch = useDispatch();
    const adminData = useSelector(selectAdminData);
    const instituteData = useSelector(selectInstituteData);
    const studentData = useSelector(selectStudentData);
    const teacherData = useSelector(selectTeacherData);
    const subjects = instituteData.subjects;
    console.log(adminData);
    console.log(instituteData);
    console.log(studentData);
    console.log(teacherData);
    const instituteCode = instituteData.institute_code;
    const token = localStorage.getItem('token');

    const handleDeleteUser = async (email) => {
        let teacherId;
        teacherId = teacherData.find(teacher => teacher.email === email)?._id;

        try {
            const response = await axios.delete(`http://localhost:5001/admin/deleteTeacher`, {
                data: { teacherId },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200) {
                dispatch(fetchTeacherData(response.data.updatedTeachers));
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

    //Check
    const handleDeleteSubject = async (instituteCode, subjectName) => {
        try {
            console.log('instituteCode', instituteCode);
            console.log('subjectName', subjectName);
            const response = await axios.delete(`http://localhost:5001/admin/deleteSubject`, {
                data: { instituteCode: instituteCode, subjectName: subjectName },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200) {
                console.log('response.data', response.data);
                dispatch(fetchInstituteData(response.data.institute));
                alert('Subject deleted successfully');
            } else {
                alert('Failed to delete subject');
            }
        } catch (error) {
            console.error('Error deleting subject:', error);
            alert('Failed to delete subject');
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
                dispatch(fetchTeacherData(response.data.updatedList));
                alert('Status updated successfully');
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    }


    const teachersApproved = teacherData.filter(teacher => teacher.status === 'Approved').length;
    const teachersNotApproved = teacherData.filter(teacher => teacher.status === 'Pending').length;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'tableHeader',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerClassName: 'tableHeader',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            minWidth: 80,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            minWidth: 80,
            headerClassName: 'tableHeader',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {params.row.status === 'Approved' ? (
                        <IconButton
                            onClick={() => handleDeleteUser(params.row.email)}
                            size="small"
                            sx={{ color: theme.palette.error.main }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton
                                onClick={() => handleStatus(params.row.email, 'teacher', 'Approved')}
                                size="small"
                                sx={{ color: theme.palette.success.main }}
                            >
                                <CheckIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                onClick={() => handleStatus(params.row.email, 'teacher', 'Rejected')}
                                size="small"
                                sx={{ color: theme.palette.error.main }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    )}
                </Box>
            ),
        },
    ];
    const rows = teacherData.map((teacher, index) => ({
        id: index + 1,
        name: teacher.name,
        email: teacher.email,
        status: teacher.status,
    }));

    // const instituteCode = instituteData.institute_code;

    const [addSubjectsOpen, setAddSubjectsOpen] = useState(false);
    const handleAddSubjects = () => setAddSubjectsOpen(true);
    const handleAddSubjectsClose = () => setAddSubjectsOpen(false);



    return (
        <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex' }}>
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
                <Grid item xs={12} md={9} sx={{ height: '100%', overflow: 'auto', p: { xs: 1, sm: 2, md: 3 } }}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                                Welcome {adminData.admin_name} To Teachers Dashboard!
                            </Typography>
                            <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', mt: 1 }}>
                                {instituteData.institute_name}
                            </Typography>
                        </Grid>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Card sx={{
                                    border: '1px solid black',
                                    height: '100%',
                                    backgroundColor: theme.palette.secondary.light,
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                    }
                                }}>
                                    <CardContent>
                                        <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                            No. of Teachers Approved
                                        </Typography>
                                        <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', mt: 2 }}>
                                            {teachersApproved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card sx={{
                                    border: '1px solid black',
                                    height: '100%',
                                    backgroundColor: theme.palette.secondary.light,
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                    }
                                }}>
                                    <CardContent>
                                        <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                            No. of Teachers Not Approved
                                        </Typography>
                                        <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center', mt: 2 }}>
                                            {teachersNotApproved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
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
                            }}>
                                <DataGrid
                                    pagination
                                    autoHeight
                                    pageSize={5}
                                    rowHeight={isMobile ? 60 : 52}
                                    headerHeight={isMobile ? 56 : 56}
                                    initialState={{
                                        pagination: { paginationModel: { pageSize: 5 } },
                                    }}
                                    pageSizeOptions={[5, 10, 15]}
                                    disableColumnMenu
                                    rows={rows}
                                    columns={columns}
                                    sx={{
                                        border: 'none',
                                        width: '100%',
                                        height: 'auto',
                                        minHeight: 400,
                                        backgroundColor: theme.palette.secondary.light,
                                        '& .MuiDataGrid-cell': {
                                            borderBottom: `1px solid ${theme.palette.primary.light}`,
                                            padding: '8px 4px',
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word',
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                                        },
                                        '& .MuiDataGrid-columnHeaderTitle': {
                                            fontWeight: 'bold',
                                            overflow: 'visible',
                                            lineHeight: '1.2em',
                                            whiteSpace: 'normal',
                                            textOverflow: 'clip',
                                        },
                                        '& .MuiDataGrid-row': {
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                        },
                                        '& .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                        '& .MuiDataGrid-cellContent': {
                                            width: '100%',
                                            textAlign: 'center',
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
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
                                mb: 3,
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
                                    rows={(subjects || []).map((subject, index) => ({
                                        id: index,
                                        subjectName: subject,
                                    }))}
                                    columns={[
                                        {
                                            field: 'subjectName',
                                            headerName: 'Subject Name',
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
                                                <DeleteIcon
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDeleteSubject(instituteCode, params.row.subjectName)}
                                                >
                                                    Delete
                                                </DeleteIcon>
                                            ),
                                        },
                                    ]}
                                    sx={{
                                        border: 'none',
                                        width: '100%',
                                        height: 'auto',
                                        minHeight: 300,
                                        backgroundColor: theme.palette.secondary.light,
                                        '& .MuiDataGrid-cell': {
                                            borderBottom: `1px solid ${theme.palette.primary.light}`,
                                        },
                                    }}
                                />
                            </Box>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{
                                    width: '100%',
                                    maxWidth: 300,
                                    margin: 'auto',
                                    display: 'block',
                                    color: theme.palette.secondary.main,
                                    fontWeight: 'bold',
                                    mb: 5
                                }}
                                onClick={handleAddSubjects}
                            >
                                Add Subjects
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AddSubjects addSubjectsOpen={addSubjectsOpen} handleClose={handleAddSubjectsClose} instituteCode={instituteCode} />
        </Box >

    )

}

export default AdminTeacher