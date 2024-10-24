import React, { useState } from 'react';
import './Basic.css';
import {SwitchOne} from './Switch';
import { BasicInterface } from './BasicInt';


function BasicPage({setCurrPage}: BasicInterface) {
  
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

  const handleResponse = (question: string, response: string) => {
    setResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
  };

  return (
    <p className="Basic">
      <h1>Basic questions page</h1>
      <div>
        <p>You consider yourself to be a well-organized person. (Tests for organization)</p>
        <button onClick={() => handleResponse('organized', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('organized', 'Disagree')}>Disagree</button>
      </div>
      
      <div>
        <p>You make new friends often. (Tests for extrovertedness)</p>
        <button onClick={() => handleResponse('extroverted', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('extroverted', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You prefer to come up with your own solutions to problems instead of taking suggestions from others. (Tests for creativity)</p>
        <button onClick={() => handleResponse('creativity', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('creativity', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You watch news channels often. (Tests for awareness)</p>
        <button onClick={() => handleResponse('awareness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('awareness', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You adapt easily to new changes. (Tests for adaptiveness)</p>
        <button onClick={() => handleResponse('adaptiveness', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('adaptiveness', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You work well by building off of what already exists. (Tests for innovation)</p>
        <button onClick={() => handleResponse('innovative', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('innovative', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You are fine with waiting for other people. (Tests for patience)</p>
        <button onClick={() => handleResponse('patience', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('patience', 'Disagree')}>Disagree</button>
      </div>

      <div>
        <p>You would rather make the right decision, even if it risks losing a friend. (Tests for Logical vs Emotional)</p>
        <button onClick={() => handleResponse('logicalVsEmotional', 'Agree')}>Agree</button>
        <button onClick={() => handleResponse('logicalVsEmotional', 'Disagree')}>Disagree</button>
      </div>
      <div>
      <h3>Your Responses:</h3>
      <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>

      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne>
    </p>
  );
}

export default BasicPage;