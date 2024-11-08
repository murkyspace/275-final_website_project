import React, { useState } from 'react';

import './App.css';
import {HomePage} from './Home';
import BasicPage from './Basic';
import DetailedPage from './Detailed';
import ResultPage from './Result';
import CoverPage from './Cover';
import { Button, Form } from 'react-bootstrap';
import {ApiKey} from './ApiKey';


function App() {
  const [currPage, setPage] = useState<number>(4);
  return (
    <div className="App">
      <div>{currPage === 0 && <HomePage setCurrPage={setPage}></HomePage>}</div>
      <div>{currPage === 1 && <BasicPage setCurrPage={setPage} setApiResponse={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } }></BasicPage>}</div>
      <div>{currPage === 2 && <DetailedPage setCurrPage={setPage}></DetailedPage>}</div>
      <div>{currPage === 3 && <ResultPage setCurrPage={setPage} apiResponse={''}></ResultPage>}</div>
      <div>{currPage === 4 && <CoverPage setCurrPage={setPage}></CoverPage>}</div>
      
    </div>
  );
}

export default App;
