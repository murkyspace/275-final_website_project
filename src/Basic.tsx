import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import './Basic.css';
import { Button, Form } from 'react-bootstrap';



  

function Basic() {
  const navigate = useNavigate();

  const goToApp = () => {
    // This will navigate to first component
    navigate('/App');
  };


  return (
    <div className="Basic">
      <Button onClick={goToApp}>Click me!</Button>
    </div>
  );
}

export default Basic;