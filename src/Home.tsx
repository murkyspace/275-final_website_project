import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { homePage } from './Home.ts';
import {switchOne} from './Switch.tsx';
import App from './App';
import './Home.css';
import { Button, Form } from 'react-bootstrap';



export function Homey({setCurrPage}: homePage) {
    //const navigate = useNavigate();

    //const gotoBasic = () => {
        // This will navigate to first component
   //     navigate('/Basic');
   // };


    return (
        <p className="Homey">
           
            <switchOne setCurrPage={setCurrPage} newCurrPage={1} type={"button"}></switchOne>
            <Button>Basic Questions</Button>
        </p>
    );
}

//export default Home;

