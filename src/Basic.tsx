import React, { useState } from 'react';
import './Basic.css';
import { SwitchOne } from './Switch';
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

  const totalQuestions = 8;

  const handleResponse = (question: string, response: string) => {
    setResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
  };

  const answeredQuestions = Object.values(responses).filter(response => response !== '').length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleGetAnswer = async () => {
    const prompt = generatePrompt(responses);
    setLoading(true);
  
    const apiKey = JSON.parse(localStorage.getItem('MYKEY') || '""');

    if (!apiKey) {
      alert('API key not found, make sure you have entered and submitted your API key on the homepage.');
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
          max_tokens: 150,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('API response data:', data); 
        setApiResponse(data.choices[0].message.content); 
        setCurrPage(3); 
      } else {
        console.error('Error:', data);
        alert(`Error: ${data.error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the API response.');
    }

    setLoading(false);
  };

  const generatePrompt = (responses: any) => {
    return `Based on the following responses, provide a summary:\n${JSON.stringify(responses, null, 2)}`;
  };

  return (
    <div className="Basic">
      <h1>Basic Questions Page</h1>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{answeredQuestions} out of {totalQuestions} questions answered</p>

      <div>
        <p>You consider yourself to be a well-organized person.</p>
        <button onClick={() => handleResponse('organized', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('organized', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You make new friends often.</p>
        <button onClick={() => handleResponse('extroverted', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('extroverted', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You prefer to come up with your own solutions to problems instead of taking suggestions from others.</p>
        <button onClick={() => handleResponse('creativity', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('creativity', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You watch news channels often.</p>
        <button onClick={() => handleResponse('awareness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('awareness', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You adapt easily to new changes.</p>
        <button onClick={() => handleResponse('adaptiveness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('adaptiveness', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You work well by building off of what already exists.</p>
        <button onClick={() => handleResponse('innovative', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('innovative', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You are fine with waiting for other people.</p>
        <button onClick={() => handleResponse('patience', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('patience', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You would rather make the right decision, even if it risks losing a friend.</p>
        <button onClick={() => handleResponse('logicalVsEmotional', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('logicalVsEmotional', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <h3>Your Responses:</h3>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>

      {answeredQuestions === totalQuestions && (
        <button onClick={handleGetAnswer} disabled={loading}>
          {loading ? 'Loading...' : 'Get Answer'}
        </button>
      )}

      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type="button" />
    </div>
  );
}

export default BasicPage;
