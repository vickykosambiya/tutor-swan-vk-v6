import React, { useState, useCallback, useEffect } from 'react';
import {
    Grid, Typography, FormControl, InputLabel, Select, MenuItem,
    Alert, TextField, Paper, Button, IconButton, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions, Box
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TeacherSidebar from './TeacherSidebar';
import theme from '../../theme';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTeacherData } from '../../redux/selectors/teacherSelectors';
import { getPaperPattern } from '../../redux/selectors/paperPatternSelectors';
import { selectInstituteData } from '../../redux/selectors/instituteSelectors';
import axios from 'axios';

const PaperCorrection = () => {
    const { id } = useParams();
    const teacher = useSelector(selectTeacherData);
    const tokenUsed = teacher.tokens_used;
    const paperpatterns = useSelector(getPaperPattern);
    const paperPattern = paperpatterns.find(pattern => pattern._id === id) || { questions: [] };
    const institute = useSelector(selectInstituteData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submittedStudents, setSubmittedStudents] = useState(new Set());
    const [startCorrectionDialogOpen, setStartCorrectionDialogOpen] = useState(false);
    const navigate = useNavigate();

    const initialQuestionState = paperPattern.questions.map(question => ({
        main_question_number: question.main_question_number,
        sub_question_number: question.sub_question_number,
        min_marks: question.min_marks,
        max_marks: question.max_marks,
        teacher_marks: '', // Changed from 0 to empty string
        answer: question.answer,
        student_ans_imgs: [],
    }));

    const [formData, setFormData] = useState({
        class: '',
        difficulty: paperPattern.difficulty_level || '',
        teacher_id: teacher._id,
        paper_pattern_id: paperPattern._id,
        total_marks: paperPattern.total_marks || 0,
        questions: initialQuestionState,
        student_number: '',
        student_id: '', // Add this line
    });

    const getStudents = async (className, division) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5001/teacher/get-students/${className}/${division}/${institute._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Sort students by roll number
            console.log(response.data.students)
            const sortedStudents = response.data.students.sort((a, b) => parseInt(a.roll_number) - parseInt(b.roll_number));
            setStudents(sortedStudents);
            console.log(sortedStudents)
            if (sortedStudents.length > 0) {
                setFormData(prevData => ({
                    ...prevData,
                    student_number: sortedStudents[0].roll_number
                }));
                setCurrentStudentIndex(0);
            }
        } catch (error) {
            console.log(error);
            setError('Failed to fetch students');
        }
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    const handleImageUpload = (e, index) => {
        const files = Array.from(e.target.files);
        setFormData(prevData => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index].student_ans_imgs = [
                ...updatedQuestions[index].student_ans_imgs,
                ...files
            ];
            return { ...prevData, questions: updatedQuestions };
        });
    };

    const handleImageDelete = (questionIndex, imageIndex) => {
        setFormData(prevData => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[questionIndex].student_ans_imgs.splice(imageIndex, 1);
            return { ...prevData, questions: updatedQuestions };
        });
    };

    const resetMarksAndImages = useCallback(() => {
        setFormData(prevData => ({
            ...prevData,
            questions: prevData.questions.map(q => ({
                ...q,
                teacher_marks: '',
                student_ans_imgs: [],
            })),
        }));
    }, []);

    const moveToNextStudent = useCallback(() => {
        if (currentStudentIndex < students.length - 1) {
            setCurrentStudentIndex(prevIndex => prevIndex + 1);
        } else {
            setDialogOpen(true);
        }
    }, [currentStudentIndex, students.length]);

    const handleStartCorrection = () => {
        if (submittedStudents.size < students.length) {
            setStartCorrectionDialogOpen(true);
        } else {
            // Proceed with starting correction
            handleSubmit('start');
        }
    };

    const handleSubmit = async (action) => {
        setLoading(true);
        try {
            if (action === 'next') {
                // Create a new data object
                setLoading(true);
                const data = {
                    class_name: formData.class.split('-')[0],
                    division: formData.class.split('-')[1],
                    difficulty: formData.difficulty,
                    teacher_id: formData.teacher_id,
                    paper_pattern_id: formData.paper_pattern_id,
                    total_marks: formData.total_marks,
                    roll_number: formData.student_number,
                    student_id: formData.student_id,
                    questions: []
                };

                // Process questions
                for (let question of formData.questions) {
                    const questionData = {
                        main_question_number: question.main_question_number,
                        sub_question_number: question.sub_question_number,
                        max_marks: question.max_marks,
                        min_marks: question.min_marks,
                        teacher_marks: question.teacher_marks === '' ? 'no marks given' :
                            isNaN(Number(question.teacher_marks)) ? question.teacher_marks :
                                Math.min(Number(question.teacher_marks), question.max_marks),
                        answer: question.answer,
                        student_ans_imgs: []
                    };

                    // Convert image files to base64-encoded strings
                    for (let img of question.student_ans_imgs) {
                        const base64String = await getBase64(img);
                        questionData.student_ans_imgs.push(base64String);
                    }

                    data.questions.push(questionData);
                }

                let overWriteStatus = false;
                const shouldProceed = await handleWriteStatus((status) => {
                    overWriteStatus = status;
                    console.log("Overwrite status updated:", status);
                });

                if (!shouldProceed) {
                    setLoading(false);
                    return;
                }

                // Send the data to the backend
                data.overWriteStatus = overWriteStatus;
                console.log("Data to be sent:", data);
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in localStorage');
                }

                const response = await axios.post('http://localhost:5001/teacher/correction', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                console.log("Response from server:", response.data);

                // Handle post-submit actions
                setSubmittedStudents(prev => new Set(prev).add(formData.student_number));
                resetMarksAndImages();
                moveToNextStudent();
            }
            else if (action === 'start') {
                setLoading(true);
                const data = { paperpattern_id: paperPattern._id, subject: paperPattern.subject, classDetails: formData.class, teacher_id: teacher._id };
                const response = await axios.post('http://localhost:5001/teacher/start-correction', data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Response from server:", response.data);
                // Navigate to /teacher after dialog is closed

                navigate('/teacher');
            }
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            setError('An error occurred while submitting the data.');
        } finally {
            setLoading(false);
        }
    };

    const handleWriteStatus = async (setOverwriteCallback) => {
        try {
            const response = await axios.get(`http://localhost:5001/teacher/check-answer-status/${paperPattern._id}/${formData.student_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Response from server:", response.data);
            console.log("Student status:", response.data.studentStatus);

            if (response.data.studentStatus === 'New Student') {
                setOverwriteCallback(false);
                return true; // Proceed with submission
            }
            else if (response.data.studentStatus === 'Pending') {
                const userConfirmation = window.confirm("This student's paper has already been uploaded. Do you want to overwrite the existing data?");
                if (userConfirmation) {
                    setOverwriteCallback(true);
                    return true; // Proceed with submission
                } else {
                    setOverwriteCallback(false);
                    resetMarksAndImages();
                    return false; // Don't proceed with submission
                }
            } else {
                const userConfirmation = window.confirm("This student's paper has already been corrected. Do you want to overwrite the existing data?");
                if (userConfirmation) {
                    setOverwriteCallback(true);
                    return true; // Proceed with submission
                } else {
                    setOverwriteCallback(false);
                    resetMarksAndImages();
                    return false; // Don't proceed with submission
                }
            }
        } catch (error) {
            console.log(error);
            setError('Failed to fetch write status');
            return false; // Don't proceed with submission in case of error
        }
    }

    // Utility function to convert image file to base64 string
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);  // Get base64 part only
            reader.onerror = error => reject(error);
        });
    };


    useEffect(() => {
        if (students.length > 0) {
            setFormData(prevData => ({
                ...prevData,
                student_number: students[currentStudentIndex].roll_number,
                student_id: students[currentStudentIndex]._id,
            }));
            resetMarksAndImages();
        }
    }, [currentStudentIndex, students, resetMarksAndImages]);

    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <Grid item xs={12} md={3} sx={{
                backgroundColor: {
                    xs: 'transparent',
                    md: theme.palette.primary.main
                },
                minHeight: { xs: 'auto', md: '100vh' }
            }}>
                <TeacherSidebar tokenUsed={tokenUsed} />
            </Grid>
            <Grid item xs={12} md={9} sx={{ height: '100vh', overflow: 'auto', p: { xs: 2, md: 4 } }}>
                <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} align="center" gutterBottom>
                    Correct Paper - {paperPattern.name || ''}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('next'); }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="class-label">Class</InputLabel>
                                <Select
                                    labelId="class-label"
                                    name="class"
                                    value={formData.class}
                                    onChange={(e) => {
                                        const [className, division] = e.target.value.split('-');
                                        getStudents(className, division);
                                        handleInputChange({
                                            target: {
                                                name: 'class',
                                                value: e.target.value
                                            }
                                        });
                                    }}
                                    label="Class"
                                >
                                    {institute.classes.map((cls) =>
                                        cls.division.split(',').map((div) => (
                                            <MenuItem key={`${cls.name}-${div.trim()}`} value={`${cls.name}-${div.trim()}`}>
                                                {`${cls.name}-${div.trim()}`}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="difficulty-label">Difficulty Level</InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleInputChange}
                                    label="Difficulty Level"
                                >
                                    <MenuItem value="easy">Easy</MenuItem>
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="hard">Hard</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="student-no">Student Number</InputLabel>
                                <Select
                                    labelId="student-no"
                                    name="student_number"
                                    value={formData.student_number}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        setCurrentStudentIndex(students.findIndex(s => s.roll_number === e.target.value));
                                    }}
                                    label="Student Number"
                                >
                                    {students.map((student, index) => (
                                        <MenuItem
                                            key={index}
                                            value={student.roll_number}
                                            sx={submittedStudents.has(student.roll_number) ? { backgroundColor: 'rgba(76, 175, 80, 0.1)' } : {}}
                                        >
                                            {student.roll_number}
                                            {submittedStudents.has(student.roll_number) && (
                                                <CheckCircleIcon color="success" sx={{ ml: 1 }} />
                                            )}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Total Marks"
                                name="total_marks"
                                value={formData.total_marks}
                                onChange={handleInputChange}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Grid>
                        {formData.questions.map((question, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2">Q{question.main_question_number}.{question.sub_question_number}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Marks"
                                                type="number"
                                                value={question.teacher_marks}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...formData.questions];
                                                    updatedQuestions[index].teacher_marks = Math.min(e.target.value, question.max_marks);
                                                    setFormData({ ...formData, questions: updatedQuestions });
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0,
                                                        max: question.max_marks,
                                                        step: 'any' // Allows decimal values if needed
                                                    }
                                                }}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2">Max Marks: {question.max_marks}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id={`answer-image-${index}`}
                                                type="file"
                                                multiple
                                                onChange={(e) => handleImageUpload(e, index)}
                                            />
                                            <label htmlFor={`answer-image-${index}`}>
                                                <Button
                                                    variant="outlined"
                                                    component="span"
                                                    startIcon={<CloudUploadIcon />}
                                                    fullWidth
                                                    sx={{
                                                        p: 2,
                                                        border: '2px dashed',
                                                        borderColor: 'primary.main',
                                                        '&:hover': {
                                                            backgroundColor: 'primary.light',
                                                            color: 'primary.contrastText',
                                                        },
                                                        transition: 'all 0.3s',
                                                    }}
                                                >
                                                    Upload Answer Images
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {question.student_ans_imgs.map((img, imgIndex) => (
                                                    <Box key={imgIndex} sx={{ position: 'relative' }}>
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`Answer ${imgIndex + 1}`}
                                                            style={{ width: 100, height: 100, objectFit: 'cover' }}
                                                        />
                                                        <IconButton
                                                            sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.7)' }}
                                                            onClick={() => handleImageDelete(index, imgIndex)}
                                                            size="small"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSubmit('next')}
                                    // disabled={loading}
                                    size="large"
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Next Student'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleStartCorrection}
                                    disabled={loading}
                                    size="large"
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Start Correction'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>No More Students</DialogTitle>
                    <DialogContent>
                        <Typography>All students have been corrected.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary" disabled={loading}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={startCorrectionDialogOpen} onClose={() => setStartCorrectionDialogOpen(false)}>
                    <DialogTitle>Uncorrected Students Remaining</DialogTitle>
                    <DialogContent>
                        <Typography>
                            There are still {students.length - submittedStudents.size} students whose papers haven't been corrected.
                            Are you sure you want to start the correction process?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setStartCorrectionDialogOpen(false)} color="primary" disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setStartCorrectionDialogOpen(false);
                                handleSubmit('start');
                            }}
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Proceed'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default PaperCorrection;