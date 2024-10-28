<<<<<<< HEAD
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
=======
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
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
