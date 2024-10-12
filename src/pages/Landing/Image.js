import React, { useState } from 'react';
import axios from 'axios';

const Image = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [ocrResult, setOcrResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [score, setScore] = useState(null);
    // const [llmResponse, setLlmResponse] = useState('');
    const [finalScore, setFinalScore] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [avgScore, setAvgScore] = useState(null);
    const [error, setError] = useState('');

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const performOCR = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5001/vision/detectHandwriting', {
                imageUrl: imageUrl
            });
            const { handwrittenText, similarityScore, marks, explanation, averageScore } = response.data;
            setOcrResult(handwrittenText);
            setScore(similarityScore)
            setFinalScore(marks);
            setExplanation(explanation);
            setAvgScore(averageScore);
        } catch (error) {
            console.error('Error performing OCR:', error);
            setError('An error occurred while processing the image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
            <button onClick={performOCR} disabled={!imageUrl || isLoading}>
                {isLoading ? 'Processing...' : 'Perform OCR'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {ocrResult && (
                <div>
                    <h3>OCR Result:</h3>
                    <pre>{ocrResult}</pre>
                </div>
            )}
            {score !== null && <p>Score: {score}</p>}
            {/* {llmResponse && (
                <div>
                    <h3>LLM Response:</h3>
                    <p>{llmResponse}</p>
                </div>
            )} */}
            {finalScore !== null && <p>Final Score: {finalScore}</p>}
            {explanation && (
                <div>
                    <h3>Explanation:</h3>
                    <p>{explanation}</p>
                </div>
            )}
            {avgScore !== null && <p>Average Score: {avgScore}</p>}
        </div>
    );
};

export default Image;