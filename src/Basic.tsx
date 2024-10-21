import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import App from './App';
import './Basic.css';
import { Button, Form } from 'react-bootstrap';
import { BasicPage } from './BasicInt';



  

function Basic({setCurrPage}: BasicPage) {
  /*const navigate = useNavigate();

  const goToHome = () => {
    // This will navigate to first component
    navigate('/Home');<Button onClick={goToHome}>Home</Button>
  };*/


  return (
    <div className="Basic">

      <h1>Home page</h1>
      <Link to="/Home">Home</Link>

      
    </div>
  );
}

export default Basic;