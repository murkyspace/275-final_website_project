import React, { useState } from 'react';
import './Basic.css';
import {SwitchOne} from './Switch';
import { BasicInterface } from './BasicInt';


function BasicPage({setCurrPage}: BasicInterface) {
  


  return (
    <p className="Basic">
      <h1>Basic questions page</h1>
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne>
    </p>
  );
}

export default BasicPage;