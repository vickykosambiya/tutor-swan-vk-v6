import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTeacherData } from '../../redux/selectors/teacherSelectors';
import { selectInstituteData } from '../../redux/selectors/instituteSelectors';
import { getPaperPattern } from '../../redux/selectors/paperPatternSelectors';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import theme from '../../theme';
import TeacherSidebar from './TeacherSidebar';






const TeacherPaperCorrection = () => {
    const teacherData = useSelector(selectTeacherData);
    const tokenUsed = teacherData.tokens_used;
    const instituteData = useSelector(selectInstituteData);
    const paperPatterns = useSelector(getPaperPattern);
    console.log(paperPatterns);
    console.log(teacherData);
    console.log(instituteData);

    const navigate = useNavigate();

    const retrievePaperPattern = async (id) => {
        navigate(`/paper-correction/${id}`);
    }

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex' }}   >
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={3} sx={{ backgroundColor: { sm: theme.palette.primary.main }, minHeight: { xs: 'auto', sm: '100vh' } }}>
                    <TeacherSidebar tokenUsed={tokenUsed} />
                </Grid>
                <Grid item xs={12} sm={9} sx={{ height: '100vh', overflow: 'auto' }}>
                    <Grid container direction="column">
                        <Grid item xs={12} sx={{ padding: { xs: 4, }, alignContent: 'center' }}>
                            <Typography variant='h4' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                                Select Paper-Pattern to start correction.
                            </Typography><br />
                            <Typography variant='h6' fontWeight='bold' color={theme.palette.primary.main} sx={{ textAlign: 'center' }}>
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} sx={{ flexGrow: 1, justifyContent: 'center', padding: 3 }}>
                            <Grid container spacing={3}>
                                {paperPatterns && paperPatterns.map((pattern) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={pattern._id}>
                                        <Card
                                            sx={{
                                                height: 180,
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
                                            }}
                                            onClick={() => retrievePaperPattern(pattern._id)}
                                        >
                                            <CardContent>
                                                <Typography variant="h6" component="div" align="center" color={theme.palette.primary.main} fontWeight='bold'>
                                                    {pattern.name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" align="center" fontWeight='bold'>
                                                    Subject: {pattern.subject}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                                {(!paperPatterns || paperPatterns.length === 0) && (
                                    <Grid item xs={12}>
                                        <Typography variant="h6" align="center" color="text.secondary">
                                            No paper patterns available.
                                        </Typography>
                                    </Grid>
                                )}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeacherPaperCorrection
