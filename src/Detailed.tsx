import React, { useState } from 'react';
import './Detailed.css';
import {SwitchOne} from './Switch';
import { DetailedInterface } from './DetailedInt';


function DetailedPage({setCurrPage}: DetailedInterface) {
  


  return (
    <p className="Detailed">
      <h1>Detailed questions page</h1>
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne>
    </p>
  );
}

export default DetailedPage;