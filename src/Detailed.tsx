import React, { useState } from 'react';
import './Detailed.css';
import { Button, Form, ProgressBar, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { DetailedInterface } from './DetailedInt';

function DetailedPage({ setCurrPage, setApiResponse }: DetailedInterface) {
  const [responses, setResponses] = useState({
    tasksEnjoyed: '',
    coreValues: '',
    skills: '',
    industries: '',
    careerGoals: '',
    successDefinition: '',
    workLifeBalance: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const totalQuestions = 7;

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
    return `Generate a personalized career report for the detailed career assessment based on the responses below. (Please limit replies to 500 tokens)\n${JSON.stringify(responses, null, 2)}`;
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Detailed Questions</h2>

          <ProgressBar 
            now={progress} 
            label={`${progress}%`} 
            variant="primary"  
            style={{ height: '30px' }} 
          />

          <p>
            {answeredQuestions} out of {totalQuestions} questions answered
          </p>

          <Form>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="tasksEnjoyed">
                  <Form.Label>What tasks and/or activities have you enjoyed most in the past at work or school?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.tasksEnjoyed}
                    onChange={(e) => handleResponse('tasksEnjoyed', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="coreValues">
                  <Form.Label>How do you want your career to reflect and support your core values?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.coreValues}
                    onChange={(e) => handleResponse('coreValues', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="skills">
                  <Form.Label>What key skills and talents do you have?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.skills}
                    onChange={(e) => handleResponse('skills', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="industries">
                  <Form.Label>What industries, fields or topics interest you most?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.industries}
                    onChange={(e) => handleResponse('industries', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="careerGoals">
                  <Form.Label>What do you hope to achieve in your career?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.careerGoals}
                    onChange={(e) => handleResponse('careerGoals', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="successDefinition">
                  <Form.Label>How do you define success?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.successDefinition}
                    onChange={(e) => handleResponse('successDefinition', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="workLifeBalance">
                  <Form.Label>How do you want to allocate your time and energy in your work-life balance?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your answer..."
                    value={responses.workLifeBalance}
                    onChange={(e) => handleResponse('workLifeBalance', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

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

export default DetailedPage;
