import React, { useState } from 'react';
import { useNavigate, Route, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {HomePage} from './Home';
import BasicPage from './Basic';
import DetailedPage from './Detailed';
import ResultPage from './Result';
import { Button, Form } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [currPage, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const goToQuizPage = () => {
    navigate('/quiz'); 
  };
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>ZhihuaSun</p>
        <p>Ray Fischer</p>
        <p>Connor Chipoletti</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      <div>{currPage === 0 && <HomePage setCurrPage={setPage}></HomePage>}</div>
      <div>{currPage === 1 && <BasicPage setCurrPage={setPage}></BasicPage>}</div>
      <div>{currPage === 2 && <DetailedPage setCurrPage={setPage}></DetailedPage>}</div>
      <div>{currPage === 3 && <ResultPage setCurrPage={setPage}></ResultPage>}</div>
    </div>
    
    
  );
}

export default App;