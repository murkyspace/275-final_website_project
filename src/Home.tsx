import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { HomePage } from './HomeInt';
import {SwitchOne} from './Switch';
import App from './App';
import './Home.css';
import { Button, Form } from 'react-bootstrap';



export function Home({setCurrPage}: HomePage) {
    /*const navigate = useNavigate();

    const gotoBasic = () => {
        //This will navigate to first component
        navigate('/Basic');
    };*/


    return (
        <p className="Home">

            <h1>Home page</h1>
            <Link to="/Basic">Basic</Link>
           
            <SwitchOne setCurrPage={setCurrPage} newCurrPage={1} type={"button"}></SwitchOne>
            <Button>Basic Questions</Button>
        </p>
    );
}

export default Home;

