// DetailedPage.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  Container,
  Paper,
  LinearProgress,
} from '@mui/material';
import { FaClipboardList, FaHome } from 'react-icons/fa';
import './Detailed.css';
import { DetailedInterface } from './DetailedInt';

const steps = [
  'What tasks and/or activities have you enjoyed most in the past at work or school?',
  'How do you want your career to reflect and support your core values?',
  'What key skills and talents do you have?',
  'What industries, fields or topics interest you most?',
  'What do you hope to achieve in your career?',
  'How do you define success?',
  'How do you want to allocate your time and energy in your work-life balance?',
];

const DetailedPage: React.FC<DetailedInterface> = ({ setCurrPage, setApiResponse }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [responses, setResponses] = useState<Record<string, string>>({
    tasksEnjoyed: '',
    coreValues: '',
    skills: '',
    industries: '',
    careerGoals: '',
    successDefinition: '',
    workLifeBalance: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const questionKeys = [
    'tasksEnjoyed',
    'coreValues',
    'skills',
    'industries',
    'careerGoals',
    'successDefinition',
    'workLifeBalance',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResponseChange = (key: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleGetAnswer = async () => {
    const prompt = generatePrompt(responses);
    setLoading(true);

    const apiKey = localStorage.getItem('MYKEY') || '';

    if (!apiKey) {
      alert('API key not found.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful career advisor.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 500,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiResponse(data.choices[0].message.content);
        setCurrPage(3);
      } else {
        setErrorMessage(`Error: ${data.error.message}`);
      }
    } catch (error: any) {
      setErrorMessage('An error occurred while fetching the answer.');
    }

    setLoading(false);
  };

  const generatePrompt = (responses: Record<string, string>) => {
    return `Generate a personalized career report for the detailed career assessment based on the responses below. (Please limit replies to 500 tokens)\n${JSON.stringify(responses, null, 2)}`;
  };

  const getCurrentQuestionKey = () => questionKeys[activeStep];
  const getCurrentQuestion = () => steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const progressPercentage = (activeStep / steps.length) * 100;

  return (
    <Container maxWidth={false} className="detailed-page-container">
      <Paper elevation={3} className="detailed-page-paper">
        <Box display="flex" flexDirection="column" height="100%">
          <FaClipboardList size={50} color="#28a745" className="detailed-page-icon" />
          <Typography variant="h4" align="center" gutterBottom>
            Detailed Career Assessment
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel className="detailed-page-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <Box className="detailed-page-question-container" width="100%">
            <Typography variant="h6" gutterBottom>
              {getCurrentQuestion()}
            </Typography>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Enter your answer..."
              value={responses[getCurrentQuestionKey()]}
              onChange={(e) => handleResponseChange(getCurrentQuestionKey(), e.target.value)}
              aria-label={getCurrentQuestion()}
              className="detailed-page-text-field"
            />
            {errorMessage && (
              <Alert severity="error" className="detailed-page-alert">
                {errorMessage}
              </Alert>
            )}
            <Box display="flex" justifyContent="space-between" className="detailed-page-button-group">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FaHome />}
                onClick={() => setCurrPage(0)}
                className="detailed-page-home-button"
              >
                Go to Home
              </Button>
              <Box display="flex" gap="20px">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="detailed-page-nav-button"
                >
                  Back
                </Button>
                {!isLastStep ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={responses[getCurrentQuestionKey()].trim() === ''}
                    className="detailed-page-nav-button"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleGetAnswer}
                    disabled={responses[getCurrentQuestionKey()].trim() === '' || loading}
                    className="detailed-page-get-answer-button"
                    startIcon={loading && <CircularProgress size={20} color="inherit" />}
                  >
                    {loading ? 'Getting Answer...' : 'Get Answer'}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box className="detailed-page-progress-bar">
            <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
              Progress: {Math.round(progressPercentage)}%
            </Typography>
            <LinearProgress variant="determinate" value={progressPercentage} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DetailedPage;
