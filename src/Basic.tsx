import React, { useState } from 'react';
import './Basic.css';
import { Button, Form, ProgressBar, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { BasicInterface } from './BasicInt';

function BasicPage({ setCurrPage, setApiResponse }: BasicInterface) {
  const [responses, setResponses] = useState({
    organized: '',
    extroverted: '',
    creativity: '',
    awareness: '',
    adaptiveness: '',
    innovative: '',
    patience: '',
    logicalVsEmotional: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const totalQuestions = 8;

  const handleResponse = (question: string, response: string) => {
    setResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
    if (errorMessage) setErrorMessage('');
  };

  const answeredQuestions = Object.values(responses).filter(response => response !== '').length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleGetAnswer = async () => {
    const prompt = generatePrompt(responses);
    setLoading(true);

    const apiKey = JSON.parse(localStorage.getItem('MYKEY') || '""');

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
          max_tokens: 300,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('API response data:', data); 
        setApiResponse(data.choices[0].message.content); 
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
    return `Generate a personalized career report for the basic career assessment based on the responses below. (Please limit replies to 300 tokens)\n${JSON.stringify(responses, null, 2)}`;
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Basic Questions</h2>
          <ProgressBar 
            now={progress} 
            label={`${progress}%`} 
            variant="primary"  
            className="my-3" 
            style={{ height: '30px' }}  
          />

          <p>
            {answeredQuestions} out of {totalQuestions} questions answered
          </p>

          <Form>
            <Form.Group controlId="organized" className="mb-3">
              <Form.Label>You consider yourself to be a well-organized person.</Form.Label>
              <div className="d-flex flex-row gap-2"> 
                <Button 
                  variant={responses.organized === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('organized', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.organized === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('organized', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.organized === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('organized', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.organized === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('organized', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.organized === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('organized', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="extroverted" className="mb-3">
              <Form.Label>You make new friends often.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.extroverted === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('extroverted', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.extroverted === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('extroverted', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.extroverted === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('extroverted', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.extroverted === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('extroverted', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.extroverted === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('extroverted', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="creativity" className="mb-3">
              <Form.Label>You prefer to come up with your own solutions to problems instead of taking suggestions from others.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.creativity === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('creativity', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.creativity === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('creativity', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.creativity === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('creativity', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.creativity === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('creativity', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.creativity === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('creativity', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="awareness" className="mb-3">
              <Form.Label>You watch news channels often.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.awareness === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('awareness', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.awareness === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('awareness', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.awareness === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('awareness', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.awareness === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('awareness', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.awareness === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('awareness', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="adaptiveness" className="mb-3">
              <Form.Label>You adapt easily to new changes.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.adaptiveness === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('adaptiveness', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.adaptiveness === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('adaptiveness', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.adaptiveness === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('adaptiveness', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.adaptiveness === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('adaptiveness', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.adaptiveness === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('adaptiveness', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="innovative" className="mb-3">
              <Form.Label>You work well by building off of what already exists.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.innovative === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('innovative', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.innovative === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('innovative', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.innovative === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('innovative', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.innovative === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('innovative', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.innovative === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('innovative', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="patience" className="mb-3">
              <Form.Label>You are fine with waiting for other people.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.patience === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('patience', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.patience === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('patience', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.patience === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('patience', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.patience === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('patience', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.patience === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('patience', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="logicalVsEmotional" className="mb-3">
              <Form.Label>You would rather make the right decision, even if it risks losing a friend.</Form.Label>
              <div className="d-flex flex-row gap-2">
                <Button 
                  variant={responses.logicalVsEmotional === 'Strongly Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('logicalVsEmotional', 'Strongly Agree')}
                >
                  Strongly Agree
                </Button>
                <Button 
                  variant={responses.logicalVsEmotional === 'Agree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('logicalVsEmotional', 'Agree')}
                >
                  Agree
                </Button>
                <Button 
                  variant={responses.logicalVsEmotional === 'Middle' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('logicalVsEmotional', 'Middle')}
                >
                  Middle
                </Button>
                <Button 
                  variant={responses.logicalVsEmotional === 'Disagree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('logicalVsEmotional', 'Disagree')}
                >
                  Disagree
                </Button>
                <Button 
                  variant={responses.logicalVsEmotional === 'Strongly Disgree' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleResponse('logicalVsEmotional', 'Strongly Disgree')}
                >
                  Strongly Disgree
                </Button>
              </div>
            </Form.Group>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {answeredQuestions === totalQuestions && (
              <Button variant="primary" onClick={handleGetAnswer} disabled={loading} className="mb-3">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                    Getting Answer...
                  </>
                ) : (
                  'Get Answer'
                )}
              </Button>
            )}
            <div className="mt-3">
              <Button variant="secondary" onClick={() => setCurrPage(0)}>
                Go to Home
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BasicPage;

