import React from 'react';
import './Result.css';
import { SwitchOne } from './Switch';
import { ResultInterface } from './ResultInt';

function ResultPage({ setCurrPage, apiResponse }: ResultInterface) {
  console.log('ResultPage received apiResponse:', apiResponse); 

  return (
    <div className="Result">
      <h1>Results Page</h1>
      <p>{apiResponse}</p>
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type="button" />
    </div>
  );
}

export default ResultPage;
