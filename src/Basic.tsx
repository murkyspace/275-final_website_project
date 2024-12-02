import React, { useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Alert,
  Box,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { BasicInterface } from './BasicInt';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
  '&:disabled': {
    backgroundColor: '#B0BEC5',
    color: '#ECEFF1',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BasicPage({ setCurrPage, setApiResponse, setCompletedQuiz }: BasicInterface) {
  const questions = [
    {
      id: 'organized',
      text: 'You consider yourself to be a well-organized person.',
    },
    {
      id: 'extroverted',
      text: 'You make new friends often.',
    },
    {
      id: 'creativity',
      text: 'You prefer to come up with your own solutions to problems instead of taking suggestions from others.',
    },
    {
      id: 'awareness',
      text: 'You watch news channels often.',
    },
    {
      id: 'adaptiveness',
      text: 'You adapt easily to new changes.',
    },
    {
      id: 'innovative',
      text: 'You work well by building off of what already exists.',
    },
    {
      id: 'patience',
      text: 'You are fine with waiting for other people.',
    },
    {
      id: 'logicalVsEmotional',
      text: 'You would rather make the right decision, even if it risks losing a friend.',
    },
  ];

  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = questions.length;

  const handleNext = () => {
    if (!responses[questions[currentStep].id]) {
      setErrorMessage('Please select an option to proceed.');
      return;
    }
    setErrorMessage('');
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponses({
      ...responses,
      [questions[currentStep].id]: event.target.value,
    });
    setErrorMessage('');
  };

  const handleReview = () => {
    if (Object.keys(responses).length !== totalSteps) {
      setErrorMessage('Please answer all questions before reviewing.');
      return;
    }
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    setOpenDialog(false);
    const prompt = generatePrompt(responses);
    setLoading(true);

    const apiKey = localStorage.getItem('MYKEY') || '';

    if (!apiKey) {
      alert('API key not found');
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
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 1000,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiResponse(data.choices[0].message.content);
        setCompletedQuiz('basic');
        setCurrPage(3);
      } else {
        console.error('Error:', data);
        setErrorMessage(`Error: ${data.error.message}`);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setErrorMessage('An error occurred');
    }

    setLoading(false);
  };

  const generatePrompt = (responses: any) => {
    return `
      As a professional career advisor, analyze the following user responses and generate a comprehensive career report.
      The report should be structured with the following sections: Overview, Personality, Consulting, Data Analysis, Non-profit.
      Each section should provide personalized insights and recommendations based on the user's responses.
      **Important:** Output **only** the JSON object and **no additional text**.
      Please format the response as a JSON object with the keys: "Overview", "Personality", "Consulting", "Data Analysis", "Non-profit".
      User Responses:
      ${JSON.stringify(responses, null, 2)}
    `;
  };

  const currentQuestion = questions[currentStep];
  const progress = Math.round(
    ((currentStep + (responses[currentQuestion.id] ? 1 : 0)) / totalSteps) * 100,
  );

  return (
    <div className="HomeBackground" style={{ backgroundSize:"cover", backgroundPosition:"center", color: "#000000", padding: "20px", minHeight: "100vh" }}>
    <Container
      maxWidth="md"
      sx={{
        marginTop: '32px',
        animation: 'fadeIn 1s ease-in-out',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#3f51b5', fontWeight: 'bold', fontSize: '2.5rem' }}
      >
        Personality Assessment
      </Typography>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          width: '100%',
          marginBottom: '16px',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: '10px', borderRadius: '5px', width: '100%' }}
          color="primary" 
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {progress}%
          </Typography>
        </Box>
      </Box>
      <Stepper activeStep={currentStep} alternativeLabel sx={{ backgroundColor: 'transparent' }}>
        {questions.map((_, index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: '#1a237e', marginTop: '20px' }}>
          {currentQuestion.text}
        </Typography>
        <FormControl component="fieldset" error={!!errorMessage} sx={{ marginTop: '20px' }}>
          <RadioGroup
            aria-label={currentQuestion.id}
            name={currentQuestion.id}
            value={responses[currentQuestion.id] || ''}
            onChange={handleResponse}
            sx={{ flexDirection: 'column', alignItems: 'center' }}
          >
            {['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" />}
                label={
                  <Typography sx={{ fontSize: '1.2rem' }}>
                    {option}
                  </Typography>
                }
                sx={{ marginBottom: '8px' }}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
        {currentStep === totalSteps - 1 ? (
          <Box sx={{ marginTop: '30px' }}>
            <ColorButton
              onClick={handleBack}
              sx={{ marginRight: '16px' }}
              disabled={currentStep === 0}
            >
              Back
            </ColorButton>
            <ColorButton variant="contained" onClick={handleReview}>
              Review & Submit
            </ColorButton>
          </Box>
        ) : (
          <Box sx={{ marginTop: '30px' }}>
            <ColorButton
              onClick={handleBack}
              sx={{ marginRight: '16px' }}
              disabled={currentStep === 0}
            >
              Back
            </ColorButton>
            <ColorButton variant="contained" onClick={handleNext}>
              Next
            </ColorButton>
          </Box>
        )}
      </div>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Review Your Answers"}</DialogTitle>
        <DialogContent dividers>
          {questions.map((question) => (
            <div key={question.id} style={{ marginBottom: '10px' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {question.text}
              </Typography>
              <Typography variant="body1">
                Your answer: {responses[question.id]}
              </Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Edit Answers
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            {loading ? 'Geting Answers...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: '20px' }}>
          {errorMessage}
        </Alert>
      )}

      <div style={{ marginTop: '40px' }}>
        <Button variant="outlined" onClick={() => setCurrPage(0)}>
          Go to Home
        </Button>
      </div>
    </Container>
    </div>
  );
}

export default BasicPage;
