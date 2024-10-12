import React, { useState, useMemo } from 'react'
import { Grid, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material'
import TeacherSidebar from './TeacherSidebar'
import theme from '../../theme'
import { useSelector } from 'react-redux'
import { getResults } from '../../redux/selectors/resultSelectors'
import * as XLSX from 'xlsx'
import { selectTeacherData } from '../../redux/selectors/teacherSelectors'

const Results = () => {
    const results = useSelector(getResults);
    const teacherData = useSelector(selectTeacherData);
    const tokenUsed = teacherData.tokens_used;
    const [selectedClass, setSelectedClass] = useState('');

    // Create options for dropdown
    const classOptions = useMemo(() => {
        return [...new Set(results.map(result => `${result.class_name}-${result.division}`))];
    }, [results]);

    // Filter results based on selected class
    const filteredResults = useMemo(() => {
        if (!selectedClass) return [];
        const [className, division] = selectedClass.split('-');
        return results.filter(result =>
            result.class_name === className && result.division === division
        );
    }, [results, selectedClass]);

    // Get all unique question numbers
    const questionNumbers = useMemo(() => {
        const allQuestions = filteredResults.flatMap(result => result.questions);
        return [...new Set(allQuestions.map(q => `${q.main_question_number}.${q.sub_question_number}`))].sort();
    }, [filteredResults]);

    const handleDownload = () => {
        if (!selectedClass || filteredResults.length === 0) {
            alert('No results available to download');
            return;
        }

        const [className, division] = selectedClass.split('-');
        const paperPatternName = filteredResults[0].paper_pattern_id; // Assuming all results have the same paper pattern

        const data = filteredResults.map(result => {
            const row = {
                'Roll Number': result.roll_number,
                ...questionNumbers.reduce((acc, qNum) => {
                    const [main, sub] = qNum.split('.');
                    const question = result.questions.find(q =>
                        q.main_question_number === parseInt(main) &&
                        q.sub_question_number === parseInt(sub)
                    );
                    acc[`Q${qNum}`] = question ? question.marks_obtained_final : '-';
                    return acc;
                }, {}),
                'Total Marks Obtained': result.total_marks_obtained_final,
                'Total Marks': result.total_marks,
                'Percentage': ((result.total_marks_obtained_final / result.total_marks) * 100).toFixed(2) + '%'
            };
            return row;
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Results");

        const fileName = `${className}_${division}_${paperPatternName}_Results.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    return (
        <div>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={3} sx={{ backgroundColor: { sm: theme.palette.primary.main }, minHeight: { xs: 'auto', sm: '100vh' } }}>
                    <TeacherSidebar tokenUsed={tokenUsed} />
                </Grid>
                <Grid item xs={12} sm={9} sx={{ p: 3 }}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="class-select-label">Select Class</InputLabel>
                        <Select
                            labelId="class-select-label"
                            value={selectedClass}
                            label="Select Class"
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            {classOptions.map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {selectedClass && (
                        <>

                            {filteredResults.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Roll Number</TableCell>
                                                {questionNumbers.map(qNum => (
                                                    <TableCell key={qNum}>Q{qNum}</TableCell>
                                                ))}
                                                <TableCell>Total Marks Obtained</TableCell>
                                                <TableCell>Total Marks</TableCell>
                                                <TableCell>Percentage</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredResults.map((result, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{result.roll_number}</TableCell>
                                                    {questionNumbers.map(qNum => {
                                                        const [main, sub] = qNum.split('.');
                                                        const question = result.questions.find(q =>
                                                            q.main_question_number === parseInt(main) &&
                                                            q.sub_question_number === parseInt(sub)
                                                        );
                                                        return (
                                                            <TableCell key={qNum}>
                                                                {question ? question.marks_obtained_final : '-'}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell>{result.total_marks_obtained_final}</TableCell>
                                                    <TableCell>{result.total_marks}</TableCell>
                                                    <TableCell>
                                                        {((result.total_marks_obtained_final / result.total_marks) * 100).toFixed(2)}%
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                                    No results available for the selected class.
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDownload}
                                sx={{ mt: 3, mb: 3, px: 4, py: 1.5, fontWeight: 'bold', color: theme.palette.secondary.main }}
                                disabled={filteredResults.length === 0}
                            >
                                Download Results
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default Results
