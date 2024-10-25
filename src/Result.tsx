/*import React, { useState } from 'react';*/
import './Result.css';
import {SwitchOne} from './Switch';
import { ResultInterface } from './ResultInt';


function ResultPage({setCurrPage}: ResultInterface) {
  


  return (
    <p className="Result">
      <h1>Results page</h1>
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne>
    </p>
  );
}

export default ResultPage;