import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getResults } from '../../redux/selectors/resultSelectors'
import { selectStudentData } from '../../redux/selectors/studentSelectors'
import { Grid, Typography, Card, CardContent, Modal, Box, Button, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
// import theme from '../../theme'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useTheme, useMediaQuery } from '@mui/material'

// Add these styled components
const StyledCard = styled(Card)(({ theme }) => ({
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.secondary.light,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    },
    cursor: 'pointer'
}))

const ModalContent = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    padding: theme.spacing(3),
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        padding: theme.spacing(2),
    },
}))

const Student = () => {
    const results = useSelector(getResults)
    const [selectedResult, setSelectedResult] = useState(null)
    const studentData = useSelector(selectStudentData)
    console.log(results)
    console.log(studentData)

    const handleCardClick = (result) => {
        setSelectedResult(result)
    }

    const handleCloseModal = () => {
        setSelectedResult(null)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const handleDownload = (result) => {
        const doc = new jsPDF()

        // Add title
        doc.setFontSize(18)
        doc.setTextColor(0, 0, 255)
        doc.text(`${result.class_name} Test ${result.roll_number} Result`, 105, 15, null, null, 'center')

        // Add student details
        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0)
        doc.text(`Subject: ${result.subject}`, 20, 30)
        doc.text(`Status: ${result.status}`, 20, 40)
        doc.text(`Total Marks: ${result.total_marks}`, 20, 50)
        doc.text(`Marks Obtained: ${result.total_marks_obtained_final}`, 20, 60)

        // Add marks details table
        const tableData = result.questions.map(q => [
            `${q.main_question_number}.${q.sub_question_number}`,
            q.marks_obtained_final,
            q.max_marks
        ])

        doc.autoTable({
            startY: 70,
            head: [['Question', 'Marks Obtained', 'Max Marks']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [0, 0, 255], textColor: 255 },
            alternateRowStyles: { fillColor: [240, 240, 255] }
        })

        // Add total percentage
        const totalPercentage = ((result.total_marks_obtained_final / result.total_marks) * 100).toFixed(2)
        doc.setFontSize(14)
        doc.setTextColor(0, 0, 255)
        doc.text(`Total Percentage: ${totalPercentage}%`, 20, doc.lastAutoTable.finalY + 20)

        // Save the PDF
        doc.save(`${result.class_name}_Test_${result.roll_number}_Result.pdf`)
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={9} sx={{ height: '100%', overflow: 'auto' }}>
                    <Grid container direction="column" spacing={4} sx={{ padding: 4 }}>
                        <Grid item xs={12}>
                            <Typography variant='h4' fontWeight='bold' color="primary" align="center">
                                Welcome {studentData.name} To Student Dashboard!
                            </Typography>
                        </Grid>
                        <Grid item container spacing={3}>
                            {results && results.map((result) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={result._id}>
                                    <StyledCard onClick={() => handleCardClick(result)}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" align="center" color="primary" fontWeight='bold'>
                                                {result.class_name} Test {result.roll_number}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" align="center">
                                                Subject: {result.subject}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" align="center">
                                                Status: {result.status}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                            {(!results || results.length === 0) && (
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center" color="text.secondary">
                                        No results available.
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        fontWeight: 'bold',
                        color: theme.palette.secondary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        }
                    }}
                >
                    Logout
                </Button>
            </Box>
            <Modal
                open={selectedResult !== null}
                onClose={handleCloseModal}
                aria-labelledby="result-details-modal"
            >
                <ModalContent>
                    {selectedResult && (
                        <>
                            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom color="primary" fontWeight='bold'>
                                {selectedResult.class_name} Test {selectedResult.roll_number} Details
                            </Typography>
                            <Typography variant="body2" paragraph>Subject: {selectedResult.subject}</Typography>
                            <Typography variant="body2" paragraph>Status: {selectedResult.status}</Typography>
                            {selectedResult.status !== 'Pending' && (
                                <>
                                    <Typography variant="body2" paragraph>Total Marks: {selectedResult.total_marks}</Typography>
                                    <Typography variant="body2" paragraph>Marks Obtained: {selectedResult.total_marks_obtained_final}</Typography>
                                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mt: 2, mb: 1 }} color="primary" fontWeight='bold'>
                                        Marks Details:
                                    </Typography>
                                    {selectedResult.questions.map((question, index) => (
                                        <Box key={index} sx={{ mb: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                                            <Typography variant="body2">
                                                Question {question.main_question_number}.{question.sub_question_number}
                                            </Typography>
                                            <Typography variant="body2">
                                                Marks: {question.marks_obtained_final} / {question.max_marks}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Typography variant={isMobile ? "subtitle1" : "h6"} color="primary" sx={{ mt: 2 }}>
                                        Total Percentage: {((selectedResult.total_marks_obtained_final / selectedResult.total_marks) * 100).toFixed(2)}%
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
                                            size={isMobile ? "small" : "medium"}
                                            startIcon={<FileDownloadIcon />}
                                            onClick={() => handleDownload(selectedResult)}
                                        >
                                            Download Result
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Student