import React, { useState } from 'react';
import './Basic.css';
import { Button, Form, ProgressBar, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { BasicInterface } from './BasicInt';

function BasicPage({ setCurrPage, setApiResponse, setCompletedQuiz }: BasicInterface) {
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

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
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
            <Form.Group controlId="organized" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You consider yourself to be a well-organized person.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="organized"
                  onChange={(e) => handleResponse('organized', e.target.value)}
                  id="response-org-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.organized === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="organized"
                  onChange={(e) => handleResponse('organized', e.target.value)}
                  id="response-org-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.organized === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="organized"
                  onChange={(e) => handleResponse('organized', e.target.value)}
                  id="response-org-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.organized === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="organized"
                  onChange={(e) => handleResponse('organized', e.target.value)}
                  id="response-org-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.organized === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="organized"
                  onChange={(e) => handleResponse('organized', e.target.value)}
                  id="response-org-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.organized === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="extroverted" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You make new friends often.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="extroverted"
                  onChange={(e) => handleResponse('extroverted', e.target.value)}
                  id="response-ext-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.extroverted === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="extroverted"
                  onChange={(e) => handleResponse('extroverted', e.target.value)}
                  id="response-ext-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.extroverted === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="extroverted"
                  onChange={(e) => handleResponse('extroverted', e.target.value)}
                  id="response-ext-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.extroverted === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="extroverted"
                  onChange={(e) => handleResponse('extroverted', e.target.value)}
                  id="response-ext-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.extroverted === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="extroverted"
                  onChange={(e) => handleResponse('extroverted', e.target.value)}
                  id="response-ext-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.extroverted === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="creativity" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You prefer to come up with your own solutions to problems instead of taking suggestions from others.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="creativity"
                  onChange={(e) => handleResponse('creativity', e.target.value)}
                  id="response-cre-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.creativity === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="creativity"
                  onChange={(e) => handleResponse('creativity', e.target.value)}
                  id="response-cre-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.creativity === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="creativity"
                  onChange={(e) => handleResponse('creativity', e.target.value)}
                  id="response-cre-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.creativity === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="creativity"
                  onChange={(e) => handleResponse('creativity', e.target.value)}
                  id="response-cre-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.creativity === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="creativity"
                  onChange={(e) => handleResponse('creativity', e.target.value)}
                  id="response-cre-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.creativity === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="awareness" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You watch news channels often.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="awareness"
                  onChange={(e) => handleResponse('awareness', e.target.value)}
                  id="response-awa-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.awareness === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="awareness"
                  onChange={(e) => handleResponse('awareness', e.target.value)}
                  id="response-awa-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.awareness === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="awareness"
                  onChange={(e) => handleResponse('awareness', e.target.value)}
                  id="response-awa-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.awareness === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="awareness"
                  onChange={(e) => handleResponse('awareness', e.target.value)}
                  id="response-awa-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.awareness === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="awareness"
                  onChange={(e) => handleResponse('awareness', e.target.value)}
                  id="response-awa-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.awareness === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="adaptiveness" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You adapt easily to new changes.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="adaptiveness"
                  onChange={(e) => handleResponse('adaptiveness', e.target.value)}
                  id="response-ada-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.adaptiveness === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="adaptiveness"
                  onChange={(e) => handleResponse('adaptiveness', e.target.value)}
                  id="response-ada-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.adaptiveness === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="adaptiveness"
                  onChange={(e) => handleResponse('adaptiveness', e.target.value)}
                  id="response-ada-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.adaptiveness === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="adaptiveness"
                  onChange={(e) => handleResponse('adaptiveness', e.target.value)}
                  id="response-ada-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.adaptiveness === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="adaptiveness"
                  onChange={(e) => handleResponse('adaptiveness', e.target.value)}
                  id="response-ada-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.adaptiveness === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="innovative" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You work well by building off of what already exists.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="innovative"
                  onChange={(e) => handleResponse('innovative', e.target.value)}
                  id="response-ino-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.innovative === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="innovative"
                  onChange={(e) => handleResponse('innovative', e.target.value)}
                  id="response-ino-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.innovative === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="innovative"
                  onChange={(e) => handleResponse('innovative', e.target.value)}
                  id="response-ino-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.innovative === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="innovative"
                  onChange={(e) => handleResponse('innovative', e.target.value)}
                  id="response-ino-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.innovative === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="innovative"
                  onChange={(e) => handleResponse('innovative', e.target.value)}
                  id="response-ino-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.innovative === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="patience" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You are fine with waiting for other people.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="patience"
                  onChange={(e) => handleResponse('patience', e.target.value)}
                  id="response-pat-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.patience === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="patience"
                  onChange={(e) => handleResponse('patience', e.target.value)}
                  id="response-pat-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.patience === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="patience"
                  onChange={(e) => handleResponse('patience', e.target.value)}
                  id="response-pat-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.patience === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="patience"
                  onChange={(e) => handleResponse('patience', e.target.value)}
                  id="response-pat-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.patience === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="patience"
                  onChange={(e) => handleResponse('patience', e.target.value)}
                  id="response-pat-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.patience === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="logicalVsEmotional" className="mb-4">
              <Form.Label className="fw-normal text-dark">
                You would rather make the right decision, even if it risks losing a friend.
              </Form.Label>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                <Form.Check
                  inline
                  type="radio"
                  name="logicalVsEmotional"
                  onChange={(e) => handleResponse('logicalVsEmotional', e.target.value)}
                  id="response-lve-strongagree"
                  label="Strongly Agree"
                  value="Strongly Agree"
                  checked={responses.logicalVsEmotional === 'Strongly Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="logicalVsEmotional"
                  onChange={(e) => handleResponse('logicalVsEmotional', e.target.value)}
                  id="response-lve-agree"
                  label="Agree"
                  value="Agree"
                  checked={responses.logicalVsEmotional === 'Agree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="logicalVsEmotional"
                  onChange={(e) => handleResponse('logicalVsEmotional', e.target.value)}
                  id="response-lve-neutral"
                  label="Neutral"
                  value="Neutral"
                  checked={responses.logicalVsEmotional === 'Neutral'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="logicalVsEmotional"
                  onChange={(e) => handleResponse('logicalVsEmotional', e.target.value)}
                  id="response-lve-disagree"
                  label="Disagree"
                  value="Disagree"
                  checked={responses.logicalVsEmotional === 'Disagree'}
                  className="text-muted me-3 custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="logicalVsEmotional"
                  onChange={(e) => handleResponse('logicalVsEmotional', e.target.value)}
                  id="response-lve-strongdisagree"
                  label="Strongly Disagree"
                  value="Strongly Disagree"
                  checked={responses.logicalVsEmotional === 'Strongly Disagree'}
                  className="text-muted custom-radio"
                />
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
