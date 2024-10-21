import React, { useState } from 'react';
import { HomeInterface } from './HomeInt';
import {SwitchOne} from './Switch';
import './Home.css';
//import {  Link } from 'react-router-dom';

//import App from './App';

//import { Button, Form } from 'react-bootstrap';

/*const navigate = useNavigate();

    const gotoBasic = () => {
        //This will navigate to first component
        navigate('/Basic');
    };*/

export function HomePage({setCurrPage}: HomeInterface) {
    


    return (
        <p className="Home">
            <h1>Home page</h1>
            <SwitchOne setCurrPage={setCurrPage} newCurrPage={1} type={"button"}></SwitchOne>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>ZhihuaSun</p>
            <p>Ray Fischer</p>
            <p>Connor Chipoletti</p>
            
        </p>
    );
}

export default HomePage;

