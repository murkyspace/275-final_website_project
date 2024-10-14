import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './Basic.css';
import { Button, Form } from 'react-bootstrap';

export {}


function Basic() {
    return (
        <div className="Basic">
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Basic />} />
            </Routes>
            </BrowserRouter>
        </div>
      );
}