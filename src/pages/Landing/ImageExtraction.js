import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Paper,
    Box,
} from '@mui/material';
import pdfToText from 'react-pdftotext'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ImageExtraction = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');

    // useEffect(() => {
    //     pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    // }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type === 'text/plain') {
                setSelectedFile(file);
                await extractText(file);
            } else {
                alert('Please upload only PDF or TXT files.');
                event.target.value = null;
            }
        }
    };
    const extractText = async (file) => {
        if (file.type === 'application/pdf') {
            try {
                const text = await pdfToText(file);
                setExtractedText(text);
            } catch (error) {
                console.error("Failed to extract text from PDF:", error);
                setExtractedText("Error extracting text from PDF");
            }
        } else if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setExtractedText(e.target.result);
            };
            reader.onerror = (error) => {
                console.error("Failed to read text file:", error);
                setExtractedText("Error reading text file");
            };
            reader.readAsText(file);
        }
    };


    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Document Text Extraction
                </Typography>
                <Paper elevation={3}>
                    <Box component="form" sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                >
                                    Upload File
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.txt"
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Selected File:
                                </Typography>
                                <Typography variant="body1">
                                    {selectedFile ? selectedFile.name : 'No file selected'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Extracted Text"
                                    multiline
                                    rows={10}
                                    value={extractedText}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ImageExtraction;