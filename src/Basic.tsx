import './Basic.css';
import { SwitchOne } from './Switch';
import { BasicInterface } from './BasicInt';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

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
    return `Generate a personalized career report for the basic career assessment based on the responses below.\n${JSON.stringify(responses, null, 2)}`;
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
        <Form.Check
        inline
        type="radio"
        name="organized"
        onClick={() => handleResponse('organized', 'Strongly Agree')}
        id="response-org-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="organized"
        onClick={() => handleResponse('organized', 'Agree')}
        id="response-org-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="organized"
        onClick={() => handleResponse('organized', 'Neutral')}
        id="response-org-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="organized"
        onClick={() => handleResponse('organized', 'Disagree')}
        id="response-org-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="organized"
        onClick={() => handleResponse('organized', 'Strongly Disagree')}
        id="response-org-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You make new friends often.</p>
        <Form.Check
        inline
        type="radio"
        name="extroverted"
        onClick={() => handleResponse('extroverted', 'Strongly Agree')}
        id="response-ext-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="extroverted"
        onClick={() => handleResponse('extroverted', 'Agree')}
        id="response-ext-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="extroverted"
        onClick={() => handleResponse('extroverted', 'Neutral')}
        id="response-ext-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="extroverted"
        onClick={() => handleResponse('extroverted', 'Disagree')}
        id="response-ext-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="extroverted"
        onClick={() => handleResponse('extroverted', 'Strongly Disagree')}
        id="response-ext-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You prefer to come up with your own solutions to problems instead of taking suggestions from others.</p>
        <Form.Check
        inline
        type="radio"
        name="creativity"
        onClick={() => handleResponse('creativity', 'Strongly Agree')}
        id="response-cre-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="creativity"
        onClick={() => handleResponse('creativity', 'Agree')}
        id="response-cre-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="creativity"
        onClick={() => handleResponse('creativity', 'Neutral')}
        id="response-cre-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="creativity"
        onClick={() => handleResponse('creativity', 'Disagree')}
        id="response-cre-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="creativity"
        onClick={() => handleResponse('creativity', 'Strongly Disagree')}
        id="response-cre-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You watch news channels often.</p>
        <Form.Check
        inline
        type="radio"
        name="awareness"
        onClick={() => handleResponse('awareness', 'Strongly Agree')}
        id="response-awa-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="awareness"
        onClick={() => handleResponse('awareness', 'Agree')}
        id="response-awa-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="awareness"
        onClick={() => handleResponse('awareness', 'Neutral')}
        id="response-awa-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="awareness"
        onClick={() => handleResponse('awareness', 'Disagree')}
        id="response-awa-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="awareness"
        onClick={() => handleResponse('awareness', 'Strongly Disagree')}
        id="response-awa-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You adapt easily to new changes.</p>
        <Form.Check
        inline
        type="radio"
        name="adaptiveness"
        onClick={() => handleResponse('adaptiveness', 'Strongly Agree')}
        id="response-ada-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="adaptiveness"
        onClick={() => handleResponse('adaptiveness', 'Agree')}
        id="response-ada-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="adaptiveness"
        onClick={() => handleResponse('adaptiveness', 'Neutral')}
        id="response-ada-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="adaptiveness"
        onClick={() => handleResponse('adaptiveness', 'Disagree')}
        id="response-ada-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="adaptiveness"
        onClick={() => handleResponse('adaptiveness', 'Strongly Disagree')}
        id="response-ada-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You work well by building off of what already exists.</p>
        <Form.Check
        inline
        type="radio"
        name="innovative"
        onClick={() => handleResponse('innovative', 'Strongly Agree')}
        id="response-ino-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="innovative"
        onClick={() => handleResponse('innovative', 'Agree')}
        id="response-ino-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="innovative"
        onClick={() => handleResponse('innovative', 'Neutral')}
        id="response-ino-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="innovative"
        onClick={() => handleResponse('innovative', 'Disagree')}
        id="response-ino-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="innovative"
        onClick={() => handleResponse('innovative', 'Strongly Disagree')}
        id="response-ino-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You are fine with waiting for other people.</p>
        <Form.Check
        inline
        type="radio"
        name="patience"
        onClick={() => handleResponse('patience', 'Strongly Agree')}
        id="response-pat-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="patience"
        onClick={() => handleResponse('patience', 'Agree')}
        id="response-pat-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="patience"
        onClick={() => handleResponse('patience', 'Neutral')}
        id="response-pat-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="patience"
        onClick={() => handleResponse('patience', 'Disagree')}
        id="response-pat-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="patience"
        onClick={() => handleResponse('patience', 'Strongly Disagree')}
        id="response-pat-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
      </div>

      <div>
        <p>You would rather make the right decision, even if it risks losing a friend.</p>
        <Form.Check
        inline
        type="radio"
        name="logicalVsEmotional"
        onClick={() => handleResponse('logicalVsEmotional', 'Strongly Agree')}
        id="response-lve-strongagree"
        label="Strongly Agree"
        value="strongly agree"
        />
        <Form.Check
        inline
        type="radio"
        name="logicalVsEmotional"
        onClick={() => handleResponse('logicalVsEmotional', 'Agree')}
        id="response-lve-agree"
        label="Agree"
        value="agree"
        />
        <Form.Check
        inline
        type="radio"
        name="logicalVsEmotional"
        onClick={() => handleResponse('logicalVsEmotional', 'Neutral')}
        id="response-lve-neutral"
        label="Neutral"
        value="neutral"
        />
        <Form.Check
        inline
        type="radio"
        name="logicalVsEmotional"
        onClick={() => handleResponse('logicalVsEmotional', 'Disagree')}
        id="response-lve-disagree"
        label="Disagree"
        value="disagree"
        />
        <Form.Check
        inline
        type="radio"
        name="logicalVsEmotional"
        onClick={() => handleResponse('logicalVsEmotional', 'Strongly Disagree')}
        id="response-lve-strongdisagree"
        label="Strongly Disagree"
        value="strongly disagree"
        />
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
