import React, { useState } from 'react';
import './Basic.css';
import { SwitchOne } from './Switch';
import { BasicInterface } from './BasicInt';

<<<<<<< HEAD
function BasicPage({ setCurrPage }: BasicInterface) {
=======
function BasicPage({ setCurrPage, setApiResponse }: BasicInterface) {
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
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

<<<<<<< HEAD
 
=======
  const [loading, setLoading] = useState(false);

  const totalQuestions = 8;

>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
  const handleResponse = (question: string, response: string) => {
    setResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
  };

<<<<<<< HEAD
  const handleComplete = () => {
    setCurrPage(2); 

=======
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
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
  };

  return (
    <div className="Basic">
<<<<<<< HEAD
      <h1>Basic questions page</h1>
      <div>
        <p>You consider yourself to be a well-organized person. (Tests for organization)</p>
=======
      <h1>Basic Questions Page</h1>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{answeredQuestions} out of {totalQuestions} questions answered</p>

      <div>
        <p>You consider yourself to be a well-organized person.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('organized', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('organized', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You make new friends often. (Tests for extrovertedness)</p>
=======
        <p>You make new friends often.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('extroverted', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('extroverted', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You prefer to come up with your own solutions to problems instead of taking suggestions from others. (Tests for creativity)</p>
=======
        <p>You prefer to come up with your own solutions to problems instead of taking suggestions from others.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('creativity', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('creativity', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You watch news channels often. (Tests for awareness)</p>
=======
        <p>You watch news channels often.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('awareness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('awareness', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You adapt easily to new changes. (Tests for adaptiveness)</p>
=======
        <p>You adapt easily to new changes.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('adaptiveness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('adaptiveness', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You work well by building off of what already exists. (Tests for innovation)</p>
=======
        <p>You work well by building off of what already exists.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('innovative', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('innovative', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You are fine with waiting for other people. (Tests for patience)</p>
=======
        <p>You are fine with waiting for other people.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('patience', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('patience', 'Disagree')}>Disagree</button>
      </div>

      <div>
<<<<<<< HEAD
        <p>You would rather make the right decision, even if it risks losing a friend. (Tests for Logical vs Emotional)</p>
=======
        <p>You would rather make the right decision, even if it risks losing a friend.</p>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        <button onClick={() => handleResponse('logicalVsEmotional', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('logicalVsEmotional', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <h3>Your Responses:</h3>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>

<<<<<<< HEAD
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type="button" />
      <button onClick={handleComplete}>Complete</button>
=======
      {answeredQuestions === totalQuestions && (
        <button onClick={handleGetAnswer} disabled={loading}>
          {loading ? 'Loading...' : 'Get Answer'}
        </button>
      )}

      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type="button" />
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
    </div>
  );
}

export default BasicPage;
