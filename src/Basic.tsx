import React, { useState } from 'react';
import './Basic.css';
import {SwitchOne} from './Switch';
import { BasicInterface } from './BasicInt';

//import { Link } from 'react-router-dom';
//import App from './App';

//import { Button, Form } from 'react-bootstrap';


/*const navigate = useNavigate();

  const goToHome = () => {
    // This will navigate to first component
    navigate('/Home');<Button onClick={goToHome}>Home</Button>
  };*/
  

function BasicPage({setCurrPage}: BasicInterface) {
  


  return (
    <p className="Basic">
      <h1>Basic questions page</h1>
      <SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne>
    </p>
  );
}

export default BasicPage;