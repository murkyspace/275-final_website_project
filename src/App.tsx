import React, { useState } from 'react';
import './App.css';
import { HomePage } from './Home';
import BasicPage from './Basic';
import DetailedPage from './Detailed';
import ResultPage from './Result';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [key, setKey] = useState<string>("");
  const [currPage, setPage] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [,setCompletedQuiz] = useState<'basic' | 'detailed' | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const isValid = await validateApiKey(key);
      if (isValid) {
        setIsApiKeyValid(true);
        setPage(0);
      } else {
        setIsApiKeyValid(false);
        setErrorMessage('Invalid API Key.');
      }
    } catch (error) {
      console.error('Error validating API Key:', error);
      setErrorMessage('Please try again.');
      setIsApiKeyValid(false);
    }
    setIsLoading(false);
  }

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  }

  const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating API Key:', error);
      return false;
    }
  }

  return (
    <div className="App">
      {!isApiKeyValid && (
        <header className="App-header" style={{ backgroundSize:"cover", backgroundPosition:"center"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formApiKey">
              <Form.Label>API Key:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Insert API Key Here"
                value={key}
                onChange={changeKey}
              />
            </Form.Group>
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
            <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> Validating...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </Form>
        </header>
      )}
      {isApiKeyValid && (
        <>
          {currPage === 0 && <HomePage setCurrPage={setPage} setIsApiKeyValid={setIsApiKeyValid} />}
          {currPage === 1 && <BasicPage setCurrPage={setPage} setApiResponse={setApiResponse} setCompletedQuiz={setCompletedQuiz} apiKey={key} />}
          {currPage === 2 && <DetailedPage setCurrPage={setPage} setApiResponse={setApiResponse} setCompletedQuiz={setCompletedQuiz} apiKey={key} />}
          {currPage === 3 && <ResultPage setCurrPage={setPage} apiResponse={apiResponse} completedQuiz={'basic'} />}
        </>
      )}
    </div>
  );
}

export default App;
