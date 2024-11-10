import React, { useEffect, useState } from 'react';
import './App.css';
import {HomePage} from './Home';
import BasicPage from './Basic';
import DetailedPage from './Detailed';
import ResultPage from './Result';
import { Button, Form,Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}
function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [currPage, setPage] = useState<number>(0);
  const [basicApiResponse, setBasicApiResponse] = useState<string>('');
  const [detailedApiResponse, setDetailedApiResponse] = useState<string>('');
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  //sets the local storage item to the api key the user inputed
//  function handleSubmit() {
//    localStorage.setItem(saveKeyData, JSON.stringify(key));
//    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
//  }
//Processing API key submissions
async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  setIsLoading(true);
  setErrorMessage('');
  try {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    const isValid = await validateApiKey(key);
    if (isValid) {
      setIsApiKeyValid(true);
      setPage(0); 
    } else {
      setIsApiKeyValid(false);
      setErrorMessage('Invalid API Key.');
      localStorage.removeItem(saveKeyData);
    }
  } catch (error) {
    console.error('Error API Key:', error);
    setErrorMessage('Please try again.');
    setIsApiKeyValid(false);
  }
  setIsLoading(false);
}

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  async function validateApiKey(apiKey: string): Promise<boolean> {
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
  useEffect(() => {
    const storedKey = localStorage.getItem(saveKeyData);
    if (storedKey) {
      const parsedKey = JSON.parse(storedKey);
      setKey(parsedKey);
      validateApiKey(parsedKey);
    }
  }, []);

  return (
    <div className="App">
      {!isApiKeyValid && (
        <header className="App-header">
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
          {currPage === 0 && <HomePage setCurrPage={setPage} />}
          {currPage === 1 && <BasicPage setCurrPage={setPage} setApiResponse={setBasicApiResponse} />}
          {currPage === 2 && <DetailedPage setCurrPage={setPage} setApiResponse={setDetailedApiResponse} />}
          {currPage === 3 && <ResultPage setCurrPage={setPage} basicApiResponse={basicApiResponse} detailedApiResponse={detailedApiResponse} />}
        </>
      )}
    </div>
  );
}

export default App;