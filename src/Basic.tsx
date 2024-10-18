import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import './Basic.css';
import { Button, Form } from 'react-bootstrap';



  

function Basic() {
  const navigate = useNavigate();

  const goToHome = () => {
    // This will navigate to first component
    navigate('/Home');
  };


  return (
    <div className="Basic">
      <Button onClick={goToHome}>Home</Button>
    </div>
  );
}

export default Basic;