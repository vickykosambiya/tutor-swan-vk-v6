import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Button, IconButton, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TeacherSidebar from './TeacherSidebar';
import { fetchTeacherData } from '../../redux/actions/teacherActions';
import axios from 'axios';
import { selectInstituteData } from '../../redux/selectors/instituteSelectors';
import { selectTeacherData } from '../../redux/selectors/teacherSelectors';
import { fetchPaperPattern } from '../../redux/actions/paperPatternActions';
import pdfToText from 'react-pdftotext'


const initialQuestionState = {
    main_question_number: '',
    sub_question_number: '',
    min_marks: '',
    max_marks: '',
    answer: '',
    answerFile: null
};

const CreatePaperPattern = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const teacher = useSelector(selectTeacherData);
    const teacher_id = teacher._id;
    const tokenUsed = teacher.tokens_used;
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        total_marks: '',
        difficulty_level: '',
        questions: [{ ...initialQuestionState }]
    });
    const [error, setError] = useState('');
    const instituteData = useSelector(selectInstituteData);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    const handleQuestionChange = useCallback((index, field, value) => {
        setFormData(prevData => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
            const newTotalMarks = updatedQuestions.reduce((total, q) => total + (parseFloat(q.max_marks) || 0), 0);
            return { ...prevData, questions: updatedQuestions, total_marks: newTotalMarks.toString() };
        });
    }, []);

    const addQuestion = useCallback(() => {
        setFormData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, { ...initialQuestionState }]
        }));
    }, []);

    const removeQuestion = useCallback((index) => {
        setFormData(prevData => ({
            ...prevData,
            questions: prevData.questions.filter((_, i) => i !== index)
        }));
    }, []);



    const calculateTotalMarks = useCallback(() => {
        return formData.questions.reduce((total, question) => total + (parseFloat(question.max_marks) || 0), 0);
    }, [formData.questions]);

    const isQuestionPairUnique = useMemo(() => {
        const pairs = new Set();
        for (const question of formData.questions) {
            const pair = `${question.main_question_number}-${question.sub_question_number}`;
            if (pairs.has(pair)) {
                return false;
            }
            pairs.add(pair);
        }
        return true;
    }, [formData.questions]);



    const handleFileChange = async (event, index) => {
        console.log("Here");
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type === 'text/plain') {
                const text = await extractText(file);
                console.log("Text", text);
                setSelectedFile(file);
                setFormData(prevData => {
                    const updatedQuestions = [...prevData.questions];
                    updatedQuestions[index] = {
                        ...updatedQuestions[index],
                        answer: text,
                        answerFile: file
                    };
                    return { ...prevData, questions: updatedQuestions };
                });
            } else {
                alert('Please upload only PDF or TXT files.');
                event.target.value = null;
            }
        }
    };


    const extractText = async (file) => {
        if (file.type === 'application/pdf') {
            try {
                return await pdfToText(file);
            } catch (error) {
                console.error("Failed to extract text from PDF:", error);
                return "Error extracting text from PDF";
            }
        } else if (file.type === 'text/plain') {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (error) => {
                    console.error("Failed to read text file:", error);
                    reject("Error reading text file");
                };
                reader.readAsText(file);
            });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isQuestionPairUnique) {
            setError('Each pair of main question number and sub question number must be unique.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const updatedFormData = {
                ...formData,
                teacher_id: teacher_id,
                total_marks: calculateTotalMarks().toString()
            };
            console.log(updatedFormData);
            const response = await axios.post('http://localhost:5001/teacher/paper-pattern', updatedFormData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.status);
            // Show success message in an alert

            console.log(response.data.message);
            const message = response.data.message || 'Paper pattern created successfully!';
            alert(`✅ Success!\n\n${message}`);
            // <Alert severity="success">{message}</Alert>
            await Promise.all([dispatch(fetchTeacherData(response.data.teacher)), dispatch(fetchPaperPattern(response.data.paperPatterns))]);
            console.log(response.data)
            console.log(response.data.paperPatterns);
            // Function to sleep for 1 minute
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            // Sleep for 1 minute before redirecting
            await sleep(5000);
            setIsLoading(false);
            // Redirect to /teacher
            window.location.href = '/teacher';
        } catch (error) {
            console.error('Error creating paper pattern:', error);
            setError('An error occurred while submitting the form. Please try again.');
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginLeft: '20px' }}>
                    Updating...
                </Typography>
            </Grid>
        );
    }
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
                    Create Paper Pattern
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Paper Pattern Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required variant="outlined">
                                <InputLabel id="subject-label">Subject</InputLabel>
                                <Select
                                    labelId="subject-label"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    label="Subject"
                                >
                                    {instituteData.subjects.map((subject, index) => (
                                        <MenuItem key={index} value={subject}>
                                            {subject}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required variant="outlined">
                                <InputLabel id="difficulty-label">Difficulty Level</InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    name="difficulty_level"
                                    value={formData.difficulty_level}
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
                            <TextField
                                fullWidth
                                label="Total Marks"
                                type="number"
                                value={formData.total_marks}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        {formData.questions.map((question, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        {['main_question_number', 'sub_question_number', 'min_marks', 'max_marks'].map((field) => (
                                            <Grid item xs={12} sm={6} md={3} key={field}>
                                                <TextField
                                                    fullWidth
                                                    label={field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    type="number"
                                                    value={question[field]}
                                                    onChange={(e) => handleQuestionChange(index, field, e.target.value)}
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        ))}
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Answer"
                                                multiline
                                                rows={4}
                                                value={question.answer}
                                                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <input
                                                accept=".txt,.pdf"
                                                style={{ display: 'none' }}
                                                id={`answer-file-${index}`}
                                                type="file"
                                                onChange={(e) => handleFileChange(e, index)}
                                            />
                                            <label htmlFor={`answer-file-${index}`}>
                                                <Button variant="contained" component="span">
                                                    Upload Answer File
                                                </Button>
                                            </label>
                                            {question.answerFile && (
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    File uploaded: {selectedFile ? selectedFile.name : 'No file selected'}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                            <IconButton onClick={() => removeQuestion(index)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                startIcon={<AddIcon />}
                                onClick={addQuestion}
                                variant="outlined"
                                color="primary"
                            >
                                Add Question
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default CreatePaperPattern;